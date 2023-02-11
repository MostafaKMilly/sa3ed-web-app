import { FilterPanel } from "@/shared";
import { Box, Button, alpha } from "@mui/material";
import { useFilterPanel } from "./hooks/useFilterPanel";
import API from "@/api/httpClient";
import { HelpTypes, Locations } from "./types";
import { DonationList } from "./components";
import AddIcon from "@mui/icons-material/Add";

export const locationQuery = {
  queryKey: ["Location"],
  queryFn: () =>
    API.get<Locations, { data: Locations }>(
      "/location/all",
      (res) => res?.data
    ),
};

export const helpTypesQuery = {
  queryKey: ["HelpType"],
  queryFn: () =>
    API.get<HelpTypes, { data: HelpTypes }>(
      "/helpinfo/types",
      (res) => res?.data
    ),
};

export const Donation = () => {
  const { state: filter, handleFilterChange } = useFilterPanel();

  return (
    <Box width="100%" display="flex" flexDirection="column">
      <FilterPanel filter={filter} handleFilterChange={handleFilterChange} />
      <Button
        color="secondary"
        sx={{ mt: 3, width: "fit-content" }}
        endIcon={<AddIcon />}
      >
        اضافة تبرع
      </Button>
      <DonationList filter={filter} />
    </Box>
  );
};
