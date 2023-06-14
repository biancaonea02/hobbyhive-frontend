/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Checkbox, Link, Modal, Box, Typography } from "@mui/material";

const ConsentComponent = ({ openModal, handleCloseModal }) => {
  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          p: 2,
        }}
      >
        <Typography variant="h6" sx={{ color: "#3DBC57" }}>
          Terms and Conditions
        </Typography>
        <Typography sx={{ fontSize: "15px" }}>
          By creating an account on our website, you agree to the following
          terms and conditions:
        </Typography>
        <Typography
          sx={{ fontSize: "14px", marginTop: "10px", fontWeight: "bold" }}
        >
          1. Personal Data Usage:
        </Typography>
        <Typography sx={{ fontSize: "14px" }}>
          We collect and process personal data provided by you during the
          registration process. This includes information such as your name,
          email address, and any other required details. The purpose of
          collecting this data is to create and manage your account, provide
          access to our services, and communicate with you regarding your
          account and our services. We are committed to protecting your privacy
          and ensuring the security of your personal data.
        </Typography>
        <Typography
          sx={{ fontSize: "14px", marginTop: "10px", fontWeight: "bold" }}
        >
          2. Account Responsibility:
        </Typography>
        <Typography sx={{ fontSize: "14px" }}>
          You are responsible for maintaining the confidentiality of your
          account credentials, including your username and password. Any
          activities that occur under your account are your sole responsibility.
          Please ensure that you take appropriate measures to secure your
          account and promptly notify us if you suspect any unauthorized access
          or use of your account.
        </Typography>
        <Typography
          sx={{ fontSize: "14px", marginTop: "10px", fontWeight: "bold" }}
        >
          3. Prohibited Activities:
        </Typography>
        <Typography sx={{ fontSize: "14px" }}>
          You agree not to engage in any illegal, abusive, or unauthorized
          activities while using our services. This includes, but is not limited
          to, the following: Violating any applicable laws or regulations,
          Impersonating any person or entity or falsely representing your
          affiliation with any person or entity, Interfering with or disrupting
          the functionality of our website or services, Uploading or
          transmitting any harmful or malicious content, including viruses or
          malware.
        </Typography>
      </Box>
    </Modal>
  );
};

export default ConsentComponent;
