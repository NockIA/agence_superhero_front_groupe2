import { HeroCardInterface } from "../components/HeroCard/hero_card";

export interface PowersProps {
  id: string;
  name: string;
  linkImage: string;
}

export interface GadgetsProps {
  id: string;
  name: string;
  linkImage: string;
}

export interface VehicleProps {
  id: string;
  name: string;
  linkImage: string;
  description: string;
}

export interface PlanetProps {
  id: string;
  name: string;
  linkImage: string;
  description: string;
}

export interface SingleHeroProps {
  UUID: string;
  description: string;
  firstname: string;
  hairColor: string;
  heroname: string;
  lastname: string;
  linkImage: string;
  originPlannet: PlanetProps;
  sexe: string;
  canModificate : boolean;
  vehicle: number;
  team: PlanetProps;
  gadgets: Array<HeroCardInterface>;
  powers: Array<HeroCardInterface>;
  city: Array<HeroCardInterface>;
}
