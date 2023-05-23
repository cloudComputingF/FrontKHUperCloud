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
import { useState, useEffect } from "react";
import ChildCheckboxes from "./ChildCheckbox";
import Modal from "./Modal";
export default function DocumentCard({
  docKey,
  docUrl,
  fileName,
  fileSize,
  parentcheck,
  checked,
  onChildCheckboxChange,
}) {
  let images;
  if (fileName.endsWith(".pdf")) {
    images = "/images/PDF.PNG";
  } else if (
    fileName.endsWith(".doc") ||
    fileName.endsWith(".docx") ||
    fileName.startsWith("application/msword")
  ) {
    images = "/images/Word.png";
  } else if (
    fileName.endsWith(".xls") ||
    fileName.endsWith(".xlsx") ||
    fileName.endsWith(".csv") ||
    fileName.startsWith("application/vnd.ms-excel")
  ) {
    images = "/images/Excel.PNG";
  } else if (
    fileName.endsWith(".ppt") ||
    fileName.endsWith(".pptx") ||
    fileName.startsWith("application/vnd.ms-powerpoint")
  ) {
    images = "/images/PowerPoint.PNG";
  }
  const [imageSrc, setImageSrc] = useState(docUrl);
  const [ischecked, setChecked] = useState(checked);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDocumentUrl, setSelectedDocumentUrl] = useState(null);

  const handleModalClose = () => {
    setOpenModal(false);
  };
  const handleCardClick = () => {
    setSelectedDocumentUrl(docUrl);
    setOpenModal(true);
  };
  useEffect(() => {
    setImageSrc(docUrl);
  }, [docUrl, ischecked]);

  const handleChildCheckboxChange = (docKey, newChecked) => {
    setChecked(newChecked);
    onChildCheckboxChange(docKey, newChecked);
  };

const isimage=false;

  return (
    <div>
      {openModal && (
        <Modal filename={fileName} url={docUrl} open={openModal} onClose={handleModalClose} isimage={isimage}>
        </Modal>
      )}
      <Card
        key={docKey}
        sx={{
          maxWidth: 245,
          height: "150px",
          position: "relative",
          m: 1,
          cursor: "pointer",
        }}
      >
        <CardHeader
          avatar={
            <Box
              sx={{ display: "flex", alignItems: "center", marginLeft: 1.5 }}
            >
              <ChildCheckboxes
                docKey={docKey}
                parentcheck={parentcheck}
                checked={ischecked}
                onChange={handleChildCheckboxChange}
              />
            </Box>
          }
           
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
              sx={{ color: "white", fontSize: "12px", textAlign: "center" }}
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
            width: "225px",
            height: "150px",
            objectFit: "contain",
            marginTop: "-10px",
          }}
          image={images}
          onClick={handleCardClick}
        ></CardMedia>
        <CardActions
          sx={{
            position: "absolute",
            display: "flex",
            bottom: -10,
            right: -10,
          }}
        >
          <IconButton aria-label="add to favorites">
            <FavoriteIcon color="white" />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}
