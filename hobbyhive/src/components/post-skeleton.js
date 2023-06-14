import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";

function CardWithSkeleton(props) {
  return (
    <Card
      variant="outlined"
      sx={{
        width: "40%",
        borderRadius: "4px",
        marginBottom: "3%",
      }}
    >
      <CardHeader
        avatar={
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
        }
        title={
          <Skeleton
            animation="wave"
            height={10}
            width="80%"
            style={{ marginBottom: 6 }}
          />
        }
        subheader={<Skeleton animation="wave" height={10} width="40%" />}
      />
      <Skeleton variant="rectangular" sx={{ height: 200 }} />
      <Skeleton variant="text" width="80%" sx={{ my: 1 }} />
      <Skeleton variant="text" width="40%" sx={{ mb: 1 }} />
      <Skeleton variant="text" width="50%" sx={{ mb: 1 }} />
      <Skeleton variant="text" width="30%" sx={{ mb: 1 }} />
    </Card>
  );
}
export default CardWithSkeleton;
