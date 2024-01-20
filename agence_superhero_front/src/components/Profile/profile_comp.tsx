import { UserInfos } from "../../utils/interfaces";
import "../../styles/index.css";
import "./profile_comp.css";
import { useState } from "react";
import axios from "axios";
import { apiKey, apiUrl } from "../../utils/api";
import AuthService from "../../services/auth_services";
import { useNavigate } from "react-router-dom";

export const ProfileComp: React.FC<UserInfos> = ({
  email,
  firstname,
  lastname,
  password,
  linkProfileImage,
}) => {
  const [firstnameCtrl, setFirstnameCtrl] = useState("");
  const [lastnameCtrl, setLastnameCtrl] = useState("");
  const [emailCtrl, setEmailCtrl] = useState("");
  const [passwordCtrl, setPasswordCtrl] = useState("");
  const [ppCtrl, setPpCtrl] = useState("");
  const _authService = new AuthService();
  const navigate = useNavigate();

  const deleteProfile = () => {
    axios
      .delete(apiUrl + "deleteMyAccount", {
        headers: {
          Authorization: "Bearer " + _authService.getCookie(),
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
        },
      })
      .then(() => {
        navigate("/signup");
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const handleSumbitProfile = () => {
    if (firstnameCtrl != "") {
      axios
        .put(
          apiUrl + "updateMyAccountFirstName",
          { firstName: firstnameCtrl },
          {
            headers: {
              Authorization: "Bearer " + _authService.getCookie(),
              "Content-Type": "application/json",
              "X-API-Key": apiKey,
            },
          }
        )
        .catch((err) => {
          console.error(err.message);
        });
    }

    if (lastnameCtrl != "") {
      axios
        .put(
          apiUrl + "updateMyAccountLastName",
          { lastName: lastnameCtrl },
          {
            headers: {
              Authorization: "Bearer " + _authService.getCookie(),
              "Content-Type": "application/json",
              "X-API-Key": apiKey,
            },
          }
        )
        .catch((err) => {
          console.error(err.message);
        });
    }
    if (passwordCtrl != "") {
      axios
        .put(
          apiUrl + "updateMyAccountPassword",
          { password: passwordCtrl },
          {
            headers: {
              Authorization: "Bearer " + _authService.getCookie(),
              "Content-Type": "application/json",
              "X-API-Key": apiKey,
            },
          }
        )
        .catch((err) => {
          console.error(err.message);
        });
    }
    if (emailCtrl != "") {
      axios
        .put(
          apiUrl + "updateMyAccountEmail",
          { email: emailCtrl },
          {
            headers: {
              Authorization: "Bearer " + _authService.getCookie(),
              "Content-Type": "application/json",
              "X-API-Key": apiKey,
            },
          }
        )
        .catch((err) => {
          console.error(err.message);
        });
    }
    if (ppCtrl != "") {
      axios
        .put(
          apiUrl + "updateMyAccountImage",
          { linkProfileImage: ppCtrl },
          {
            headers: {
              Authorization: "Bearer " + _authService.getCookie(),
              "Content-Type": "application/json",
              "X-API-Key": apiKey,
            },
          }
        )
        .catch((err) => {
          console.error(err.message);
        });
    }
    navigate("/");
  };

  const logout = () => {
    navigate("/signin");
    _authService.deleteCookie();
  };

  return (
    <main className="columnContainer container_profile_comp">
      <span className="background_profile"></span>
      <h1>{firstname + " " + lastname}</h1>
      <img
        src={ppCtrl != "" ? ppCtrl : linkProfileImage}
        alt="profile_picture"
      />
      <section className="rowContainer container_cont_edits_prof">
        <article className="columnContainer container_profile_edits">
          <div className="columnContainer container_profile_edit">
            <h5>Firstname</h5>
            <input
              type="text"
              placeholder={firstname}
              onChange={(e) => {
                setFirstnameCtrl(e.target.value);
              }}
            />
          </div>
          <div className="columnContainer container_profile_edit">
            <h5>Lastname</h5>
            <input
              type="text"
              placeholder={lastname}
              onChange={(e) => setLastnameCtrl(e.target.value)}
            />
          </div>
          <div className="columnContainer container_profile_edit">
            <h5>Profile picture</h5>
            <input
              type="text"
              placeholder={linkProfileImage}
              onChange={(e) => setPpCtrl(e.target.value)}
            />
          </div>
        </article>
        <article className="columnContainer container_profile_edits">
          <div className="columnContainer container_profile_edit">
            <h5>Email</h5>
            <input
              type="email"
              placeholder={email}
              onChange={(e) => setEmailCtrl(e.target.value)}
            />
          </div>
          <div className="columnContainer container_profile_edit">
            <h5>Password</h5>
            <input
              type="password"
              placeholder={password}
              onChange={(e) => setPasswordCtrl(e.target.value)}
            />
          </div>
        </article>
      </section>
      <button className="sumbit_profile_bnt" onClick={handleSumbitProfile}>
        Modifier
      </button>
      <button className="delete_profile_bnt" onClick={deleteProfile}>Delete Account</button>
      <button className="delete_profile_bnt" onClick={logout}>Logout</button>
    </main>
  );
};
