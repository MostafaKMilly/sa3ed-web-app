import API from "@/api/httpClient";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Filter, HelpsSummary } from "../types";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";

import { HelpListItem } from "./HelpListItem";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import HandshakeIcon from "@mui/icons-material/Handshake";

export const getHelpsQuery = (params: Record<string, any>) => ({
  queryKey: ["Helps", params],
  queryFn: ({ pageParam }: { pageParam?: number }) =>
    API.get<
      { helps: HelpsSummary; lastPage: number },
      { data: { data: HelpsSummary; last_page: number } }
    >(
      "help",
      (res) => ({ helps: res.data.data, lastPage: res.data.last_page }),
      {
        params: { ...params, page: pageParam },
      }
    ),
});

export const HelpsList = ({ filter }: HelpsListProps) => {
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      ...getHelpsQuery({
        id_city: filter.city?.id,
        id_area: filter.area?.id,
        help_type: filter.helpType?.id,
        full_name: filter.full_name,
        missing_date: filter.missing_date?.format("YYYY-MM-DD"),
      }),

      getNextPageParam: (_, allPages) => {
        const page = [...allPages].pop();
        if (allPages.length === page?.lastPage || !page?.helps.length) {
          return false;
        }
        return allPages.length + 1;
      },
    });

  if (isLoading) {
    return <CircularProgress sx={{ mt: 1, textAlign: "center" }} />;
  }

  return (
    <Box mt={3} mb={8} width="100%">
      <Box display="flex" flexDirection="column" rowGap={4}>
        {data?.pages.map((page) =>
          page.helps.map((help) => <HelpListItem item={help} />)
        )}
        {data?.pages[0].lastPage === 0 && (
          <Box
            display="flex"
            flexDirection="column"
            rowGap={2}
            width="100%"
            height="100%"
            alignItems="center"
            justifyContent="center"
            p={2}
            mt={2}
          >
            <HandshakeIcon fontSize="large" sx={{ color: "primary.dark" }} />
            <Typography
              variant="h3"
              fontWeight={700}
              sx={{ color: "primary.dark" }}
            >
              لا يوجد مساعدات لعرضها
            </Typography>
          </Box>
        )}
        {!isFetchingNextPage ? (
          hasNextPage && (
            <Button
              variant="text"
              sx={{ width: "fit-content", color: "secondary.dark", my: 3 }}
              endIcon={<ArrowDownwardIcon sx={{ color: "secondary.dark" }} />}
              onClick={() => fetchNextPage()}
            >
              تحميل المزيد
            </Button>
          )
        ) : (
          <Typography
            variant="body1"
            fontWeight={600}
            sx={{ color: "secondary.dark" }}
          >
            جاري تحميل الصفحة ..
          </Typography>
        )}
      </Box>
    </Box>
  );
};

type HelpsListProps = {
  filter: Filter;
};
