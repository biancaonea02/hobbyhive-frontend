import axios from "axios";
const REACT_APP_API_URL = `${process.env.REACT_APP_API_URL}/api/friendRequests`;

export const getFriendsOfUser = (userId) => {
  return axios
    .get(`${REACT_APP_API_URL}/friends/${userId}`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};

export const getPendingFriendRequests = (receiverId) => {
  return axios
    .get(`${REACT_APP_API_URL}/received/${receiverId}`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};

export const acceptFriendRequest = (id) => {
  return new Promise((resolve) => {
    axios
      .post(`${REACT_APP_API_URL}/accept/${id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(() => {
        resolve(null);
      });
  });
};

export const rejectFriendRequest = (id) => {
  return new Promise((resolve) => {
    axios
      .post(`${REACT_APP_API_URL}/reject/${id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(() => {
        resolve(null);
      });
  });
};
