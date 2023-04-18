import * as React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Checkboxes from "./CheckBox";
import { styled } from "@mui/system";
import { useState, useEffect } from "react";

export default function ImageCard({ imgKey, imgUrl, fileName, fileSize }) {
  const [imageSrc, setImageSrc] = useState(imgUrl);
  useEffect(() => {
    console.log(imgUrl);
    setImageSrc(imgUrl);
  }, [imgUrl]);

  return (
    <Card
      key={imgKey}
      sx={{
        maxWidth: 200,
        height: "150px",
        position: "relative",
        m: 1,   
         }}
    >
      <CardHeader
        avatar={<Checkboxes sx={{ paddingLeft: 0 }} />}
        sx={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
          padding: "0px 0px",
        }}
      />
      <CardContent
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          bgcolor: "rgba(0, 0, 0, 0.6)",
          padding: "4px",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "15px" }}>
          {fileName}
        </Typography>
        <Typography sx={{ color: "white", fontSize: "10px" }}>{`${(
          fileSize / 1024
        ).toFixed(2)}KB`}</Typography>
      </CardContent>
      <CardMedia
        component="img"
        sx={{
          maxWidth: "auto",
          height: "auto",
          objectFit: "cover",
        }}
        image={imageSrc}
      ></CardMedia>
      <CardActions sx={{ position: "absolute",display: "flex", bottom: -10, right: -10}}>
        <IconButton aria-label="add to favorites" >
          <FavoriteIcon color="white" />
        </IconButton>
      </CardActions>
    </Card>
  );
}
