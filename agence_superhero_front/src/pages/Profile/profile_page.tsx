import { useEffect, useState } from "react";
import NavigationBar from "../../components/Nav/nav";
import { ProfileComp } from "../../components/Profile/profile_comp";
import { UserInfos } from "../../utils/interfaces";
import axios from "axios";
import { apiKey, apiUrl } from "../../utils/api";
import AuthService from "../../services/auth_services";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const _authService = new AuthService();
  const navigate = useNavigate();
  const [userInfos, setUserInfos] = useState<UserInfos | undefined>();
  useEffect(() => {
    axios
      .get(apiUrl + "getMyInfo", {
        headers: {
          Authorization: "Bearer " + _authService.getCookie(),
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
        },
      })
      .then((response) => {
        setUserInfos(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  useEffect(() => {
    if (_authService.getCookie() == null) {
      navigate("/signup");
    }
  });

  return (
    <>
      <NavigationBar />
      {userInfos && (
        <ProfileComp
          email={userInfos?.email ?? ""}
          firstname={userInfos?.firstname ?? ""}
          lastname={userInfos?.lastname ?? ""}
          password={userInfos?.password ?? ""}
          linkProfileImage={userInfos?.linkProfileImage ?? ""}
          id={userInfos?.id ?? -1}
          isAdmin={userInfos?.isAdmin ?? false}
        />
      )}
    </>
  );
};

export default ProfilePage;
