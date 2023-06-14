/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from "react";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Modal from "@mui/material/Modal";
import { Button, Paper } from "@mui/material";
import { AiOutlineLike } from "react-icons/ai";
import { FaComment, FaHeart, FaShare, FaRegHeart } from "react-icons/fa";
import { getLikesOfPost, addLike, removeLike } from "../services/like-service";
import { useSelector } from "react-redux";
import Comment from "./comment-input";
import PostModal from "./post-modal";
import CommentsSection from "./comments-section";
import CardWithSkeleton from "./post-skeleton";
import { getPostData } from "../services/post-service";
import PostHeader from "./post/post-header";
import Cookies from "js-cookie";

const openModalHandler = (modal, setOpenModal) => {
  if (!modal) {
    setOpenModal(true);
  } else {
    setOpenModal(false);
  }
};

const showCommentBoxHandler = (showCommentBox, setShowCommentBox) => {
  setShowCommentBox(!showCommentBox);
};

export default function InstagramPost({ post, modal, isCommunity, style }) {
  // const userId = useSelector((state) => state.authentication.userId);
  const userId = Cookies.get("userId");
  const [username, setUsername] = useState("");
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [loading, setLoading] = useState(true);

  // const userInfo = useMemo(() => {
  //   return getLoggedInUser(post.userId);
  // }, [post.userId]);

  // const postLikes = useMemo(() => {
  //   return getLikesOfPost(post.id);
  // }, [post.id]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const [user, postLikes, isLiked] = await Promise.all([
  //         getLoggedInUser(post.userId),
  //         getLikesOfPost(post.id),
  //         checkIfLiked(post.id, userId),
  //       ]);
  //       if (user) {
  //         setUsername(user.username);
  //       }
  //       setLikes(postLikes);
  //       setLiked(isLiked);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchData();
  // }, [post.id, post.userId, userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { user, likes, liked } = await getPostData(
          post.id,
          post.userId,
          userId
        );
        setUsername(user.username);
        setLikes(likes);
        setLiked(liked);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [post.id, userId]);

  const getLikesHandler = async () => {
    const likes = await getLikesOfPost(post.id);
    setLikes(likes);
  };

  const addLikeHandler = () => {
    addLike(post.id, userId)
      .then(async () => {
        setLiked(true);
        getLikesHandler();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const removeLikeHandler = () => {
    removeLike(post.id, userId)
      .then(() => {
        setLiked(false);
        getLikesHandler();
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <>
      {!loading ? (
        <Card
          variant="outlined"
          sx={{
            width: "100%",
            "--Card-radius": (theme) => theme.vars.radius.xs,
            marginBottom: "3%",
          }}
        >
          <Paper
            onClick={() => openModalHandler(modal, setOpenModal)}
            elevation={0}
            sx={{ cursor: "pointer" }}
          >
            <PostHeader
              username={username}
              createdAt={post.createdAt}
              isCommunity={isCommunity}
              postId={post.id}
            />
            <Typography sx={{ textAlign: "left" }}>{post.content}</Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mx: -1,
                my: 1,
              }}
            >
              <Box sx={{ width: 0, display: "flex" }}>
                <IconButton
                  variant="plain"
                  color="#000"
                  sx={{ color: "black", pointerEvents: "none", cursor: "none" }}
                >
                  <AiOutlineLike />
                </IconButton>
                {likes?.length !== 0 ? <p>{likes?.length}</p> : <p>0</p>}
              </Box>
            </Box>
          </Paper>
          <Box
            sx={{
              height: ".5px",
              width: "100%",
              backgroundColor: "#ededed",
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              textTransform: "none",
              marginTop: "1%",
            }}
          >
            <Button
              startIcon={
                liked ? (
                  <FaHeart
                    style={{ color: "#3DBC57", cursor: "pointer" }}
                    onClick={() => removeLikeHandler()}
                  />
                ) : (
                  <FaRegHeart
                    style={{ color: "#3DBC57", cursor: "pointer" }}
                    onClick={() => addLikeHandler()}
                  />
                )
              }
              sx={{
                width: "33%",
                justifyContent: "left",
                textTransform: "none",
                color: "#000",
                ":hover": { backgroundColor: "#fff" },
              }}
            >
              {liked ? "Liked" : "Like"}
            </Button>
            <Button
              disableRipple
              onClick={() =>
                showCommentBoxHandler(showCommentBox, setShowCommentBox)
              }
              startIcon={<FaComment style={{ color: "#3DBC57" }} />}
              sx={{
                width: "33%",
                justifyContent: "center",
                textTransform: "none",
                color: "#000",
                backgroundColor: "#fff",
                "&:hover": {
                  backgroundColor: "transparent",
                  boxShadow: "none",
                },
              }}
            >
              Comment
            </Button>

            <Button
              disableRipple
              startIcon={<FaShare style={{ color: "#3DBC57" }} />}
              sx={{
                width: "33%",
                justifyContent: "right",
                textTransform: "none",
                color: "#000",
                ":hover": { backgroundColor: "#fff" },
              }}
            >
              Share
            </Button>
          </Box>
          {modal === false ? (
            showCommentBox && <Comment postId={post.id} userId={userId} />
          ) : (
            <CommentsSection postId={post.id} userId={userId} />
          )}
          <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <PostModal
              post={post}
              userId={userId}
              handleClose={() => setOpenModal(false)}
            />
          </Modal>
        </Card>
      ) : (
        <CardWithSkeleton />
      )}
    </>
  );
}
