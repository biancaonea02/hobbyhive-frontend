import axios from "axios";
// const API_URL = "http://localhost:8087/api/communities";
// const API_URL = "http://34.147.93.212/api/communities";
const REACT_APP_API_URL = `http://35.204.232.177/api/communities`;

export const getCommunitiesJoinedByUser = (userId) => {
  return new Promise((resolve) => {
    axios
      .get(`${REACT_APP_API_URL}/user/${userId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(() => {
        resolve(null);
      });
  });
};

export const geAllCommunities = () => {
  return new Promise((resolve) => {
    axios
      .get(`${REACT_APP_API_URL}/`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(() => {
        resolve(null);
      });
  });
};

export const joinCommunity = (communityId, userId) => {
  return new Promise((resolve) => {
    axios
      .post(`${REACT_APP_API_URL}/add/${communityId}/user/${userId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(() => {
        resolve(null);
      });
  });
};

export const getCommunitiesNotJoinedByUser = (userId) => {
  return new Promise((resolve) => {
    axios
      .get(`${REACT_APP_API_URL}/user/${userId}/not-joined`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(() => {
        resolve(null);
      });
  });
};

export const getCommunityById = (id) => {
  return new Promise((resolve) => {
    axios
      .get(`${REACT_APP_API_URL}/${id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(() => {
        resolve(null);
      });
  });
};

export const getCommunityName = async (id) => {
  const community = await getCommunityById(id);
  return community.name;
};
