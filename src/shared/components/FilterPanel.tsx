import React from "react";
import { Box, Autocomplete, TextField } from "@mui/material";
import { GenericAccordion } from "./GenericAccordion";
import { useQuery } from "@tanstack/react-query";
import API from "@/api/httpClient";
import { AxiosResponse } from "axios";
import { DATA } from "../static/data";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const locationQuery = {
  queryKey: ["Location"],
  queryFn: () =>
    API.get<Locations, { data: Locations }>(
      "/location/all",
      (res) => res?.data
    ),
};

export const FilterPanel = (props: FilterPanelProps) => {
  const { data, isLoading } = useQuery(locationQuery);

  const cities = data?.map((city) => ({ id: city.id, name: city.name })) || [];
  const areas =
    data?.find((city) => city.id === props.location?.city?.id)?.city_area || [];

  return (
    <GenericAccordion
      filled
      title="تصفية النتائج حسب"
      icon={<FilterAltIcon sx={{ mr: 1, color: "secondary.main" }} />}
    >
      <Box display="flex" columnGap={4} pb={2}>
        <Autocomplete
          value={props.location.city}
          loading={isLoading}
          options={cities}
          sx={{ width: "240px" }}
          getOptionLabel={(city) => city.name || ""}
          onChange={(_, val) => {
            props.handleChangeLocation({
              city: val!,
              area: {},
            });
          }}
          renderInput={(props) => (
            <TextField
              {...props}
              placeholder="اختار المحافظة"
              color="tertiary"
            />
          )}
        />
        <Autocomplete
          options={areas}
          value={props.location.area}
          disabled={!Boolean(areas.length)}
          loading={isLoading}
          getOptionLabel={(area) => area.name || ""}
          sx={{ width: "240px" }}
          onChange={(e, val) => {
            props.handleChangeLocation({
              ...props.location,
              area: val!,
            });
          }}
          renderInput={(props) => (
            <TextField
              {...props}
              placeholder="اختار المنطقة"
              color="tertiary"
            />
          )}
        />
      </Box>
    </GenericAccordion>
  );
};

type Locations = Array<{
  name: string;
  id: number;
  city_area: Array<{
    id: number;
    name: string;
  }>;
}>;

type Location = {
  city: {
    name?: string;
    id?: number;
  };
  area: {
    name?: string;
    id?: number;
  };
};

export type FilterPanelProps = {
  location: Location;
  handleChangeLocation: (location: Location) => void;
};
