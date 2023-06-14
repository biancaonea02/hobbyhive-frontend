import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Badge } from "@mui/material";
import {
  FaSearch,
  FaHome,
  FaUserFriends,
  FaBell,
  FaStoreAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../services/authentication-service";
import { RiGroup2Fill } from "react-icons/ri";
import { ImStatsBars } from "react-icons/im";
import { TbMessageReport } from "react-icons/tb";
import Cookies from "js-cookie";

const Navbar = () => {
  const styles = {
    appBar: {
      zIndex: 1,
      backgroundColor: "#fff",
      color: "#000",
    },
    leftIcons: {
      display: "flex",
      alignItems: "center",
    },
    rightIcons: {
      display: "flex",
      alignItems: "center",
      marginLeft: "auto",
    },
    iconButton: {
      borderRadius: "50%",
      backgroundColor: "#F0F2F5",
      marginRight: "16px",
    },
    iconButtonCenter: {
      marginRight: "16px",
      borderRadius: 0,
      "&:hover": {
        backgroundColor: "#fff",
      },
    },
    icon: {
      color: "#3DBC57",
    },
    active: {
      color: "#3DBC57",
      borderBottom: "2px solid #3DBC57",
    },
    separator: {
      height: "24px",
      borderRight: "1px solid #ccc",
      marginLeft: "16px",
      marginRight: "16px",
    },
    centerIcons: {
      flexGrow: 1,
      display: "flex",
      justifyContent: "center",
    },
  };

  const [active, setActive] = useState("");
  const role = useSelector((state) => state.authentication.role);

  const handleClick = (value) => {
    setActive(value);
  };

  const dispatch = useDispatch();

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("userId");
    Cookies.remove("role");
    dispatch(logout());
  };

  return (
    <AppBar position="fixed" sx={styles.appBar}>
      <Toolbar>
        <div style={styles.leftIcons}>
          <IconButton sx={styles.iconButton} href="/feed">
            <div
              style={{
                width: "24px",
                height: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p
                style={{
                  margin: 0,
                  color: "#3DBC57",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                H
              </p>
            </div>
          </IconButton>
          <IconButton sx={styles.iconButton}>
            <FaSearch sx={styles.icon} />
          </IconButton>
        </div>
        <div style={styles.centerIcons}>
          {role === "ROLE_USER" ? (
            <IconButton
              href="/feed"
              onClick={() => handleClick("home")}
              sx={
                active === "home"
                  ? { ...styles.iconButtonCenter, ...styles.active }
                  : styles.iconButtonCenter
              }
            >
              <Badge badgeContent={0} color="primary">
                <FaHome sx={styles.icon} />
              </Badge>
            </IconButton>
          ) : (
            <IconButton
              href="/dashboard"
              onClick={() => handleClick("dashboard")}
              sx={
                active === "dashboard"
                  ? { ...styles.iconButtonCenter, ...styles.active }
                  : styles.iconButtonCenter
              }
            >
              <Badge badgeContent={0} color="primary">
                <ImStatsBars sx={styles.icon} />
              </Badge>
            </IconButton>
          )}
          {role === "ROLE_USER" ? (
            <IconButton
              onClick={() => handleClick("friends")}
              href="/friends"
              sx={
                active === "friends"
                  ? { ...styles.iconButtonCenter, ...styles.active }
                  : styles.iconButtonCenter
              }
            >
              <Badge badgeContent={0} color="primary">
                <FaUserFriends sx={styles.icon} />
              </Badge>
            </IconButton>
          ) : (
            <IconButton
              onClick={() => handleClick("reports")}
              href="/reports"
              sx={
                active === "reports"
                  ? { ...styles.iconButtonCenter, ...styles.active }
                  : styles.iconButtonCenter
              }
            >
              <Badge badgeContent={0} color="primary">
                <TbMessageReport sx={styles.icon} />
              </Badge>
            </IconButton>
          )}
          {/* <IconButton
            onClick={() => handleClick("marketplace")}
            sx={
              active === "marketplace"
                ? { ...styles.iconButtonCenter, ...styles.active }
                : styles.iconButtonCenter
            }
          >
            <Badge badgeContent={0} color="primary">
              <FaStoreAlt sx={styles.icon} />
            </Badge>
          </IconButton> */}
          {role === "ROLE_USER" && (
            <IconButton
              href="/communities"
              onClick={() => handleClick("groups")}
              sx={
                active === "groups"
                  ? { ...styles.iconButtonCenter, ...styles.active }
                  : styles.iconButtonCenter
              }
            >
              <Badge badgeContent={0} color="primary">
                <RiGroup2Fill sx={styles.icon} />
              </Badge>
            </IconButton>
          )}
        </div>
        <div style={styles.rightIcons}>
          <IconButton sx={styles.iconButton}>
            <Badge badgeContent={0} color="primary">
              <FaBell sx={styles.icon} />
            </Badge>
          </IconButton>
          <IconButton sx={styles.iconButton} href="/profile">
            <Badge badgeContent={0} color="primary">
              <FaUser sx={styles.icon} />
            </Badge>
          </IconButton>
          <IconButton sx={styles.iconButton} onClick={handleLogout}>
            <Badge badgeContent={0} color="primary">
              <FaSignOutAlt sx={styles.icon} />
            </Badge>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
