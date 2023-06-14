/* eslint-disable react/prop-types */
import { Avatar, Box, Button, Typography } from "@mui/material";
import React from "react";

function CommunityMember({ user }) {
  return (
    <Box
      display="flex"
      //   alignItems="center"
      bgcolor="#F0FFF0"
      p={2}
      borderRadius={4}
      mb={2}
      mr={2}
    >
      <Avatar
        // src={profilePicUrl}
        alt={`${user?.firstName} ${user?.lastNme}`}
        sx={{ mr: 2 }}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {`${user?.firstName} ${user?.lastName}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Member since 1st of May 2023
        </Typography>
      </Box>
    </Box>
  );
}

export default CommunityMember;
