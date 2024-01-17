import axios from "axios";
import { apiUrl } from "../utils/constants";

class AuthService {
  setCookie(value: string) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1);
    const cookieString = `jwt=${encodeURIComponent(
      value
    )}; expires=${expirationDate.toUTCString()}; path=/ ; SameSite=None; Secure`;
    document.cookie = cookieString;
  }
  getCookie() {
    const name = "jwt" + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");

    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim();
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }

    return null; // Return null if the cookie is not found
  }

  deleteCookie() {
    const cookieString =
      "jwt=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=None; Secure";
    document.cookie = cookieString;
    axios.post(apiUrl + "logout", {
      headers: {
        Authorization: "Bearer " + this.getCookie(),
        "Content-Type": "application/json",
      },
    });
  }
}
export default AuthService;
