import axios from "axios";
// const API_URL = "http://localhost:8100/api/users/";
// const STATS_API_URL = "http://localhost:8100/api/users-stats";

const API_URL = `${process.env.REACT_APP_API_URL}/api/users/`;
const STATS_API_URL = `${process.env.REACT_APP_API_URL}/api/users-stats`;

export const getLoggedInUser = (userId) => {
  return new Promise((resolve) => {
    axios
      .get(API_URL + userId)
      .then((response) => {
        resolve(response.data);
      })
      .catch(() => {
        resolve(null);
      });
  });
};

export const deleteUser = (userId) => {
  return new Promise((resolve) => {
    axios
      .delete(`${API_URL}delete/${userId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(() => {
        resolve(null);
      });
  });
};

export const updateUser = (userId, username, firstName, lastName) => {
  return new Promise((resolve) => {
    axios
      .post(`${API_URL}update/${userId}`, {
        username: username,
        firstName: firstName,
        lastName: lastName,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch(() => {
        resolve(null);
      });
  });
};

export const userCountPerMonth = () => {
  return new Promise((resolve) => {
    axios
      .get(`${STATS_API_URL}/month-count`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(() => {
        resolve(null);
      });
  });
};
