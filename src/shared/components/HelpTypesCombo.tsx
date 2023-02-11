import API from "@/api/httpClient";
import { HelpTypes } from "@/pages/help/types";
import { AutocompleteProps, Autocomplete, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

const helpTypesQuery = {
  queryKey: ["HelpType"],
  queryFn: () =>
    API.get<HelpTypes, { data: HelpTypes }>(
      "/helpinfo/types",
      (res) => res?.data
    ),
};

function HelpTypesCombo<T>(
  props: Partial<AutocompleteProps<T, undefined, undefined, undefined>>
) {
  const { data: types, isLoading: isTypesLoading } = useQuery(helpTypesQuery);

  return (
    <Autocomplete
      loading={isTypesLoading}
      options={(types || []) as T[]}
      sx={{
        width: {
          xs: "100%",
          sm: "240px",
        },
      }}
      renderInput={(props) => (
        <TextField {...props} placeholder="نوع المساعدة" color="tertiary" />
      )}
      {...props}
    />
  );
}

export default HelpTypesCombo;
