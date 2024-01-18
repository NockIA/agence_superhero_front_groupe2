import React from "react";
import axios from "axios";
import "./category_comp.css";
import "../../styles/index.css";
import { HeroCardInterface } from "../HeroCard/hero_card";
import AuthService from "../../services/auth_services";
import { apiUrl } from "../../utils/api";

export interface CategoryCompProps {
  request: string;
  title: string;
  isActive: boolean;
  onClick: Function;
  onUpdateHeroes: (newHeroes: Array<HeroCardInterface>) => void;
}

export const CategoryComp: React.FC<CategoryCompProps> = ({
  request,
  title,
  isActive,
  onUpdateHeroes,
}) => {
  const _authService = new AuthService;
  const handleClick = () => {
    axios.get(apiUrl + request , {
      headers : {
        'Authorization': 'Bearer ' + _authService.getCookie(),
        'Content-Type':'application/json'
      }
    }).then((response) => {
      onUpdateHeroes(response.data);
    });
  };

  return (
    <article onClick={handleClick} className="columnContainer container_tag">
      <h1
        className={`title_homepage ${
          isActive ? "is_Active_Tag" : "is_not_Active_Tag"
        }`}
      >
        {title}
      </h1>
      <span className="underline_title"></span>
    </article>
  );
};
