import axios from "axios";
import authHeader from "globals/auth-header";
import configs from "globals/config";

const token = authHeader();

export const getEvents = () => axios.get(`${configs.HOST}events`);

export const getSingleEvent = (id) => axios.get(`${configs.HOST}events/${id}`);

export const getEventChat = (id) => axios.get(`${configs.HOST}events/${id}/chat`, { headers: token });

export const getUser = () => axios.get(`${configs.HOST}me`, { headers: token });