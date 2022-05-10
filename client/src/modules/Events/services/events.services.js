import axios from "axios";
import authHeader from "globals/auth-header";
import configs from "globals/config";

const token = authHeader();

export const getEvents = () => axios.get(`${configs.API_BASE_URL}events`);

export const getSingleEvent = (id) =>
  axios.get(`${configs.API_BASE_URL}events/${id}`);

export const getEventChat = (id) =>
  axios.get(`${configs.API_BASE_URL}events/${id}/chat`, { headers: token });

export const getUser = () =>
  axios.get(`${configs.API_BASE_URL}me`, { headers: token });
