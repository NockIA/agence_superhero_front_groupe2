import { HeroCardInterface } from "../components/HeroCard/hero_card";

export const apiUrl = "http://localhost:8000/api/";

export interface link {
  name: string;
  url: string;
}

export interface PowersProps {
  id: string;
  name: string;
  image: string;
}

export interface GadgetsProps {
  id: string;
  name: string;
  image: string;
}

export interface VehicleProps {
  id: string;
  name: string;
  image: string;
  desc: string;
}

export interface PlanetProps {
  id: string;
  name: string;
  image: string;
  desc: string;
}

export const navLinks: link[] = [
  { name: "Home", url: "/" },
  { name: "Create your hero", url: "/create-hero" },
];

export interface TagProps {
  method: string;
  request: string;
  title: string;
  datas?: Object;
}

export const tags: Array<TagProps> = [
  {
    method: "GET",
    request: "getSuperHeros",
    title: "All characters",
  },
  {
    method: "POST",
    request: "getSuperHerosByUser",
    title: "My characters",
  },
  {
    method: "GET",
    request: "getgadgets",
    title: "All gadgets",
  },
  {
    method: "GET",
    request: "getPlanets",
    title: "All Planets",
  },
  {
    method: "GET",
    request: "getVehicles",
    title: "All vehicles",
  },
];

export const PlanetTest: Array<PlanetProps> = [
  {
    id: "8db666c5-0caf-475d-a67f-4e6bda55366c",
    image: "https://picsum.photos/seed/picsum/200/300",
    name: "Terre",
    desc : "I'm a blue planet"
  },
  {
    id: "8db666c5-0caf-475d-a67f-4e6bda55366c",
    image: "https://picsum.photos/seed/picsum/200/300",
    name: "Mars",
    desc : "I'm a blue planet"
  },
  {
    id: "8db666c5-0caf-475d-a67f-4e6bda55366c",
    image: "https://picsum.photos/seed/picsum/200/300",
    name: "Jup",
    desc : "I'm a blue planet"
  },
  {
    id: "8db666c5-0caf-475d-a67f-4e6bda55366c",
    image: "https://picsum.photos/seed/picsum/200/300",
    name: "Urs",
    desc : "I'm a blue planet"
  },
  {
    id: "8db666c5-0caf-475d-a67f-4e6bda55366c",
    image: "https://picsum.photos/seed/picsum/200/300",
    name: "Sat",
    desc : "I'm a blue planet"
  },
];

export const heroesDefault: Array<HeroCardInterface> = [
  {
    id: "8db666c5-0caf-475d-a67f-4e6bda55366c",
    image: "https://picsum.photos/seed/picsum/200/300",
    name: "SUPERMAN",
    team: "Justice league member",
  },
  {
    id: "8db666c5-0caf-475d-a67f-4e6bda55366c",
    image: "https://picsum.photos/seed/picsum/200/300",
    name: "BatMan",
    team: "Justice league member",
  },
  {
    id: "8db666c5-0caf-475d-a67f-4e6bda55366c",
    image: "https://picsum.photos/seed/picsum/200/300",
    name: "Spider-man",
    team: "Justice league member",
  },
  {
    id: "8db666c5-0caf-475d-a67f-4e6bda55366c",
    image: "https://picsum.photos/seed/picsum/200/300",
    name: "WolfWerine",
    team: "Justice league member",
  },
  {
    id: "8db666c5-0caf-475d-a67f-4e6bda55366c",
    image: "https://picsum.photos/seed/picsum/200/300",
    name: "SUPERMAN",
    team: "Justice league member",
  },
  {
    id: "8db666c5-0caf-475d-a67f-4e6bda55366c",
    image: "https://picsum.photos/seed/picsum/200/300",
    name: "BatMan",
    team: "Justice league member",
  },
  {
    id: "8db666c5-0caf-475d-a67f-4e6bda55366c",
    image: "https://picsum.photos/seed/picsum/200/300",
    name: "Spider-man",
    team: "Justice league member",
  },
  {
    id: "8db666c5-475d-a67f-4e6bda55366c",
    image: "https://picsum.photos/seed/picsum/200/300",
    name: "WolfWerine",
    team: "Justice league member",
  },
];
