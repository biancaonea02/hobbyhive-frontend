import {
  Container,
  Typography,
  Box,
  Avatar,
  Paper,
  Button,
  ListItem,
  List,
  Stack,
  Divider,
} from "@mui/material";
import { styles } from "../styles/profile";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCommunityById } from "../services/community-service";
import { getPostsOfCommunity } from "../services/post-service";
import InstagramPost from "./post";
import CommunityMember from "./communities/community-member";
import { getLoggedInUser } from "../services/user-service";
import { MdInfo, MdPeople, MdSchedule } from "react-icons/md";
import { formatDate } from "../utils/utils";

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

const CommunityPage = () => {
  const { id } = useParams();
  const [value, setValue] = useState(0);
  const [community, setCommunity] = useState(Object);
  const [posts, setPosts] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    void (async () => {
      const community = await getCommunityById(id);
      setCommunity(community);

      const posts = await getPostsOfCommunity(id);
      setPosts(posts);

      const membersPromises = community?.users?.map(async (user) => {
        const members = await getLoggedInUser(user);
        return members;
      });

      const membersData = await Promise.all(membersPromises);
      const flattenedMembers = membersData.flat();
      setMembers(flattenedMembers);

      console.log("bii", flattenedMembers);
    })();
  }, [id]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container sx={{ marginTop: "7%", marginBottom: "40px" }}>
      <Paper style={styles.root}>
        <Box style={styles.coverImage} />
        <Typography variant="h4" sx={{ marginTop: "2%", marginLeft: "10%" }}>
          {community?.name}
        </Typography>
        <Typography variant="subtitle1" sx={{ marginLeft: "10%" }}>
          {community?.users?.length} Members
        </Typography>
        <Box display="flex" sx={{ marginTop: "2%", marginLeft: "10%" }}>
          <Avatar
            src="/avatar1.jpg"
            sx={{ width: 32, height: 32, marginRight: "5px" }}
          />
          <Avatar
            src="/avatar1.jpg"
            sx={{ width: 32, height: 32, marginRight: "5px" }}
          />
          <Avatar
            src="/avatar1.jpg"
            sx={{ width: 32, height: 32, marginRight: "5px" }}
          />
          <Avatar
            src="/avatar1.jpg"
            sx={{ width: 32, height: 32, marginRight: "5px" }}
          />
          <Avatar
            src="/avatar1.jpg"
            sx={{ width: 32, height: 32, marginRight: "5px" }}
          />
        </Box>
      </Paper>
      <Paper style={styles.root}>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                label="Posts"
                {...a11yProps(0)}
                sx={{ textTransform: "none", fontSize: "17px" }}
              />
              <Tab
                label="Members"
                {...a11yProps(1)}
                sx={{ textTransform: "none", fontSize: "17px" }}
              />
              <Tab
                label="Details"
                {...a11yProps(2)}
                sx={{ textTransform: "none", fontSize: "17px" }}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <List>
              {posts.map((post) => (
                <React.Fragment key={post.id}>
                  <ListItem
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                  >
                    <InstagramPost
                      key={post.id}
                      post={post}
                      modal={false}
                      isCommunity={true}
                      postId={post.id}
                    />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {members?.map((user) => (
                <CommunityMember key={user.id} user={user} />
              ))}
            </Box>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Typography sx={{ fontSize: "20px", paddingBottom: "5px" }}>
              About
            </Typography>
            <Divider />
            <Typography
              variant="body1"
              sx={{ color: "#333333", marginRight: "16px", paddingTop: "7px" }}
            >
              {community?.description}
            </Typography>
            <Box
              sx={{ display: "flex", alignItems: "center", marginTop: "5%" }}
            >
              <MdSchedule style={{ marginRight: "4px" }} />
              <Typography variant="body1" sx={{ color: "#666666" }}>
                {/* Created At: {formatDate(community?.createdAt)} */}
                Created At: {community?.createdAt}
              </Typography>
            </Box>
            {/* </Box> */}
          </TabPanel>
        </Box>
      </Paper>
    </Container>
  );
};

export default CommunityPage;
