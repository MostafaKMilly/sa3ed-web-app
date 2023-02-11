import { Box, Paper, alpha, Typography, Button } from "@mui/material";
import { helpTypesQuery, locationQuery } from "@/pages/donation/Donation";
import { HelpData } from "@/pages/help/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API from "@/api/httpClient";
import { toast } from "react-toastify";

function UserRequestItem({ item }: { item: HelpData }) {
  const { data: location } = useQuery(locationQuery);
  const { data: types } = useQuery(helpTypesQuery);
  const client = useQueryClient();

  const { mutate } = useMutation(
    () =>
      API.remove(!item.is_offer ? "help/" + item.id : "offerhelp/" + item.id),
    {
      onSuccess: () => {
        toast("تم حذف الطلب بنجاح", {
          type: "success",
          position: toast.POSITION.TOP_CENTER,
        });
        client.invalidateQueries(["Requests"]);
      },
    }
  );
  const city = location?.find((city) => city.id === item.id_city)?.name;
  const area = location
    ?.find((city) => city.id === item.id_city)
    ?.city_area.find((area) => area.id === item.id_area)?.name;
  const type = types?.find((type) => type.id === item.help_type)?.name;

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        backgroundColor: ({ palette }) => alpha(palette.primary.light, 0.4),
        borderRadius: "8px",
        maxWidth: "350px",
        display: "flex",
        flexDirection: "column",
        rowGap: 2,
      }}
    >
      <Box display="flex" columnGap={2}>
        <Typography
          sx={{
            color: "secondary.dark",
            display: "flex",
            columnGap: 1,
            textAlign: "center",
          }}
          variant="h4"
          fontWeight={700}
        >
          النوع :
        </Typography>
        <Typography variant="body1">
          {item.is_offer ? "طلب تبرع" : "طلب مساعدة"}
        </Typography>
      </Box>
      <Box display="flex" columnGap={2}>
        <Typography
          sx={{
            color: "secondary.dark",
            display: "flex",
            columnGap: 1,
            textAlign: "center",
          }}
          variant="h4"
          fontWeight={700}
        >
          {item.is_offer ? "نوع العرض :" : "نوع الطلب :"}
        </Typography>
        <Typography variant="body1">{type}</Typography>
      </Box>
      <Box display="flex" columnGap={2}>
        <Typography
          sx={{
            color: "secondary.dark",
            display: "flex",
            columnGap: 1,
            textAlign: "center",
          }}
          variant="h4"
          fontWeight={700}
        >
          المحافظة :
        </Typography>
        <Typography variant="body1">{city}</Typography>
      </Box>
      <Box display="flex" columnGap={2}>
        <Typography
          sx={{
            color: "secondary.dark",
            display: "flex",
            columnGap: 1,
            textAlign: "center",
          }}
          variant="h4"
          fontWeight={700}
        >
          المنطقة :
        </Typography>
        <Typography variant="body1">{area}</Typography>
      </Box>
      <Box display="flex" columnGap={2}>
        <Typography
          sx={{
            color: "secondary.dark",
            display: "flex",
            columnGap: 1,
            textAlign: "center",
          }}
          variant="h4"
          fontWeight={700}
        >
          العنوان :
        </Typography>
        <Typography variant="body1">{item.location_details}</Typography>
      </Box>
      <Box display="flex" columnGap={2}>
        <Typography
          sx={{
            color: "secondary.dark",
            display: "flex",
            columnGap: 1,
            textAlign: "center",
          }}
          variant="h4"
          fontWeight={700}
        >
          الاسم :
        </Typography>
        <Typography variant="body1">{item.location_details}</Typography>
      </Box>
      <Box display="flex" columnGap={2}>
        <Typography
          sx={{
            color: "secondary.dark",
            display: "flex",
            columnGap: 1,
            textAlign: "center",
          }}
          variant="h4"
          fontWeight={700}
        >
          رقم التواصل :
        </Typography>
        <Typography variant="body1">{item.phone}</Typography>
      </Box>
      <Box display="flex" columnGap={2}>
        <Typography
          sx={{
            color: "secondary.dark",
            display: "flex",
            columnGap: 1,
            textAlign: "center",
          }}
          variant="h4"
          fontWeight={700}
        >
          الملاحظات :
        </Typography>
        <Typography variant="body1">{item.notice}</Typography>
      </Box>
      <Box display="flex" columnGap={2}>
        <Typography
          sx={{
            color: "secondary.dark",
            display: "flex",
            columnGap: 1,
            textAlign: "center",
          }}
          variant="h4"
          fontWeight={700}
        >
          التاريخ :
        </Typography>
        <Typography variant="body1">
          {new Date(item.created_at).toUTCString()}
        </Typography>
      </Box>
      <Button color="error" onClick={() => mutate()}>
        حذف الطلب
      </Button>
    </Paper>
  );
}

export default UserRequestItem;
