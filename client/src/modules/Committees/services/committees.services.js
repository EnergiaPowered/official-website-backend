import axios from "axios";
import configs from "globals/config";

export const getCommittees = () => axios.get(`${configs.HOST}committees`);