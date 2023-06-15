import axios from "axios";
import { getFriendsOfUser } from "./friends-service";
import { checkIfLiked, getLikesOfPost } from "./like-service";
import { getLoggedInUser } from "./user-service";

// const API_URL = "http://localhost:8200/api/posts";
// const STATS_API_URL = "http://localhost:8200/api/stats";
// const EXPORT_API_URL = "http://localhost:8200/api/export";

const API_URL = `http://35.204.232.177/api/posts`;
const STATS_API_URL = `http://35.204.232.177/api/stats`;
const EXPORT_API_URL = `http://35.204.232.177/api/export`;

//this method is for getting the posts of the logged in user's friends
export const getFeedPosts = async (userId) => {
  const friendsOfUser = await getFriendsOfUser(userId);
  console.log("friends of user", friendsOfUser);
  const friendsOfUser2 = [
    "64884aebeb162b712d52d1eb",
    "64884b06eb162b712d52d1ec",
    "64884b76eb162b712d52d1ed",
    "64884b89eb162b712d52d1ee",
  ];

  const postPromises = friendsOfUser2.map((friendId) => {
    return axios.get(`${API_URL}/user/${friendId}`);
  });
  return Promise.all(postPromises)
    .then((responses) => {
      const posts = responses.flatMap((response) => response.data);
      return posts;
    })
    .catch(() => {
      return null;
    });
};

export const getPostData = async (postId, userId, loggedInUser) => {
  const [user, likes, liked] = await Promise.all([
    await getLoggedInUser(userId),
    await getLikesOfPost(postId),
    await checkIfLiked(postId, loggedInUser),
  ]);

  return { user, likes, liked };
};

export const getPostsOfCommunity = (communityId) => {
  return new Promise((resolve) => {
    axios
      .get(`${API_URL}/community/${communityId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(() => {
        resolve(null);
      });
  });
};

export const getCommunityOfPost = (postId) => {
  return new Promise((resolve) => {
    axios
      .get(`${API_URL}/post/${postId}/community`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(() => {
        resolve(null);
      });
  });
};

export const getPostsOfUser = (userId) => {
  return new Promise((resolve) => {
    axios
      .get(`${API_URL}/user/${userId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(() => {
        resolve(null);
      });
  });
};

export const exportCsvData = (userId) => {
  return new Promise((resolve) => {
    axios
      .get(`${EXPORT_API_URL}/user/${userId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(() => {
        resolve(null);
      });
  });
};

export const postsCountPerMonth = () => {
  return new Promise((resolve) => {
    axios
      .get(`${STATS_API_URL}/posts-month-count`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(() => {
        resolve(null);
      });
  });
};

export const getLikesCommentsCount = () => {
  return new Promise((resolve) => {
    axios
      .get(`${STATS_API_URL}/likes-comments-count`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(() => {
        resolve(null);
      });
  });
};
