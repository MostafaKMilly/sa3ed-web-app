import API from "@/api/httpClient";
import { useQuery } from "@tanstack/react-query";

const aboutusQuery = {
  queryKey: ["Aboutus"],
  queryFn: () =>
    API.get<{ html: string }, { data: { html: string } }>(
      "info/aboutus",
      (res) => res.data
    ),
};
export const AboutusDialigContent = () => {
  const { data } = useQuery(aboutusQuery);

  return <div dangerouslySetInnerHTML={{ __html: data?.html || "" }} />;
};
