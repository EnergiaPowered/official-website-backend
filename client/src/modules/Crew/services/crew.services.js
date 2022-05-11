import axios from "axios";
import configs from "globals/config";

export const getCrew = (params) =>
  axios.get(`${configs.API_BASE_URL}crew?${params}`);
