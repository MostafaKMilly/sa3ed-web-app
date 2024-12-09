import API from "@/api/httpClient";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { locationQuery } from "../donation/Donation";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import DescriptionIcon from "@mui/icons-material/Description";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";

const importantLinkQuery = {
  queryKey: ["Importants_Links"],
  queryFn: () =>
    API.get<Info[], { data: Info[] }>("importantinfo", (res) => res.data),
};

export const ImportantLinks = () => {
  const { data, isLoading } = useQuery(importantLinkQuery);
  const { data: location } = useQuery(locationQuery);

  const getCity = (id: number) => {
    return location?.find((city) => city.id === id)?.name;
  };

  if (isLoading) {
    return (
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" rowGap={4}>
      {data?.map((info) => (
        <>
          <Box display="flex" flexDirection="column" rowGap={3}>
            <Typography variant="h3" fontWeight={700} gutterBottom>
              {info.name}
            </Typography>
            <Box display="flex" columnGap={1} textAlign="center">
              <AccessTimeIcon
                sx={{ color: info.available ? "success.main" : "error.main" }}
              />
              <Typography
                variant="h4"
                sx={{ color: info.available ? "success.main" : "error.main" }}
              >
                {info.available ? "متاح" : "غير متاح"}
              </Typography>
            </Box>

            <Box
              display="flex"
              columnGap={1}
              textAlign="center"
              flexWrap={"wrap"}
            >
              <Typography
                sx={{
                  color: "common.black",
                  display: "flex",
                  columnGap: 1,
                  textAlign: "center",
                  minWidth: "200px",
                }}
                variant="h4"
                fontWeight={700}
              >
                <DescriptionIcon fontSize="small" /> مزيد من المعلومات :
              </Typography>
              <Typography variant="body1" textAlign="left">
                {info.description}
              </Typography>
            </Box>
          </Box>
          <Divider />
        </>
      ))}
    </Box>
  );
};

type Info = {
  id: number;
  id_city: number;
  id_area: null;
  name: string;
  available: boolean;
  location_details: string;
  info_type: number;
  description: string;
  created_at: string;
  updated_at: string;
};
