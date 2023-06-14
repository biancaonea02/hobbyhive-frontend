import React, { useState, useEffect } from "react";
import InstagramPost from "../components/post";
import { getLoggedInUser } from "../services/user-service";
import { useSelector } from "react-redux";
import { getFeedPosts } from "../services/post-service";
import Button from "@mui/joy/Button";
import CardWithSkeleton from "../components/post-skeleton";
import Cookies from "js-cookie";

const Feed = () => {
  // const userId = useSelector((state) => state.authentication.userId);
  const userId = Cookies.get("userId");
  // eslint-disable-next-line no-unused-vars
  // const [user, setUser] = useState(Object);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      // const loggedInUser = await getLoggedInUser(userId);
      // if (loggedInUser) {
      //   setUser(loggedInUser);
      // }
      const posts = await getFeedPosts(userId);
      const filteredPosts = posts.filter((post) => post.communityId === null);
      setPosts(filteredPosts);
      setIsLoading(false);
    })();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        margin: "0 auto",
        marginTop: "5%",
        width: "40%",
      }}
    >
      {isLoading ? (
        <>
          <CardWithSkeleton data-cy="skeleton" />
          <CardWithSkeleton data-cy="skeleton" />
        </>
      ) : (
        posts?.map((post) => (
          <InstagramPost
            data-cy="post"
            key={post?.id}
            post={post}
            modal={false}
            isCommunity={false}
          />
        ))
      )}
    </div>
  );
};
export default Feed;
