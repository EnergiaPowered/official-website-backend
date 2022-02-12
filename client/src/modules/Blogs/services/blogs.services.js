import axios from "axios";
import configs from "globals/config";

export const getBlogs = () => axios.get(`${configs.HOST}blogs`);