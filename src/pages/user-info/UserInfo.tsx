import { Box, Typography, CircularProgress } from "@mui/material";
import { Suspense } from "react";
import { UserRequests } from "./components/UserRequests";

export const UserInfo = () => {
  return (
    <Box width="100%">
      <Typography variant="h2" fontWeight={700} sx={{ color: "common.black" }}>
        بياناتي
      </Typography>
      <Box mt={5} width="100%">
        <Suspense fallback={<CircularProgress />}>
          <UserRequests />
        </Suspense>
      </Box>
    </Box>
  );
};
