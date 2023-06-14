/* eslint-disable no-undef */
import React, { useEffect, useMemo, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { FaEdit, FaCog } from "react-icons/fa";
import { BiExport } from "react-icons/bi";
import AddPost from "./add-post";
import About from "./about";
import { useSelector } from "react-redux";
import { getLoggedInUser } from "../../services/user-service";
import { styles } from "../../styles/profile";
import Modal from "@mui/material/Modal";
import ModalDelete from "./modal-delete";
import SnackbarMessage from "../snackbar";
import Cookies from "js-cookie";
import { exportCsvData, getPostsOfUser } from "../../services/post-service";
import { List, ListItem } from "@mui/material";
import InstagramPost from "../post";
import { getFriendsOfUser } from "../../services/friends-service";
import ModalEdit from "./modal-edit";

const ProfilePage = () => {
  // const userId = useSelector((state) => state.authentication.userId);
  const userId = Cookies.get("userId");

  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState(0);
  const [loading, setLoading] = useState(true);

  const [openModalDelete, setOpenModalDelete] = useState(false);
  const handleOpenDelete = () => setOpenModalDelete(true);
  const handleCloseDelete = async () => {
    setOpenModalDelete(false);
  };

  const [openModalEdit, setOpenModalEdit] = useState(false);
  const handleOpenEdit = () => setOpenModalEdit(true);
  const handleCloseEdit = async () => {
    setOpenModalEdit(false);
  };

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleOpenSnackbar = () => setSnackbarOpen(true);
  const role = Cookies.get("role");

  useMemo(() => {
    getLoggedInUser(userId).then((userData) => {
      setUser(userData || {});
    });

    getPostsOfUser(userId).then((postsData) => {
      setPosts(postsData || {});
    });
    getFriendsOfUser(userId).then((friendsData) => {
      setFriends(friendsData.length || 0);
    });
    setLoading(false);
  }, [userId]);

  const downloadFile = ({ data, fileName, fileType }) => {
    const blob = new Blob([data], { type: fileType });

    const a = document.createElement("a");
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  const handleExportData = async () => {
    const data = await exportCsvData(userId);
    downloadFile({
      data: data,
      fileName: "data.csv",
      fileType: "text/csv",
    });
  };

  return (
    <div style={{ marginTop: "7%" }}>
      {!loading && (
        <>
          <Paper style={styles.root}>
            <Box style={styles.coverImage} />
            <Avatar style={styles.profileImage} alt="Profile Image" />
            <Typography variant="h4" style={styles.name}>
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="subtitle1" style={styles.friends}>
              {friends} Friends
            </Typography>
            <Box textAlign="center" mt={2} ml={3}>
              <Button
                variant="contained"
                style={styles.editButton}
                startIcon={<FaEdit style={styles.icon} />}
                onClick={handleOpenEdit}
              >
                Edit Profile
              </Button>
              <Modal
                open={openModalEdit}
                onClose={handleCloseEdit}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <ModalEdit
                  user={user}
                  setUser={setUser}
                  handleClose={handleCloseEdit}
                  openSnackbar={handleOpenSnackbar}
                  setSnackbarMessage={setSnackbarMessage}
                  setSnackbarSeverity={setSnackbarSeverity}
                  handleOpenSnackbar={handleOpenSnackbar}
                />
              </Modal>
              <Button
                variant="contained"
                style={styles.settingsButton}
                startIcon={<BiExport style={styles.icon} />}
                onClick={handleExportData}
              >
                Export Data
              </Button>
              <Button
                variant="contained"
                style={styles.deleteButton}
                onClick={handleOpenDelete}
                startIcon={<FaCog style={styles.icon} />}
              >
                Delete Account
              </Button>
              <Modal
                open={openModalDelete}
                onClose={handleCloseDelete}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <ModalDelete
                  userId={userId}
                  handleClose={handleCloseDelete}
                  openSnackbar={handleOpenSnackbar}
                  setSnackbarMessage={setSnackbarMessage}
                  setSnackbarSeverity={setSnackbarSeverity}
                  handleOpenSnackbar={handleOpenSnackbar}
                />
              </Modal>
            </Box>
          </Paper>
          <Box sx={{ background: "#C8DBBE", margin: "16px", height: "100%" }}>
            <Grid container spacing={1}>
              {role === "ROLE_USER" ? (
                <>
                  <Grid item xs={12} sm={6}>
                    <About
                      styles={styles}
                      firstName={user.firstName}
                      lastName={user.lastName}
                      username={user.username}
                      createdAt={user.createdAt}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <AddPost />
                  </Grid>
                </>
              ) : (
                <Grid item xs={12} sm={12}>
                  <About
                    styles={styles}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    username={user.username}
                    createdAt={user.createdAt}
                  />
                </Grid>
              )}
            </Grid>
          </Box>
          <List>
            {posts?.map((post) => (
              <React.Fragment key={post.id}>
                <ListItem
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    margin: "16px",
                    width: "80%",
                  }}
                >
                  <InstagramPost
                    key={post.id}
                    post={post}
                    modal={false}
                    isCommunity={false}
                    postId={post.id}
                  />
                </ListItem>
              </React.Fragment>
            ))}
          </List>
          <SnackbarMessage
            message={snackbarMessage}
            severity={snackbarSeverity}
            open={snackbarOpen}
            onClose={handleCloseDelete}
          />
        </>
      )}
    </div>
  );
};
export default ProfilePage;
