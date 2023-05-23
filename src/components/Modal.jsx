import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import TranslateIcon from "@mui/icons-material/Translate";
import React, { useState, useEffect } from "react";

const Modal = ({ open, onClose, filename, url }) => {
  const [isImage, setIsImage] = useState(false);

  useEffect(() => {
    const fileExtension = filename.split(".").pop().toLowerCase();
    const imageExtensions = ["png", "jpg", "jpeg", "gif"];
    setIsImage(imageExtensions.includes(fileExtension));
  }, [filename]);

  let wordImage = "/images/DOCX.png";
  let content;

  if (isImage) {
    content = (
      <img src={url} alt={filename} style={{ width: "100%", height: "100%" }} />
    );
  } else if (filename.endsWith(".pdf")) {
    content = (
      <iframe
        src={url}
        title={filename}
        style={{ width: "100%", height: "100%" }}
      />
    );
  } else if (
    filename.endsWith(".doc") ||
    filename.endsWith(".docx") ||
    filename.startsWith("application/msword")
  ) {
    content = (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
        }}
      >
        <img
          src={wordImage}
          alt="Word Icon"
          style={{ marginTop: 150, maxWidth: "150%", maxHeight: "150%" }}
        />
      </div>
    );
  }

  const handleTranslate = () => {
    // Handle translation logic here
    console.log("Translate document:", filename);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {filename}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ height: "600px", width: "600px" }}>
        <Box display="flex" justifyContent="flex-end" marginBottom={1}>
          {!isImage ? (
            <IconButton aria-label="translate" onClick={handleTranslate}>
              <TranslateIcon sx={{ fontSize: 50 }} />
            </IconButton>
          ) : (
            <IconButton aria-label="delete" /*onClick={handleDelete}*/>
              <DeleteIcon sx={{ fontSize: 50 }} />
            </IconButton>
          )}
          <IconButton aria-label="download" /*onClick={handleDownload}*/>
            <DownloadIcon sx={{ fontSize: 50 }} />
          </IconButton>
        </Box>

        {content}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
