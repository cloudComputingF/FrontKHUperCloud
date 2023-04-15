import * as React from "react";
import ImageCard from "./ImageCard";
import { useState } from "react";
import Checkboxes from "./CheckBox";
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Drawer,
  Divider,
  Typography,
} from "@mui/material";
import Upload from "./Upload";
export default function ImageList() {
  const [imageUrls, setImageUrls] = useState([]);
  const drawerWidth = 200;
  const handleCreateContents = (files) => {
    const validFiles = Array.from(files).filter((file) => {
      const isImage = file.type && file.type.split("/")[0] === "image";
      const isSmallEnough = file.size <= 5000000; // 5MB 이하로 제한

      return isImage && isSmallEnough;
    });
    const urls = validFiles.map((file) => URL.createObjectURL(file));
    setImageUrls((prevUrls) => [...prevUrls, ...urls]);
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "auto",
      }}
    >
      <Box sx={{ position: "absolute", top: 80, left: 200, width: "100%" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Checkboxes />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Divider orientation="vertical" sx={{ height: "100%" }} />
          </Box>
          <Upload onCreateContents={handleCreateContents} />
        </Box>
        <Divider sx={{ my: 2 }} />
      </Box>
      {imageUrls.length > 0 ? (
        imageUrls.map((url, index) => <ImageCard key={index} imgUrl={url} />)
      ) : (
        <Typography variant="h6" component="h4" sx={{ mt: 30 }}>
          저장된 파일이 없습니다.
        </Typography>
      )}
    </Box>
  );
}
