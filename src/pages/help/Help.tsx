import React from "react";
import { FilterPanel, GenericAccordion } from "@/shared";
import { Box, CircularProgress, alpha } from "@mui/material";
import { useFilterPanel } from "./hooks/useFilterPanel";
import API from "@/api/httpClient";
import { useInfiniteQuery } from "@tanstack/react-query";
import { HelpTypes, Locations } from "./types";
import { HelpsList } from "./components";

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

export const Help = () => {
  const { state: filter, handleFilterChange } = useFilterPanel();

  return (
    <Box width="100%">
      <FilterPanel filter={filter} handleFilterChange={handleFilterChange} />
      <HelpsList filter={filter} />
    </Box>
  );
};
