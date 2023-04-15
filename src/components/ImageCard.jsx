import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Checkboxes from "./CheckBox";
import { styled } from "@mui/system";
import {useState,useEffect} from 'react';

export default function ImageCard({ imgKey,imgUrl }) {
  const [imageSrc, setImageSrc] = useState(imgUrl);
  useEffect(() => {
    console.log(imgUrl);
    setImageSrc(imgUrl);
  }, [imgUrl]);

  return (
    <Card  key={imgKey} sx={{ maxWidth: 200, height: "200px", position: "relative" }}>
      <CardHeader
        avatar={<Checkboxes sx={{ paddingLeft: 0 }} />}
        sx={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
          padding: "0px 0px",
        }}
      />
      <CardMedia
        component="img"
        sx={{ height: "100%", objectFit: "cover" }}
        image={imageSrc}
      />
      <CardActions sx={{ position: "absolute", bottom: 0, right: 0 }}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon color="white" />
        </IconButton>
      </CardActions>
    </Card>
  );
}
