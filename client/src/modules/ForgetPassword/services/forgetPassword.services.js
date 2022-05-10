import axios from "axios";

import configs from "globals/config";

export const postForgetPassword = (data) =>
  axios.post(`${configs.API_BASE_URL}forget_password`, data);
