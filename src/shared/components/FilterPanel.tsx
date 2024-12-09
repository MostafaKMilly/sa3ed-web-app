import { Box, Autocomplete, TextField } from "@mui/material";
import { GenericAccordion } from "./GenericAccordion";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Filter } from "@/pages/help/types";
import CitiesCombo from "./CitiesCombo";
import AreasCombo from "./AreasCombo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";

export const FilterPanel = (props: FilterPanelProps) => {
  return (
    <GenericAccordion
      filled
      title="تصفية النتائج حسب"
      icon={<FilterAltIcon sx={{ mr: 1, color: "secondary.main" }} />}
    >
      {/* حقول البحث الجديدة */}
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
          freeSolo
          options={props.fullNameOptions}
          value={props.filter.full_name || ""}
          onChange={(e, val) => {
            console.log("val");
            props.handleFilterChange({
              ...props.filter,
              full_name: val || "",
            });
          }}
          sx={{
            width: {
              xs: "100%",
              sm: "240px",
            },
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="ادخل اسم المفقود"
              fullWidth
              sx={{ minWidth: { xs: "100%", sm: "240px" } }}
              onChange={(e) => {
                props.handleFilterChange({
                  ...props.filter,
                  full_name: e.target.value,
                });
              }}
            />
          )}
        />
        <DatePicker
          value={props.filter.missing_date || null}
          onChange={(newDate) => {
            props.handleFilterChange({
              ...props.filter,
              missing_date: newDate || null,
            });
          }}
          slotProps={{
            textField: {
              variant: "outlined",
              inputProps: {
                placeholder: "اختار تاريخ الفقد",
              },
              sx: {
                minWidth: {
                  xs: "100%",
                  sm: "240px",
                },
              },
            },
          }}
        />
      </Box>

      {/* الحقول الموجودة سابقاً */}
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
  filter: Filter & {
    full_name?: string;
    // Use Dayjs instead of Date for missing_date to match the DatePicker component
    missing_date?: Dayjs | null;
  };
  handleFilterChange: (
    filter: Filter & { full_name?: string; missing_date?: Dayjs | null }
  ) => void;
  fullNameOptions: string[];
};
