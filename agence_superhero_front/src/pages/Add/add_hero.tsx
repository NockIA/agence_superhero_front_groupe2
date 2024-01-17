import { useState } from "react";
import NavigationBar from "../../components/Nav/nav";
import { SliderAdd } from "../../components/SliderAdd/slider_add";
import { PlanetTest } from "../../utils/constants";

const AddHeroPage = () => {
  const [planetInfos ,setPlanetInfos] = useState(); //name + desc -> id 
  const [vehicleInfos ,setVehicleInfos] = useState(); // name + desc -> id
  const [powerInfos ,setPowerInfos] = useState();
  const [gadgetInfos ,setGadgetInfos] = useState();
  const [teamInfos ,setTeamInfo] = useState(); //name -> id
  const [cityInfos ,setCityInfos] = useState(); //name -> id
  const [heroInfos,setHeroInfos] = useState() // avec id Planet/vehicle/powers/gadgets/team/city
  return (
    <>
      <NavigationBar />
      <SliderAdd slides={PlanetTest} />
      <SliderAdd slides={PlanetTest} />
      <SliderAdd slides={PlanetTest} />
      <SliderAdd slides={PlanetTest} />
      //hero form
    </>
  );
};

export default AddHeroPage;
