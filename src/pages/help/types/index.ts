import { Moment } from "moment";

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
  full_name?: string;
  missing_date?: Moment | null;
};

export type HelpsSummary = Array<{
  id: number;
  id_city: number;
  full_name: string;
  id_area: number;
  help_type: number;
  created_at: string;
}>;

export type HelpData = {
  id: number;
  full_name: string;
  date_of_birth: string;
  id_city: number;
  id_area: number;
  missing_date: string;
  appearance_description: string;
  image?: string;
  created_at: string;
  updated_at: string;
  phone: string;
  notice?: string;
  location_details?: string;
};
