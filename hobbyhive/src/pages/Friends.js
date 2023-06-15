import React, { useEffect, useState } from "react";
import FriendRequest from "../components/friend-request";
import { useSelector } from "react-redux";
import {
  getFriendsOfUser,
  getPendingFriendRequests,
} from "../services/friends-service";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { List, Paper } from "@mui/material";
import Friend from "../components/friend";
import Cookies from "js-cookie";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
function Friends() {
  // const userId = useSelector((state) => state.authentication.userId);
  const userId = Cookies.get("userId");
  const [friendRequests, setFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    void (async () => {
      const [allFriendRequests, friends] = await Promise.all([
        getPendingFriendRequests(userId),
        getFriendsOfUser(userId),
      ]);

      const uniqueFriends = friends.filter((friend, index, self) => {
        return index === self.indexOf(friend);
      });
      // setFriendRequests(allFriendRequests);
      setFriendRequests(["648866011f4eb953c11aae9c"]);
      // setFriends(uniqueFriends);
      setFriends([
        "64884aebeb162b712d52d1eb",
        "64884b06eb162b712d52d1ec",
        "64884b76eb162b712d52d1ed",
        "64884b89eb162b712d52d1ee",
      ]);
      setLoading(false);
    })();
  }, [userId]);

  return (
    <Paper
      elevation={5}
      sx={{
        width: "80%",
        marginTop: "7%",
        marginLeft: "5%",
        marginBottom: "5%",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="Friends"
            {...a11yProps(0)}
            sx={{
              textTransform: "none",
              fontSize: "20px",
              color: "#5D9C59",
              "&.Mui-selected": {
                color: "#3DBC57",
              },
            }}
          />
          <Tab
            label="Friend Requests"
            {...a11yProps(1)}
            sx={{
              textTransform: "none",
              fontSize: "20px",
              color: "#5D9C59",
              "&.Mui-selected": {
                color: "#3DBC57",
              },
            }}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <List>
          {loading ? (
            <p>Loading...</p>
          ) : friends.length === 0 ? (
            <p>You do not have any friends yet</p>
          ) : (
            friends.map((friend) => <Friend key={friend.id} friend={friend} />)
          )}
        </List>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {loading ? (
          <p>Loading...</p>
        ) : friendRequests.length === 0 ? (
          <p>There are no friend requests</p>
        ) : (
          friendRequests.map((friendRequest) => (
            <FriendRequest
              key={friendRequest.id}
              id={friendRequest.id}
              // senderId={friendRequest?.senderId}
              senderId={friendRequest}
              setFriendRequests={setFriendRequests}
            />
          ))
        )}
      </TabPanel>
    </Paper>
  );
}
export default Friends;
