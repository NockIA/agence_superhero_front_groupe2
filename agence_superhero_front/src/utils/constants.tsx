import { HeroCardInterface } from "../components/HeroCard/hero_card";

export const apiUrl = "http://localhost:8000/api/";

export interface link {
  name: string;
  url: string;
}

export const navLinks: link[] = [
  { name: "Accueil", url: "/" },
  { name: "Héros", url: "/heros" },
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
    request: "getpowers",
    title: "All Powers",
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

export const heroesDefault : Array<HeroCardInterface> = [
    {
        id: "8db666c5-0caf-475d-a67f-4e6bda55366c",
        image: "https://picsum.photos/200/300",
        name: "SUPERMAN",
        team: "Justice league member",
      },
      {
        id: "8db666c5-0caf-475d-a67f-4e6bda55366c",
        image: "https://picsum.photos/200/300",
        name: "BatMan",
        team: "Justice league member",
      },
      {
        id: "8db666c5-0caf-475d-a67f-4e6bda55366c",
        image: "https://picsum.photos/200/300",
        name: "Spider-man",
        team: "Justice league member",
      },
      {
        id: "8db666c5-0caf-475d-a67f-4e6bda55366c",
        image: "https://picsum.photos/200/300",
        name: "WolfWerine",
        team: "Justice league member",
      },
      {
        id: "8db666c5-0caf-475d-a67f-4e6bda55366c",
        image: "https://picsum.photos/200/300",
        name: "SUPERMAN",
        team: "Justice league member",
      },
      {
        id: "8db666c5-0caf-475d-a67f-4e6bda55366c",
        image: "https://picsum.photos/200/300",
        name: "BatMan",
        team: "Justice league member",
      },
      {
        id: "8db666c5-0caf-475d-a67f-4e6bda55366c",
        image: "https://picsum.photos/200/300",
        name: "Spider-man",
        team: "Justice league member",
      },
      {
        id: "8db666c5-475d-a67f-4e6bda55366c",
        image: "https://picsum.photos/200/300",
        name: "WolfWerine",
        team: "Justice league member",
      },
]
