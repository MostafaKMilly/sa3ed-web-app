import API from "@/api/httpClient";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Filter, HelpsSummary } from "../types";
import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { GenericAccordion } from "@/shared";
import { HelpListItem } from "./HelpListItem";

export const getHelpsQuery = (params: Record<string, any>) => ({
  queryKey: ["Helps", params],
  queryFn: ({ pageParam }: { pageParam?: number }) =>
    API.get<HelpsSummary, { data: { data: HelpsSummary } }>(
      "help",
      (res) => res?.data?.data,
      {
        params: { ...params, page: pageParam },
      }
    ),
});

export const HelpsList = ({ filter }: HelpsListProps) => {
  const { data, isLoading } = useInfiniteQuery({
    ...getHelpsQuery({
      id_city: filter.city?.id,
      id_area: filter.area?.id,
      help_type: filter.helpType?.id,
    }),
    getNextPageParam: (_, allPages) => {
      const page = [...allPages].pop();
      if (!page?.length) {
        return false;
      }
      return allPages.length;
    },
  });

  if (isLoading) {
    return <CircularProgress sx={{ mt: 1, textAlign: "center" }} />;
  }

  return (
    <Box mt={3} width="100%">
      <Box display="flex" flexDirection="column" rowGap={4}>
        {data?.pages.map((page) =>
          page.map((help) => <HelpListItem item={help} />)
        )}
      </Box>
    </Box>
  );
};

type HelpsListProps = {
  filter: Filter;
};
/* 
"id": 13,
"name": "karem alkoul",
"id_city": 1,
"id_area": 1,
"help_type": 2,
"created_at": "2023-02-10T23:56:16.000Z" */
