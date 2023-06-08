import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FileUploadIcon from "@mui/icons-material/FileUpload";

import { useDropzone } from "react-dropzone";

export default function Upload2({
  onCreateImage,
  onCreateDocument,
  onCreateMusic,
  onCreateVideo,
  onCreateFolder,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [uploading, setUploading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    webkitdirectory: true,
    onDrop: (acceptedFiles) => {
      setUploading(true);
      if (acceptedFiles[0].type === "") {
        onCreateFolder(acceptedFiles);
        setUploading(false);
      } else {
        const validFiles = acceptedFiles.filter((file) => {
          const isImage = file.type && file.type.split("/")[0] === "image";
          const isDocument =
            file.type &&
            (file.type.startsWith("application/pdf") ||
              file.name.endsWith(".doc") ||
              file.name.endsWith(".docx") ||
              file.type.startsWith("application/msword") ||
              file.type.startsWith("application/vnd.ms-excel") ||
              file.name.endsWith(".xls") ||
              file.name.endsWith(".xlsx") ||
              file.name.endsWith(".csv") ||
              file.name.endsWith(".ppt") ||
                file.name.endsWith(".pptx") ||
              file.type.startsWith("application/vnd.ms-powerpoint"));
          const isAudio = file.type && file.type.split("/")[0] === "audio";
          const isVideo = file.type && file.type.split("/")[0] === "video";
          const isSmallEnough = file.size <= 5000000; // 5MB 이하로 제한

          return (isImage || isDocument || isAudio || isVideo) && isSmallEnough;
        });

        validFiles.forEach((file, index) => {
          const reader = new FileReader();
          reader.onload = () => {
            if (file.type && file.type.split("/")[0] === "image") {
              onCreateImage(file);
            } else if (
              file.type &&
              (file.type.startsWith("application/pdf") ||
                file.name.endsWith(".doc") ||
                file.name.endsWith(".docx") ||
                file.type.startsWith("application/msword") ||
                file.type.startsWith("application/vnd.ms-excel") ||
                file.name.endsWith(".xls") ||
                file.name.endsWith(".xlsx") ||
                file.name.endsWith(".csv") ||
                file.name.endsWith(".ppt") ||
                file.name.endsWith(".pptx") ||
                file.type.startsWith("application/vnd.ms-powerpoint"))
            ) {
              onCreateDocument(file);
            } else if (file.type && file.type.split("/")[0] === "audio") {
              onCreateMusic(file);
            } else if (file.type && file.type.split("/")[0] === "video") {
              onCreateVideo(file);
            }
            URL.revokeObjectURL(reader.result);
          };
          reader.readAsDataURL(file);
        });
        setUploading(false);
      }
    },
   
  });

  return (
    <form>
      <Button
        id="basic-button"
        startIcon={<FileUploadIcon />}
        variant="contained"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        잠금
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          {...getRootProps({
            onClick: () => {
              setAnchorEl(null);
            },
           
          })}
        >
          파일 올리기
        </MenuItem>
        <MenuItem>
          <label htmlFor="folder-input">폴더 올리기</label>
          <input
            id="folder-input"
            type="file"
            onChange={(event) => {
              const files = event.target.files;
              const fileList = [];
              for (let i = 0; i < files.length; i++) {
                fileList.push(files[i]);
              }
              if (typeof onCreateFolder === "function") {
                onCreateFolder(fileList);
              }
              setAnchorEl(null);
            }}
            webkitdirectory="true"
            {...getInputProps({
            
              multiple: false,
            })}
          />
        </MenuItem>
      </Menu>
      <input {...getInputProps()} />
    </form>
  );
}
