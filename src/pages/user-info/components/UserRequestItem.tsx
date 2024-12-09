import { Box, Paper, alpha, Typography, Button, Modal } from "@mui/material";
import { locationQuery } from "@/pages/donation/Donation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API from "@/api/httpClient";
import { toast } from "react-toastify";
import { useState } from "react";

interface MissingPersonData {
  id: number;
  full_name: string;
  date_of_birth: string;
  id_city: number;
  id_area: number;
  missing_date: string;
  appearance_description: string;
  image?: string;
  created_at?: string;
  phone: string; // Added phone field
  notice?: string; // Added notice field (optional)
  location_details?: string;
}

function UserRequestItem({ item }: { item: MissingPersonData }) {
  const { data: location } = useQuery(locationQuery);
  const client = useQueryClient();
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { mutate } = useMutation(() => API.remove("help/" + item.id), {
    onSuccess: () => {
      toast("تم حذف الطلب بنجاح", {
        type: "success",
        position: toast.POSITION.TOP_CENTER,
      });
      client.invalidateQueries(["Requests"]);
    },
  });

  const city = location?.find((city: any) => city.id === item.id_city)?.name;
  const area = location
    ?.find((city: any) => city.id === item.id_city)
    ?.city_area.find((a: any) => a.id === item.id_area)?.name;

  const handleImageClick = (img: string) => {
    setSelectedImage(img);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedImage(null);
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        backgroundColor: ({ palette }) => alpha(palette.primary.light, 0.4),
        borderRadius: "8px",
        maxWidth: "350px",
        display: "flex",
        flexDirection: "column",
        rowGap: 2,
      }}
    >
      {/* اسم المفقود */}
      <Box display="flex" columnGap={2}>
        <Typography
          sx={{
            color: "secondary.dark",
            textAlign: "center",
          }}
          variant="h4"
          fontWeight={700}
        >
          اسم المفقود:
        </Typography>
        <Typography variant="body1">{item.full_name}</Typography>
      </Box>

      {/* تاريخ الميلاد */}
      <Box display="flex" columnGap={2}>
        <Typography
          sx={{
            color: "secondary.dark",
            textAlign: "center",
          }}
          variant="h4"
          fontWeight={700}
        >
          تاريخ الميلاد:
        </Typography>
        <Typography variant="body1">{item.date_of_birth}</Typography>
      </Box>

      {/* مكان الاختفاء (المحافظة) */}
      <Box display="flex" columnGap={2}>
        <Typography
          sx={{
            color: "secondary.dark",
            textAlign: "center",
          }}
          variant="h4"
          fontWeight={700}
        >
          مكان الاختفاء (المحافظة):
        </Typography>
        <Typography variant="body1">{city}</Typography>
      </Box>

      {/* مكان الاختفاء (المنطقة) */}
      <Box display="flex" columnGap={2}>
        <Typography
          sx={{
            color: "secondary.dark",
            textAlign: "center",
          }}
          variant="h4"
          fontWeight={700}
        >
          مكان الاختفاء (المنطقة):
        </Typography>
        <Typography variant="body1">{area}</Typography>
      </Box>

      {/* تاريخ الاختفاء */}
      <Box display="flex" columnGap={2}>
        <Typography
          sx={{
            color: "secondary.dark",
            textAlign: "center",
          }}
          variant="h4"
          fontWeight={700}
        >
          تاريخ الاختفاء:
        </Typography>
        <Typography variant="body1">{item.missing_date}</Typography>
      </Box>

      {/* وصف المظهر */}
      <Box display="flex" columnGap={2}>
        <Typography
          sx={{
            color: "secondary.dark",
            textAlign: "center",
          }}
          variant="h4"
          fontWeight={700}
        >
          وصف المظهر:
        </Typography>
        <Typography variant="body1">{item.appearance_description}</Typography>
      </Box>

      {/* رقم الهاتف */}
      <Box display="flex" columnGap={2}>
        <Typography
          sx={{
            color: "secondary.dark",
            textAlign: "center",
          }}
          variant="h4"
          fontWeight={700}
        >
          رقم الهاتف:
        </Typography>
        <Typography variant="body1">{item.phone}</Typography>
      </Box>

      {/* الملاحظات */}
      {item.notice && (
        <Box display="flex" columnGap={2}>
          <Typography
            sx={{
              color: "secondary.dark",
              textAlign: "center",
            }}
            variant="h4"
            fontWeight={700}
          >
            الملاحظات:
          </Typography>
          <Typography variant="body1">{item.notice}</Typography>
        </Box>
      )}
      {item.location_details && (
        <Box display="flex" columnGap={2}>
          <Typography
            sx={{
              color: "secondary.dark",
              textAlign: "center",
            }}
            variant="h4"
            fontWeight={700}
          >
            ملاحظات الموقع:
          </Typography>
          <Typography variant="body1">{item.location_details}</Typography>
        </Box>
      )}

      {item.image && (
        <Box display="flex" flexDirection="column" rowGap={1}>
          <Typography
            sx={{
              color: "secondary.dark",
              textAlign: "center",
            }}
            variant="h4"
            fontWeight={700}
          >
            صور المفقود:
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1}>
            <Box
              onClick={() => handleImageClick(item.image!)}
              sx={{
                cursor: "pointer",
                "&:hover": { opacity: 0.8 },
              }}
            >
              <img
                src={item.image}
                alt="صورة المفقود"
                style={{ maxWidth: "100px", borderRadius: "4px" }}
              />
            </Box>
          </Box>
        </Box>
      )}

      <Button color="error" onClick={() => mutate()}>
        حذف البلاغ
      </Button>

      {/* Modal for enlarged image */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
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
}

export default UserRequestItem;
