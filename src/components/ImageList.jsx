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
        mt: 20,
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {imageUrls.length > 0
        ? imageUrls.map((image, index) => {
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
        : null}
    </Box>
  );
}
