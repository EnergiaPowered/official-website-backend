import axios from "axios";
import configs from "globals/config";

export const sendMessage = (messageData) => {
  return axios.post(`${configs.API_BASE_URL}message`, messageData);
};

export const getInfo = (messageData) => {
  return axios.get(`${configs.API_BASE_URL}contactInfo`, messageData);
};
