import axios from "axios";
import configs from "globals/config";

const login = ({ email, password }) => {
  return axios
    .post(`${configs.API_BASE_URL}login`, {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", response.data.token);
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  login,
  logout,
};
