import { Avatar } from "@mui/material";

const FeedPostAvatar = () => {
  return (
    <Avatar
      size="sm"
      src="/static/logo.png"
      sx={{
        p: 0.5,
        border: "2px solid",
        backgroundColor: "background.body",
      }}
    />
  );
};
export default FeedPostAvatar;
