import axios from "axios";

import configs from "globals/config";

export const postForgetPassword = (data) =>
  axios.post(`${configs.HOST}forget_password`, data);
