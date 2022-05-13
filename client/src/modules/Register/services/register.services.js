import axios from "axios";
import configs from "globals/config";

export const addUser = (user) =>
  axios.post(`${configs.API_BASE_URL}users`, user);
