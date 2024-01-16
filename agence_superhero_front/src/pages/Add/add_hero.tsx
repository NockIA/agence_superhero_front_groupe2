import NavigationBar from "../../components/Nav/nav";
import { SliderAdd } from "../../components/SliderAdd/slider_add";
import { PlanetTest } from "../../utils/constants";

const AddHeroPage = () => {
  return (
    <>
      <NavigationBar />
      <SliderAdd slides={PlanetTest} />
    </>
  );
};

export default AddHeroPage;
