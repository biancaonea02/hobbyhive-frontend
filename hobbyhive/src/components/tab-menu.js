import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import {
  getCommunitiesJoinedByUser,
  getCommunitiesNotJoinedByUser,
} from "../services/community-service";
import Community from "./communities/community";
import { Divider, Grid, List, Stack } from "@mui/material";
import { getPostsOfCommunity } from "../services/post-service";
import InstagramPost from "./post";
import Cookies from "js-cookie";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{
        margin: "0 auto",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {value === index && (
        <Box>
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function TabMenu() {
  const [value, setValue] = useState(0);
  const [userCommunities, setUserCommunities] = useState([]);
  const [notJoined, setNotJoined] = useState([]);
  const [posts, setPosts] = useState([]);
  // const userId = useSelector((state) => state.authentication.userId);
  const userId = Cookies.get("userId");

  useEffect(() => {
    void (async () => {
      const communities = await getCommunitiesJoinedByUser(userId);
      setUserCommunities(communities);

      const notJoined = await getCommunitiesNotJoinedByUser(userId);
      setNotJoined(notJoined);

      const postsPromises = communities.map(async (community) => {
        const posts = await getPostsOfCommunity(community?.id);
        return posts;
      });

      const postsData = await Promise.all(postsPromises);
      const flattenedPosts = postsData.flat();
      setPosts(flattenedPosts);
    })();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        display: "flex",
        height: "100vh",
        marginTop: "3.5%",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab
          label="Communities you joined"
          {...a11yProps(0)}
          sx={{ textTransform: "none", color: "#539165", fontSize: "17px" }}
        />
        <Tab
          label="Browse communities"
          {...a11yProps(1)}
          sx={{ textTransform: "none", color: "#539165", fontSize: "17px" }}
        />
        <Tab
          label="Recent posts"
          {...a11yProps(2)}
          sx={{ textTransform: "none", color: "#539165", fontSize: "17px" }}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Stack spacing={6} sx={{ marginTop: "50px", marginBottom: "50px" }}>
          {userCommunities?.map((comm) => (
            <Community community={comm} key={comm.id} joined={true} />
          ))}
        </Stack>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Stack spacing={6} sx={{ marginTop: "50px", marginBottom: "50px" }}>
          {notJoined?.map((comm) => (
            <Community
              community={comm}
              key={comm.id}
              joined={false}
              userId={userId}
            />
          ))}
        </Stack>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Box sx={{ marginTop: "50px" }}>
          {posts?.map((post) => (
            <InstagramPost
              key={post.id}
              post={post}
              modal={false}
              isCommunity={true}
              postId={post.id}
            />
          ))}
        </Box>
      </TabPanel>
    </Box>
  );
}

export default TabMenu;
