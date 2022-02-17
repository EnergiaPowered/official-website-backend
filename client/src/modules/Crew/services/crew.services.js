import axios from "axios";
import configs from "globals/config";

export const getCrew = (params) => axios.get(`${configs.HOST}crew?${params}`);