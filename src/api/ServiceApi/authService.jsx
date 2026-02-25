import axios from "axios";
import Cookies from "js-cookie";

export const loginUser = async (username, password, captcha) => {

  const formData = new URLSearchParams();

  formData.append("varUserName", username);
  formData.append("varPassword", password);
  formData.append("varCaptcha", captcha); // ⭐ FIXED NAME

  const response = await axios.post(
    "http://localhost:8081/IMCS/auth/login",
    formData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
       withCredentials: true  
    }
  );

  if (response.data.status_code === 200) {
    Cookies.set("token", response.data.data.Authorization);
  }

  return response.data;
};