import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorPage } from "../pages/Error/error";
import SignInPage from "../pages/Auth/signin_page";
import SignUpPage from "../pages/Auth/signup_page";
import HomePage from "../pages/Home/home_page";
import SingleHeroPage from "../pages/SingleHeroPage/single_hero_page";
import AddHeroPage from "../pages/Add/add_hero";

export const Ways = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/signIn" element={<SignInPage/>}/> 
        <Route path="/" element={<HomePage/>}/> 
        <Route path="/single-hero/*" element={<SingleHeroPage/>}/> 
        <Route path="/create-hero" element={<AddHeroPage/>}/> 
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
  );
};
