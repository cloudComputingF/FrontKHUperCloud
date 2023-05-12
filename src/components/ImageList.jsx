import * as React from "react";
import ImageCard from "./ImageCard";
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

export default function ImageList({
  imageUrls,
  parentcheck,
  childChecked,
  onChildCheckboxChange,
}) {
  const [checkedImages, setCheckedImages] = useState({});

  const handleChildCheckboxChange = (imgKey, isChecked) => {
    setCheckedImages((prevState) => ({
      ...prevState,
      [imgKey]: isChecked,
    }));

    onChildCheckboxChange(imgKey, isChecked);
  };
  //childchecked 는 각각의 객체
  useEffect(() => {
    setCheckedImages(childChecked);
    
  }, [childChecked]);


  return (
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
              imgKey={image.imgKey}
              imgUrl={image.url}
              fileName={image.fileName}
              fileSize={image.fileSize}
              checked={checkedImages[image.imgKey]?.checked || false}
              onChildCheckboxChange={handleChildCheckboxChange}
              parentcheck={parentcheck}
            />
          );
        })
      ) : (
        <Typography variant="h6" component="h4" sx={{ mt: 25, ml: 60 }}>
          저장된 파일이 없습니다.
        </Typography>
      )}
    </Box>
  );
}
