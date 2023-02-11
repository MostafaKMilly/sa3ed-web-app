import API from "@/api/httpClient";
import { HelpData } from "@/pages/help/types";
import { useQuery } from "@tanstack/react-query";
import { Box, Paper, alpha, Typography } from "@mui/material";
import UserRequestItem from "./UserRequestItem";
import HistoryIcon from "@mui/icons-material/History";

const requestQuery = {
  queryKey: ["Requests"],
  queryFn: () =>
    API.get<HelpData[], { data: HelpData[] }>(
      "helpinfo/helps/me",
      (res) => res.data
    ),
  suspense: true,
};

export const UserRequests = () => {
  const { data: requests } = useQuery(requestQuery);

  return (
    <Box display="flex" flexDirection="column" rowGap={3} width="100%" mb={9}>
      {requests?.map((request) => (
        <UserRequestItem item={request} key={request.id} />
      ))}
      {!requests?.length && (
        <Box
          display="flex"
          flexDirection="column"
          rowGap={2}
          width="100%"
          height="100%"
          alignItems="center"
          justifyContent="center"
          p={2}
        >
          <HistoryIcon fontSize="large" sx={{ color: "primary.dark" }} />
          <Typography
            variant="h3"
            fontWeight={700}
            sx={{ color: "primary.dark" }}
          >
            لا يوجد بيانات لعرضها
          </Typography>
        </Box>
      )}
    </Box>
  );
};
