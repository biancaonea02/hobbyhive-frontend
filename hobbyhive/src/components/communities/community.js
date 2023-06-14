/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  ListItem,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { joinCommunity } from "../../services/community-service";
import { useState } from "react";
import SnackbarMessage from "../snackbar";

const Community = ({ community, joined, userId }) => {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const joinGroup = () => {
    joinCommunity(community?.id, userId)
      .then(() => {
        setSnackbarSeverity("success");
        setSnackbarMessage("Community joined successfully!");
        setSnackbarOpen(true);
      })
      .catch(() => {
        setSnackbarSeverity("error");
        setSnackbarMessage("Something went wrong. Please try again.");
        setSnackbarOpen(true);
      });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <Card sx={{ width: "70vw" }} elevation={5}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="120"
            image="/static/images/cards/contemplative-reptile.jpg"
            sx={{ backgroundColor: "#C9DBB2" }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {community?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Joined on 2nd of May 2023
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {joined ? (
            <Button
              size="medium"
              color="primary"
              onClick={() => navigate(`/community/${community?.id}`)}
              sx={{
                textTransform: "none",
                color: "green",
                fontSize: "17px",
                cursor: "pointer",
              }}
            >
              See more
            </Button>
          ) : (
            <Button
              size="medium"
              color="primary"
              variant="contained"
              onClick={() => joinGroup()}
              sx={{
                textTransform: "none",
                backgroundColor: "#9DC08B",
                fontSize: "17px",
                cursor: "pointer",
                marginBottom: "10px",
              }}
            >
              Join Group
            </Button>
          )}
        </CardActions>
      </Card>
      <SnackbarMessage
        message={snackbarMessage}
        severity={snackbarSeverity}
        open={snackbarOpen}
        onClose={handleSnackbarClose}
      />
    </>
  );
};
export default Community;
