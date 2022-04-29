import axios from "axios";
import configs from "globals/config";

export const sendMessage = (messageData) => {
    return axios.post(`${configs.HOST}message`, messageData);
}

export const getInfo = (messageData) => {
    return axios.get(`${configs.HOST}contactInfo`, messageData);
}
