import axios from "axios";
import configs from "globals/config";

export const getPartners = () => axios.get(`${configs.HOST}sponsors`);