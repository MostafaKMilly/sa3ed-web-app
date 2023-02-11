import { Button, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { HelpsSummary } from "../types";
import { useQuery } from "@tanstack/react-query";
import { helpTypesQuery, locationQuery } from "../Help";
import ClassIcon from "@mui/icons-material/Class";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { useState } from "react";

export const HelpListItem = ({ item }: HelpListItemProps) => {
  const [toggleShow, setToggleShow] = useState(true);
  const { data, isLoading } = useQuery(locationQuery);

  const { data: types, isLoading: isTypesLoading } = useQuery(helpTypesQuery);

  const city = data?.find((city) => city.id === item.id_city)?.name;
  const area = data
    ?.find((city) => city.id === item.id_city)
    ?.city_area.find((area) => area.id === item.id_area)?.name;
  const type = types?.find((type) => type.id === item.help_type)?.name;

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
            <PersonIcon fontSize="small" /> الاسم :
          </Typography>
          <Typography variant="body1">{item.name}</Typography>
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
            {new Date(item.created_at).toUTCString()}
          </Typography>
        </Box>
        <Button
          color="tertiary"
          sx={{ mt: 1, width: "fit-content" }}
          onClick={() => setToggleShow(!toggleShow)}
        >
          {toggleShow ? "المزيد" : "عرض اقل"}
        </Button>
      </Box>
    </Paper>
  );
};

type HelpListItemProps = {
  item: HelpsSummary[0];
};
