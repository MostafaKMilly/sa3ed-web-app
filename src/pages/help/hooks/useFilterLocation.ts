import React from "react";

export const useFilterLocation = () => {
  const [state, setState] = React.useState<Location>({
    city: {},
    area: {},
  });

  const handleFilterLocation = (location: Location) => {
    setState(location);
  };

  return { state, handleFilterLocation };
};

type Location = {
  city: {
    name?: string;
    id?: number;
  };
  area: {
    name?: string;
    id?: number;
  };
};
