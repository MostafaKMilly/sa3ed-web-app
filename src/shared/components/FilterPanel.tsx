import { Box, Autocomplete, TextField } from "@mui/material";
import { GenericAccordion } from "./GenericAccordion";
import { useQuery } from "@tanstack/react-query";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { helpTypesQuery, locationQuery } from "@/pages/help/Help";
import { Filter } from "@/pages/help/types";

export const FilterPanel = (props: FilterPanelProps) => {
  const { data, isLoading } = useQuery(locationQuery);
  const { data: types, isLoading: isTypesLoading } = useQuery(helpTypesQuery);

  const cities = data?.map((city) => ({ id: city.id, name: city.name })) || [];
  const areas =
    data?.find((city) => city.id === props.filter?.city?.id)?.city_area || [];

  return (
    <GenericAccordion
      filled
      title="تصفية النتائج حسب"
      icon={<FilterAltIcon sx={{ mr: 1, color: "secondary.main" }} />}
    >
      <Box
        display="flex"
        columnGap={4}
        rowGap={3}
        pb={2}
        flexWrap={{
          xs: "wrap",
          sm: "nowrap",
        }}
      >
        <Autocomplete
          value={props.filter.helpType}
          loading={isTypesLoading}
          options={types || []}
          sx={{
            width: {
              xs: "100%",
              sm: "240px",
            },
          }}
          getOptionLabel={(city) => city.name || ""}
          onChange={(_, val) => {
            props.handleFilterChange({
              ...props.filter,
              helpType: val,
            });
          }}
          renderInput={(props) => (
            <TextField {...props} placeholder="نوع المساعدة" color="tertiary" />
          )}
        />
        <Autocomplete
          value={props.filter.city}
          loading={isLoading}
          options={cities}
          sx={{
            width: {
              xs: "100%",
              sm: "240px",
            },
          }}
          getOptionLabel={(city) => city.name || ""}
          onChange={(_, val) => {
            props.handleFilterChange({
              ...props.filter,
              city: val,
              area: null,
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
          value={props.filter.area}
          disabled={!Boolean(areas.length)}
          loading={isLoading}
          getOptionLabel={(area) => area.name || ""}
          sx={{
            width: {
              xs: "100%",
              sm: "240px",
            },
          }}
          onChange={(e, val) => {
            props.handleFilterChange({
              ...props.filter,
              area: val,
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

export type FilterPanelProps = {
  filter: Filter;
  handleFilterChange: (filter: Filter) => void;
};
