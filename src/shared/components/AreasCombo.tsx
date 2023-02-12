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

function AreasCombo<T>(
  props: Partial<AutocompleteProps<T, undefined, undefined, undefined>> & {
    cityId?: number;
  }
) {
  const { data, isLoading } = useQuery(locationQuery);
  const areas = data?.find((city) => city.id === props.cityId)?.city_area || [];

  return (
    <Autocomplete
      options={areas as T[]}
      disabled={!Boolean(areas.length)}
      loading={isLoading}
      sx={{
        width: {
          xs: "100%",
          sm: "240px",
        },
      }}
      renderInput={(props) => (
        <TextField {...props} placeholder="اختار المنطقة" color="warning" />
      )}
      {...props}
    />
  );
}

export default AreasCombo;
