import "../auth_style.css";
import "../../../styles/index.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { apiUrl } from "../../../utils/constants";
import AuthService from "../../../services/auth_services";

export const SignUp: React.FC = () => {
  const _authService = new AuthService();
  const navigate = useNavigate()
  const [emailController, setEmailController] = useState("");
  const [firstnameController, setFirstnameController] = useState("");
  const [lastnameController, setLastnameController] = useState("");
  const [passwordController, setPasswordController] = useState("");
  const [errorMessage, setErrorMsg] = useState("");
 
  const signUp = async () => {
    try {
      await axios
        .post(apiUrl + "register", {
          email: emailController,
          firstname: firstnameController,
          lastname: lastnameController,
          password: passwordController,
        })
        .then((response) => {
          _authService.setCookie(response.data.token)
          navigate('/')
        });
    } catch (error: any) {
      setErrorMsg(error.message);
      throw new Error("Error while trying to add user to database");
    }
  };
  return (
    <main className="columnContainer container_signup_form">
      <div className="container_logo_sign">
        <img className="form_logo " src="/logo.png" alt="logo" />
      </div>
      <h2 className="title_form">Register</h2>
      <p className="subtitle_form">
        Join our Subscription League and become a super-contributor by sharing
        your knowledge of the superhero universe.
      </p>
      <div className="columnContainer container_inputs_field">
        <div className="rowContainer container_name">
          <input
            onChange={(e) => setLastnameController(e.target.value)}
            placeholder="Lastname"
            className="sign_input sign_input_name"
            type="text"
          />
          <input
            onChange={(e) => setFirstnameController(e.target.value)}
            placeholder="Firstname"
            className="sign_input sign_input_name"
            type="text"
          />
        </div>
        <input
          onChange={(e) => setEmailController(e.target.value)}
          placeholder="Email"
          className="sign_input"
          type="email"
        />
        <input
          onChange={(e) => setPasswordController(e.target.value)}
          placeholder="Password"
          className="sign_input"
          type="password"
        />
      </div>
      {errorMessage && <p className="text_sign_error">{errorMessage}</p>}
      <button onClick={signUp} className="sign_button">
        Register
      </button>
      <p className="switch_sign_text">
        Already have an account?{" "}
        <Link to={"/signin"} className="link_sign">
          Sign In
        </Link>
      </p>
    </main>
  );
};
