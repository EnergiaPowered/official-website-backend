import axios from "axios";
import configs from "globals/config";

export const postResetPassword = (id, data) => axios.post(`${configs.HOST}reset_password?id=${id}`, data);