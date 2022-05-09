import axios from "axios";
import configs from "globals/config";
import authHeader from "globals/auth-header";

export const getUserdata = () =>
  axios.get(`${configs.HOST}me/`, { headers: authHeader() });

export const getBlog = (id) => axios.get(`${configs.HOST}blogs/${id}`);

export const getBlogComments = (id) =>
  axios.get(`${configs.HOST}blogs/${id}/comments`);

export const postComment = (id, name, email, comment) => {
  return axios.post(
    `${configs.HOST}blogs/${id}/comment`,
    { name: name, email: email, content: comment },
    { headers: authHeader() }
  );
};

export const deleteComment = (blogId, commentId) => {
  return axios.delete(`${configs.HOST}blogs/${blogId}/comment/${commentId}`, {
    headers: authHeader(),
  });
};
