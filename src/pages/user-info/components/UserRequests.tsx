import API from "@/api/httpClient";
import { HelpData } from "@/pages/help/types";
import { useQuery } from "@tanstack/react-query";
import { Box, Paper, alpha } from "@mui/material";
import UserRequestItem from "./UserRequestItem";

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
    <Box display="flex" flexDirection="column" rowGap={3} width="100%">
      {requests?.map((request) => (
        <UserRequestItem item={request} key={request.id} />
      ))}
    </Box>
  );
};
