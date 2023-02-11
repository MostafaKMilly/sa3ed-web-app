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
  name: string;
  id_area: number;
  help_type: number;
  created_at: string;
}>;

export type HelpData = {
  id: number;
  id_city: number;
  id_user: number;
  id_area: number;
  location_details: string;
  name: string;
  phone: string;
  help_type: number;
  notice: string;
  moveable: boolean;
  available: boolean;
  is_offer: boolean;
  created_at: string;
  updated_at: string;
};
