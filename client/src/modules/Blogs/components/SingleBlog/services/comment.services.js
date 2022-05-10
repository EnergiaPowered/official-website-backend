import axios from "axios";
import configs from "globals/config";
import authHeader from "globals/auth-header";

export const getUserData = () =>
  axios.get(`${configs.API_BASE_URL}me/`, { headers: authHeader() });

export const getBlog = (id) => axios.get(`${configs.API_BASE_URL}blogs/${id}`);

export const getBlogComments = (id) =>
  axios.get(`${configs.API_BASE_URL}blogs/${id}/comments`);

export const postComment = (id, comment) => {
  return axios.post(
    `${configs.API_BASE_URL}blogs/${id}/comment`,
    { content: comment },
    { headers: authHeader() }
  );
};

export const deleteComment = (blogId, commentId) => {
  return axios.delete(
    `${configs.API_BASE_URL}blogs/${blogId}/comment/${commentId}`,
    {
      headers: authHeader(),
    }
  );
};
