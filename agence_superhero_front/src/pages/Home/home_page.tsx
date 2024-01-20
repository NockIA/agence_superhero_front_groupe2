import NavigationBar from "../../components/Nav/nav";
import {
  HeroCard,
  HeroCardInterface,
} from "../../components/HeroCard/hero_card";
import "./home_page.css";
import "../../styles/index.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { CategoryComp } from "../../components/CategoryComp/category_comp";
import AuthService from "../../services/auth_services";
import { tags } from "../../utils/tags";
import { apiUrl } from "../../utils/api";

const HomePage = () => {
  const _authService = new AuthService();
  const [searchContent, setSearchContent] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [activeTag, setActiveTag] = useState<string | null>(tags[0].title);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filteredSearchHeroes, setFilteredSearchHeroes] = useState<
    Array<HeroCardInterface>
  >([]);
  const [heroes, setHeroes] = useState<Array<HeroCardInterface>>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchContent(event.target.value);

    if (searchTerm === "") {
      setFilteredSearchHeroes([]);
    } else {
      const filteredHeroes = heroes.filter((hero) =>
        hero.name.toLowerCase().startsWith(searchTerm)
      );
      setFilteredSearchHeroes(filteredHeroes);
    }
  };

  const handleTagClick = ({
    data,
    title,
  }: {
    data: Array<HeroCardInterface>;
    title: string;
  }) => {
    setHeroes(data);
    setActiveTag(title);
  };

  useEffect(() => {
    console.log(_authService.getCookie());
    axios
      .get(apiUrl + "allHeros", {
        headers: {
          Authorization: "Bearer " + _authService.getCookie(),
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setHeroes(response.data);
      })
      .catch((err) => {
        setErrorMsg(err.message);
      });
  }, []);

  const sortHeroes = () => {
    const sortedHeroes = [...heroes].sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (sortOrder === 'asc') {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });

    setHeroes(sortedHeroes);
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
  };

  useEffect(() => {
    sortHeroes();
  }, [sortOrder]);

  return (
    <>
      <NavigationBar />
      <main className="columnContainer container_homepage">
        <div className="container_search_bar rowContainer">
          <span className="material-symbols-outlined">search</span>
          <input
            className="search_bar"
            placeholder="Enter your hero name..."
            type="search"
            name="search"
            value={searchContent}
            onChange={handleSearch}
          />
          <button className="sort_btn" onClick={toggleSortOrder}>
            {sortOrder === "asc" ? "Sort Desc" : "Sort Asc"}
          </button>
        </div>
        <section className="columnContainer">
          <article className="rowContainer container_tags alignCenter">
            {tags.length > 0 &&
              tags.map((tag, index: number) => (
                <CategoryComp
                  key={index}
                  title={tag.title}
                  request={tag.request}
                  isActive={tag.title === activeTag}
                  onUpdateHeroes={handleTagClick}
                />
              ))}
          </article>

          <article className="rowContainer container_heros alignCenter">
            {searchContent === "" ? (
              heroes.map((hero, index: number) => (
                <HeroCard
                  key={index}
                  isHero={activeTag == "All characters"}
                  id={hero.id || hero.UUID}
                  linkImage={hero.linkImage}
                  name={hero.name}
                  team={hero.team}
                  UUID={hero.UUID}
                  description={hero.description}
                />
              ))
            ) : filteredSearchHeroes.length > 0 ? (
              filteredSearchHeroes.map((hero, index: number) => (
                <HeroCard
                  isHero={activeTag == "All characters"}
                  key={index}
                  id={hero.id || hero.UUID}
                  linkImage={hero.linkImage}
                  name={hero.name}
                  team={hero.team}
                  UUID={hero.UUID}
                  description={hero.description}
                />
              ))
            ) : (
              <p className="error_message">
                {errorMsg || "Pas de superhéro trouvé"}
              </p>
            )}
          </article>
        </section>
      </main>
    </>
  );
};

export default HomePage;
