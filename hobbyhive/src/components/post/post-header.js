/* eslint-disable react/prop-types */
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import Box from "@mui/joy/Box";
import { formatDate } from "../../utils/utils";
import FeedPostAvatar from "../avatars/feed-post-avatar";
import CommunityPostAvatar from "../avatars/community-post-avatar";
import { useEffect, useState } from "react";
import { getCommunityOfPost } from "../../services/post-service";
import { getCommunityName } from "../../services/community-service";

const PostHeader = ({ username, createdAt, isCommunity, postId }) => {
  const [communityName, setCommunityName] = useState("");

  useEffect(() => {
    void (async () => {
      if (postId) {
        const community = await getCommunityOfPost(postId);
        const name = await getCommunityName(community);
        setCommunityName(name);
      }
    })();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        pb: 1.5,
        gap: 1,
        width: "30%",
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            m: "-2px",
            borderRadius: "50%",
            background:
              "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
          },
        }}
      >
        {isCommunity ? <CommunityPostAvatar /> : <FeedPostAvatar />}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {isCommunity ? (
          <>
            <Typography whiteSpace="nowrap" fontWeight="lg">
              {communityName}
            </Typography>
            <Box
              sx={{
                display: "inline-flex",
                gap: "0.5rem",
                alignItems: "center",
              }}
            >
              <Link
                component="button"
                underline="none"
                fontSize="10px"
                sx={{ color: "text.tertiary", my: 0.5 }}
              >
                {username}
              </Link>
              <Link
                component="button"
                underline="none"
                fontSize="10px"
                whiteSpace="nowrap"
                sx={{ color: "text.tertiary", my: 0.5 }}
              >
                {formatDate(createdAt)}
              </Link>
            </Box>
          </>
        ) : (
          <>
            <Typography fontWeight="lg">{username}</Typography>
            <Link
              component="button"
              underline="none"
              fontSize="10px"
              sx={{ color: "text.tertiary", my: 0.5 }}
            >
              {formatDate(createdAt)}
            </Link>
          </>
        )}
      </Box>
    </Box>
  );
};
export default PostHeader;
