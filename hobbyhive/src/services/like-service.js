import axios from "axios";

const REACT_APP_API_URL = `http://35.204.232.177/api/likes`;

export const getLikesOfPost = (postId) => {
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

export const checkIfLiked = (postId, userId) => {
  return new Promise((resolve) => {
    axios
      .get(`${REACT_APP_API_URL}/liked`, {
        params: {
          postId: postId,
          userId: userId,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch(() => {
        resolve(null);
      });
  });
};

export const addLike = (postId, userId) => {
  const like = { postId, userId };
  return new Promise((resolve) => {
    axios
      .post(`${REACT_APP_API_URL}/add`, like)
      .then((response) => {
        resolve(response.data);
      })
      .catch(() => {
        resolve(null);
      });
  });
};

export const removeLike = (postId, userId) => {
  return new Promise((resolve) => {
    axios
      .delete(`${REACT_APP_API_URL}/remove?postId=${postId}&userId=${userId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(() => {
        resolve(false);
      });
  });
};
