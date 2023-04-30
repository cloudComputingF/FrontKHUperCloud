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

      return isImage;
    });
    const urls = validFiles.map((file) => URL.createObjectURL(file));
   
    setImageUrls((prevUrls) => [
      ...urls.map((url, index) => ({
        url,
        fileName: validFiles[index].name,
        fileSize: validFiles[index].size,
      })),
      ...prevUrls,
    ]);
    
  };

  return (
    <Box
      component="main"
      sx={{
        p: 3,
        display: "flex",
        maxWidth: "100%",
      }}
    >
      <Box sx={{ position: "absolute", top: 80, left: 200, width: "85%" }}>
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
          <Upload onCreateImage={handleCreateContents} />
        </Box>
        <Divider sx={{ my: 2 }} />
      </Box>
      <Box
        sx={{
          mt: 19,
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {imageUrls.length > 0 ? (
          imageUrls.map((image, index) => {
            return (
              <ImageCard
                key={index}
                imgUrl={image.url}
                fileName={image.fileName}
                fileSize={image.fileSize}
              />
            );
          })
        ) : (
          <Typography variant="h6" component="h4" sx={{ mt: 25, ml: 80 }}>
            저장된 파일이 없습니다.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
