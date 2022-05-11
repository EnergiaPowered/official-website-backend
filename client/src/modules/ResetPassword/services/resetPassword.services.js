import axios from "axios";
import configs from "globals/config";

export const postResetPassword = (id, data) =>
  axios.post(`${configs.API_BASE_URL}reset_password?id=${id}`, data);
