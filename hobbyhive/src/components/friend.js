/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from "react";
import { Avatar, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { getLoggedInUser } from "../services/user-service";

const Friend = ({ friend }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useMemo(() => {
    getLoggedInUser(friend).then((userData) => {
      setUser(userData || {});
      setLoading(false);
    });
  }, [friend]);

  return (
    <ListItem disablePadding>
      <ListItemButton>
        <Avatar alt={`${user.firstName} ${user.lastName}`} sx={{ mr: 2 }} />
        {!loading && (
          <ListItemText
            primary={`${user.firstName} ${user.lastName}`}
            color="#000"
          />
        )}
      </ListItemButton>
    </ListItem>
  );
};

export default Friend;
