import { Avatar, Box, Icon } from "@mui/material";
import { FaFacebookF } from "react-icons/fa";

const CommunityPostAvatar = () => {
  return (
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
          background: "#f6f7f8",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <Avatar
          size="sm"
          src="/static/logo.png"
          sx={{
            p: 0.5,
            border: "2px solid",
            backgroundColor: "#fff", // Set the background color of the inner circle
          }}
        />
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: "0.5%",
          right: "0.5%",
          zIndex: 2,
          borderRadius: "50%",
          background: "#4267B2", // Set the background color of the group image circle
          color: "#fff",
          padding: "2px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon component={FaFacebookF} fontSize="small" />{" "}
        {/* Replace with the group image */}
      </Box>
    </Box>
  );
};
export default CommunityPostAvatar;
