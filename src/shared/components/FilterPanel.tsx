import { Box } from "@mui/material";
import { GenericAccordion } from "./GenericAccordion";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Filter } from "@/pages/help/types";
import CitiesCombo from "./CitiesCombo";
import AreasCombo from "./AreasCombo";
import HelpTypesCombo from "./HelpTypesCombo";

export const FilterPanel = (props: FilterPanelProps) => {
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
        <HelpTypesCombo
          value={props.filter.helpType}
          getOptionLabel={(city) => city.name || ""}
          onChange={(_, val) => {
            props.handleFilterChange({
              ...props.filter,
              helpType: val,
            });
          }}
        />
        <CitiesCombo
          value={props.filter.city}
          onChange={(_, val) => {
            props.handleFilterChange({
              ...props.filter,
              city: val,
              area: null,
            });
          }}
          getOptionLabel={(city) => city.name || ""}
        />
        <AreasCombo
          value={props.filter.area}
          cityId={props.filter.city?.id}
          getOptionLabel={(area) => area.name || ""}
          onChange={(e, val) => {
            props.handleFilterChange({
              ...props.filter,
              area: val,
            });
          }}
        />
      </Box>
    </GenericAccordion>
  );
};

export type FilterPanelProps = {
  filter: Filter;
  handleFilterChange: (filter: Filter) => void;
};
