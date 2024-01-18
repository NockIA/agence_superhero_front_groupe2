import { HeroCardInterface } from "../components/HeroCard/hero_card";

export const apiUrl = "http://localhost:8000/api/";

export interface link {
  name: string;
  url: string;
}

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

export const navLinks: link[] = [
  { name: "Home", url: "/" },
  { name: "Create your hero", url: "/create-hero" },
];

export interface TagProps {
  request: string;
  title: string;
}

export const tags: Array<TagProps> = [
  {
    request: "allHeros",
    title: "All characters",
  },
  {
    request: "gadgets",
    title: "All gadgets",
  },
  {
    request: "plannets",
    title: "All Planets",
  },
  {
    request: "powers",
    title: "All Powers",
  },
  {
    request: "vehicles",
    title: "All vehicles",
  },
  {
    request: "city",
    title: "All Cities",
  },
];

export const PlanetTest: Array<PlanetProps> = [
  {
    id: "8db666c5-0caf-475d-a67f-4e6bda55366c",
    linkImage: "https://picsum.photos/seed/picsum/200/300",
    name: "Terre",
    description: "I'm a blue planet",
  },
  {
    id: "8db666c5-0caf-475d-a67f-4e6bda55366c",
    linkImage: "https://picsum.photos/seed/picsum/200/300",
    name: "Mars",
    description: "I'm a blue planet",
  },
  {
    id: "8db666c5-0caf-475d-a67f-4e6bda55366c",
    linkImage: "https://picsum.photos/seed/picsum/200/300",
    name: "Jup",
    description: "I'm a blue planet",
  },
  {
    id: "8db666c5-0caf-475d-a67f-4e6bda55366c",
    linkImage: "https://picsum.photos/seed/picsum/200/300",
    name: "Urs",
    description: "I'm a blue planet",
  },
  {
    id: "8db666c5-0caf-475d-a67f-4e6bda55366c",
    linkImage: "https://picsum.photos/seed/picsum/200/300",
    name: "Sat",
    description: "I'm a blue planet",
  },
];

export const VehicleTest: Array<PlanetProps> = [
  {
    id: "8db666c5-0caf-475d-a67f-4e6bda55366c",
    linkImage: "https://picsum.photos/seed/picsum/200/300",
    name: "Peugeot",
    description: "Family car",
  },
  {
    id: "8db666c5-0caf-475d-a67f-4e6bda55366c",
    linkImage: "https://picsum.photos/seed/picsum/200/300",
    name: "Renault",
    description: "Police car",
  },
  {
    id: "8db666c5-0caf-475d-a67f-4e6bda55366c",
    linkImage: "https://picsum.photos/seed/picsum/200/300",
    name: "Fiat",
    description: "Small car",
  },
  {
    id: "8db666c5-0caf-475d-a67f-4e6bda55366c",
    linkImage: "https://picsum.photos/seed/picsum/200/300",
    name: "Audi Quatro",
    description: "Rally car",
  },
];

export const heroesDefault: Array<HeroCardInterface> = [
  {
    id: "8db666c5-0caf-475d-a67f-4e6bda55366c",
    linkImage: "https://picsum.photos/seed/picsum/200/300",
    name: "SUPERMAN",
    team: "Justice league member",
  },
  {
    id: "8db666c5-0caf-475d-a67f-4e6bda55366c",
    linkImage: "https://picsum.photos/seed/picsum/200/300",
    name: "BatMan",
    team: "Justice league member",
  },
  {
    id: "8db666c5-0caf-475d-a67f-4e6bda55366c",
    linkImage: "https://picsum.photos/seed/picsum/200/300",
    name: "Spider-man",
    team: "Justice league member",
  },
  {
    id: "8db666c5-0caf-475d-a67f-4e6bda55366c",
    linkImage: "https://picsum.photos/seed/picsum/200/300",
    name: "WolfWerine",
    team: "Justice league member",
  },
  {
    id: "8db666c5-0caf-475d-a67f-4e6bda55366c",
    linkImage: "https://picsum.photos/seed/picsum/200/300",
    name: "SUPERMAN",
    team: "Justice league member",
  },
  {
    id: "8db666c5-0caf-475d-a67f-4e6bda55366c",
    linkImage: "https://picsum.photos/seed/picsum/200/300",
    name: "BatMan",
    team: "Justice league member",
  },
  {
    id: "8db666c5-0caf-475d-a67f-4e6bda55366c",
    linkImage: "https://picsum.photos/seed/picsum/200/300",
    name: "Spider-man",
    team: "Justice league member",
  },
  {
    id: "8db666c5-475d-a67f-4e6bda55366c",
    linkImage: "https://picsum.photos/seed/picsum/200/300",
    name: "WolfWerine",
    team: "Justice league member",
  },
];
