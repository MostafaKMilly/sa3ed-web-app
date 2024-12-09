import { Dayjs } from "dayjs";
import React from "react";

export const useFilterPanel = () => {
  const [state, setState] = React.useState<Filter>({
    city: null,
    area: null,
    helpType: null,
  });

  const handleFilterChange = (filter: Filter) => {
    setState(filter);
  };

  return { state, handleFilterChange };
};

type Filter = {
  city: {
    name: string;
    id: number;
  } | null;
  area?: {
    name: string;
    id: number;
  } | null;
  helpType?: {
    name: string;
    id: number;
  } | null;
  full_name?: string; // New filter for the name of the missing person
  missing_date?: Dayjs | null; // New filter for the missing date
};
