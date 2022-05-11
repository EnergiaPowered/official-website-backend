import axios from "axios";
import config from "globals/config";

export const getBestMembers = (params) =>
  axios.get(`${config.API_BASE_URL}crew?${params}`);
