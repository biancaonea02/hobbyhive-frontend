/* eslint-disable react/prop-types */
import { Box, Paper, Typography } from "@mui/material";
import { FaCalendarAlt, FaUserAlt, FaUserTag } from "react-icons/fa";
import { styles } from "../../styles/profile";

const About = ({ firstName, lastName, username }) => {
  return (
    <Paper style={styles.about}>
      <Box style={styles.label}>
        <FaUserAlt style={styles.iconAbout} />
        <Typography variant="body1" component="span">
          {firstName} {lastName}
        </Typography>
      </Box>
      <Box style={styles.label}>
        <FaUserTag style={styles.iconAbout} />
        <Typography variant="body1" component="span">
          {username}
        </Typography>
      </Box>
      <Box style={styles.label}>
        <FaCalendarAlt style={styles.iconAbout} />
        <Typography variant="body1" component="span">
          Joined on May 2, 2023
        </Typography>
      </Box>
    </Paper>
  );
};
export default About;
