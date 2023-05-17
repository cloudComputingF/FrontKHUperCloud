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
import { styled } from "@mui/system";
import { useState, useEffect } from "react";
import ChildCheckboxes from "./ChildCheckbox";
import Modal from "./Modal";
import ImageViewer from "./DocumentViewer/ImageViewer";
export default function ImageCard({
  imgKey,
  imgUrl,
  fileName,
  fileSize,
  parentcheck,
  checked,
  onChildCheckboxChange,
}) {
  const [imageSrc, setImageSrc] = useState(imgUrl);
  const [ischecked, setChecked] = useState(checked);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImgUrl, setSelectedImgUrl] = useState(null);
  
  const handleModalClose = () => {
    setOpenModal(false);
  };
  const handleCardClick = () => {
    setSelectedImgUrl(imgUrl);
    setOpenModal(true);
  };
  useEffect(() => {
    //console.log(ischecked);
    setImageSrc(imgUrl);
  }, [imgUrl, ischecked]);

  const handleChildCheckboxChange = (imgKey, newChecked) => {
    setChecked(newChecked);
    onChildCheckboxChange(imgKey, newChecked);
  };
  
  return (
    <div>
       {openModal && (
        <Modal filename={fileName} url={imgUrl} open={openModal} onClose={handleModalClose}>
          <ImageViewer imgUrl={selectedImgUrl} />
        </Modal>
      )}
    <Card
      key={imgKey}
      sx={{
        maxWidth: 245,
        height: "150px",
        position: "relative",
        m: 1,
        cursor: "pointer",
      }}
      onClick={handleCardClick}
    >
      <CardHeader
        avatar={
          <Box sx={{ display: "flex", alignItems: "center",marginLeft:1.5 }}>
            <ChildCheckboxes
              imgKey={imgKey}
              parentcheck={parentcheck}
              checked={ischecked}
              onChange={handleChildCheckboxChange}
            />
          </Box>
        }
        onClick={(event) => event.stopPropagation()} 
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ color: "white", fontSize: "15px", textAlign: "center" }}
          >
            {fileName}
          </Typography>
          <Typography
            sx={{ color: "white", fontSize: "10px", textAlign: "center" }}
          >{`${(fileSize / 1024).toFixed(2)}KB`}</Typography>
        </div>
      </CardContent>
      <CardMedia
        component="img"
        sx={{
          maxWidth: "auto",
          height: "auto%",
          objectFit: "contain",
        }}
        image={imageSrc}
      ></CardMedia>
      <CardActions
        sx={{ position: "absolute", display: "flex", bottom: -10, right: -10 }}
      >
        <IconButton aria-label="add to favorites">
          <FavoriteIcon color="white" />
        </IconButton>
      </CardActions>
    </Card>
    </div>
  );
}
