import axios from "axios";
// const API_URL = "http://localhost:8200/api/comments";
// const API_URL = "http://34.147.93.212/api/comments";
const REACT_APP_API_URL = `${process.env.REACT_APP_API_URL}/api/comments`;

export const getCommentsOfPost = (postId) => {
  return new Promise((resolve) => {
    axios
      .get(`${REACT_APP_API_URL}/post/${postId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(() => {
        resolve(null);
      });
  });
};

export const addComment = (postId, userId, content) => {
  const comment = { postId, userId, content };
  return new Promise((resolve) => {
    axios
      .post(`${REACT_APP_API_URL}/add`, comment)
      .then((response) => {
        resolve(response.data);
      })
      .catch(() => {
        resolve(null);
      });
  });
};
