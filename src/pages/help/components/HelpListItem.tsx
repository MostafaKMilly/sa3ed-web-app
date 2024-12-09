import {
  Button,
  CircularProgress,
  Paper,
  Typography,
  Modal,
} from "@mui/material";
import { Box } from "@mui/system";
import { HelpData, HelpsSummary } from "../types";
import { useQuery } from "@tanstack/react-query";
import ClassIcon from "@mui/icons-material/Class";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import PersonIcon from "@mui/icons-material/Person";
import DateRangeIcon from "@mui/icons-material/DateRange";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { useState } from "react";
import API from "@/api/httpClient";
import { helpTypesQuery, locationQuery } from "@/pages/donation/Donation";
import moment from "moment"; // Updated import

export const getHelpsQuery = (id: number) => ({
  queryKey: ["HelpData", id],
  queryFn: () =>
    API.get<HelpData, { data: HelpData }>("help/" + id, (res) => res?.data),
  enabled: false,
});

export const HelpListItem = ({ item }: HelpListItemProps) => {
  const [toggleShow, setToggleShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | undefined>();

  const { data: locationData } = useQuery(locationQuery);
  const {
    data: helpData,
    refetch,
    isFetching,
  } = useQuery(getHelpsQuery(item.id));
  const { data: types } = useQuery(helpTypesQuery);

  // If help types still apply, adjust accordingly if your data source has help_type
  // Assuming no help_type in new structure, remove type related code if not needed.
  // const type = types?.find((type) => type.id === item.help_type)?.name;

  const city = locationData?.find((c) => c.id === item.id_city)?.name;
  const area = locationData
    ?.find((c) => c.id === item.id_city)
    ?.city_area.find((a) => a.id === item.id_area)?.name;

  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: "8px",
        maxWidth: "400px",
        p: 3,
        boxShadows:
          "0px 0px 1px 0px rgba(0, 0, 0, 0.06),0px 2px 6px 0px rgba(0, 0, 0, 0.04),0px 10px 20px 0px rgba(0, 0, 0, 0.04)",
      }}
    >
      <Box display="flex" flexDirection="column" rowGap={2} key={item.id}>
        {/* النوع (إذا ما زال مطلوباً) 
        <Box display="flex" columnGap={2}>
          <Typography
            sx={{
              color: "secondary.main",
              display: "flex",
              columnGap: 1,
              textAlign: "center",
            }}
            variant="h4"
            fontWeight={700}
          >
            <ClassIcon fontSize="small" /> النوع :
          </Typography>
          <Typography variant="body1">{type}</Typography>
        </Box>
        */}
        <Box display="flex" columnGap={2}>
          <Typography
            sx={{
              color: "secondary.main",
              display: "flex",
              columnGap: 1,
              textAlign: "center",
            }}
            variant="h4"
            fontWeight={700}
          >
            <LocationCityIcon fontSize="small" /> المحافظة :
          </Typography>
          <Typography variant="body1">{city}</Typography>
        </Box>
        <Box display="flex" columnGap={2}>
          <Typography
            sx={{
              color: "secondary.main",
              display: "flex",
              columnGap: 1,
              textAlign: "center",
            }}
            variant="h4"
            fontWeight={700}
          >
            <LocationOnIcon fontSize="small" /> المنطقة :
          </Typography>
          <Typography variant="body1">{area}</Typography>
        </Box>
        {/* نعرض الاسم من helpData بعد الجلب */}
        <Box display="flex" columnGap={2}>
          <Typography
            sx={{
              color: "secondary.main",
              display: "flex",
              columnGap: 1,
              textAlign: "center",
            }}
            variant="h4"
            fontWeight={700}
          >
            <PersonIcon fontSize="small" /> الاسم :
          </Typography>
          <Typography variant="body1">
            {item?.full_name || "جاري التحميل..."}
          </Typography>
        </Box>
        <Box display="flex" columnGap={2}>
          <Typography
            sx={{
              color: "secondary.main",
              display: "flex",
              columnGap: 1,
              textAlign: "center",
            }}
            variant="h4"
            fontWeight={700}
          >
            <DateRangeIcon fontSize="small" /> تاريخ الانشاء :
          </Typography>
          <Typography variant="body1">
            {item
              ? moment(item.created_at).format("HH:mm YYYY-MM-DD") // Updated to use moment
              : "جاري التحميل..."}
          </Typography>
        </Box>

        {isFetching && <CircularProgress />}
        {toggleShow && !isFetching && helpData && (
          <>
            <Box display="flex" columnGap={2}>
              <Typography
                sx={{
                  color: "secondary.main",
                  display: "flex",
                  columnGap: 1,
                  textAlign: "center",
                }}
                variant="h4"
                fontWeight={700}
              >
                تاريخ الميلاد :
              </Typography>
              <Typography variant="body1">
                {helpData.date_of_birth
                  ? moment(helpData.date_of_birth).format("HH:mm YYYY-MM-DD") // Updated to use moment
                  : "غير متوفر"}
              </Typography>
            </Box>

            <Box display="flex" columnGap={2}>
              <Typography
                sx={{
                  color: "secondary.main",
                  display: "flex",
                  columnGap: 1,
                  textAlign: "center",
                }}
                variant="h4"
                fontWeight={700}
              >
                تاريخ الفقد :
              </Typography>
              <Typography variant="body1">
                {helpData.missing_date
                  ? moment(helpData.missing_date).format("HH:mm YYYY-MM-DD") // Updated to use moment
                  : "غير متوفر"}
              </Typography>
            </Box>
            <Box display="flex" columnGap={2}>
              <Typography
                sx={{
                  color: "secondary.main",
                  display: "flex",
                  columnGap: 1,
                  textAlign: "center",
                }}
                variant="h4"
                fontWeight={700}
              >
                وصف المظهر :
              </Typography>
              <Typography variant="body1">
                {helpData.appearance_description}
              </Typography>
            </Box>
            <Box display="flex" columnGap={2}>
              <Typography
                sx={{
                  color: "secondary.main",
                  display: "flex",
                  columnGap: 1,
                  textAlign: "center",
                }}
                variant="h4"
                fontWeight={700}
              >
                ملاحظات:
              </Typography>
              <Typography variant="body1">{helpData.notice}</Typography>
            </Box>
            <Box display="flex" columnGap={2}>
              <Typography
                sx={{
                  color: "secondary.main",
                  display: "flex",
                  columnGap: 1,
                  textAlign: "center",
                }}
                variant="h4"
                fontWeight={700}
              >
                ملاحظات الموقع:
              </Typography>
              <Typography variant="body1">
                {helpData.location_details}
              </Typography>
            </Box>

            {helpData.image && (
              <Box display="flex" flexDirection="column" rowGap={1}>
                <Typography
                  sx={{
                    color: "secondary.main",
                    textAlign: "center",
                  }}
                  variant="h4"
                  fontWeight={700}
                >
                  صور المفقود:
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  <Box
                    onClick={() => setSelectedImage(helpData.image)}
                    sx={{
                      cursor: "pointer",
                      "&:hover": { opacity: 0.8 },
                    }}
                  >
                    <img
                      src={helpData.image}
                      alt={`صورة المفقود `}
                      style={{ maxWidth: "100px", borderRadius: "4px" }}
                    />
                  </Box>
                </Box>
              </Box>
            )}
          </>
        )}

        <Button
          color="warning"
          sx={{ mt: 1, width: "fit-content" }}
          onClick={() => {
            setToggleShow(!toggleShow);
            if (!toggleShow) {
              refetch();
            }
          }}
        >
          {!toggleShow ? "المزيد" : "عرض اقل"}
        </Button>
      </Box>

      {/* Modal for enlarged image */}
      <Modal
        open={!!selectedImage}
        onClose={() => setSelectedImage(undefined)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <>
          {selectedImage && (
            <Box
              sx={{
                outline: "none",
                maxHeight: "90%",
                maxWidth: "90%",
                position: "relative",
              }}
            >
              <img
                src={selectedImage}
                alt="صورة المفقود (مكبرة)"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  boxShadow: "0 0 10px rgba(0,0,0,0.5)",
                }}
              />
            </Box>
          )}
        </>
      </Modal>
    </Paper>
  );
};

type HelpListItemProps = {
  item: HelpsSummary[0];
};
