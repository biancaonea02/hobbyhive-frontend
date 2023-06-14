import React from "react";
import UsersChart from "./charts/users-chart";
import PostsChart from "./charts/posts-chart";
import LikesCommentsChart from "./charts/likes-comments-chart";
import { Card, CardContent, CardHeader, Grid } from "@mui/material";

function AdminDashboard() {
  return (
    <Grid container spacing={2} sx={{ marginTop: "7%", padding: "5%" }}>
      <Grid item xs={12} md={6} lg={4}>
        <Card>
          <CardHeader title="New Accounts" />
          <CardContent>
            <UsersChart />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Card>
          <CardHeader title="Posts Data" />
          <CardContent>
            <PostsChart />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Card>
          <CardHeader title="Likes & Comments Data" />
          <CardContent>
            <LikesCommentsChart />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default AdminDashboard;
