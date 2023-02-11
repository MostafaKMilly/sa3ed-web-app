import API from "@/api/httpClient";
import { Locations } from "@/pages/help/types";
import { AutocompleteProps, Autocomplete, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

const locationQuery = {
  queryKey: ["Location"],
  queryFn: () =>
    API.get<Locations, { data: Locations }>(
      "/location/all",
      (res) => res?.data
    ),
};

function CitiesCombo<T>(
  props: Partial<AutocompleteProps<T, undefined, undefined, undefined>>
) {
  const { data, isLoading } = useQuery(locationQuery);
  const cities = data?.map((city) => ({ id: city.id, name: city.name })) || [];

  return (
    <Autocomplete
      loading={isLoading}
      options={cities as T[]}
      sx={{
        width: {
          xs: "100%",
          sm: "240px",
        },
      }}
      renderInput={(props) => (
        <TextField {...props} placeholder="اختار المحافظة" color="tertiary" />
      )}
      {...props}
    />
  );
}

export default CitiesCombo;
