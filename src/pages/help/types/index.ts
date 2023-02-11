export type Locations = Array<{
  name: string;
  id: number;
  city_area: Array<{
    id: number;
    name: string;
  }>;
}>;

export type HelpTypes = Array<{ id: number; name: string }>;

export type Filter = {
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
};

export type HelpsSummary = Array<{
  id: number;
  id_city: number;
  name:string;
  id_area: number;
  help_type: number;
  created_at: string;
}>;
