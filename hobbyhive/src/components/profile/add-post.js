import { TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { FaPhotoVideo } from "react-icons/fa";
import { styles } from "../../styles/profile";

const AddPost = () => {
  return (
    <Paper style={styles.postBox}>
      <div style={styles.postBoxHeader}>
        <Avatar style={styles.postBoxHeaderAvatar} />
        <TextField
          label="What's on your mind?"
          variant="outlined"
          size="small"
          style={styles.postBoxHeaderTextField}
        />
        <IconButton>
          <FaPhotoVideo />
        </IconButton>
      </div>
      <Divider />
      <div style={styles.postBoxFooter}>
        <Button variant="contained" style={styles.postButton}>
          Post
        </Button>
      </div>
    </Paper>
  );
};
export default AddPost;
