import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorPage } from "../pages/Error/error";
import SignInPage from "../pages/Auth/signin_page";
import SignUpPage from "../pages/Auth/signup_page";
import HomePage from "../pages/Home/home_page";

export const Ways = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/signIn" element={<SignInPage/>}/> 
        <Route path="/" element={<HomePage/>}/> 
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
  );
};
