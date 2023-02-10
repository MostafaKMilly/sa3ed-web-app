import React from "react";
import { FilterPanel, GenericAccordion } from "@/shared";
import { Box, alpha } from "@mui/material";
import { useFilterLocation } from "./hooks/useFilterLocation";

export const Home = () => {
  const { state: location, handleFilterLocation } = useFilterLocation();

  return (
    <Box width="100%">
      <FilterPanel
        location={location}
        handleChangeLocation={handleFilterLocation}
      />
    </Box>
  );
};
