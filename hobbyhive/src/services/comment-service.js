import axios from "axios";

const REACT_APP_API_URL = "http://35.204.232.177/api/comments";

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
