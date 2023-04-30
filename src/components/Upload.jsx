import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ImageCard from "./ImageCard";
import { useDropzone } from "react-dropzone";

export default function Upload({
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
    multiple: false,
    webkitdirectory: true,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles[0].type === "") {
        onCreateFolder(acceptedFiles);
      } else {
        const validFiles = acceptedFiles.filter((file) => {
          const isImage = file.type && file.type.split("/")[0] === "image";
          const isDocument =
            file.type &&
            (file.type.startsWith("application/pdf") ||
              file.type.startsWith("application/msword") ||
              file.type.startsWith("application/vnd.ms-excel") ||
              file.type.startsWith("application/vnd.ms-powerpoint"));
          const isAudio = file.type && file.type.split("/")[0] === "audio";
          const isVideo = file.type && file.type.split("/")[0] === "video";
          const isSmallEnough = file.size <= 5000000; // 5MB 이하로 제한

          return (isImage || isDocument || isAudio || isVideo) && isSmallEnough;
        });

        setUploading(true);
        validFiles.forEach((file) => {
          const reader = new FileReader();
          reader.onload = () => {
            if (file.type && file.type.split("/")[0] === "image") {
              onCreateImage(validFiles);
            } else if (
              file.type &&
              (file.type.startsWith("application/pdf") ||
                file.type.startsWith("application/msword") ||
                file.type.startsWith("application/vnd.ms-excel") ||
                file.type.startsWith("application/vnd.ms-powerpoint"))
            ) {
              onCreateDocument(validFiles);
            } else if (file.type && file.type.split("/")[0] === "audio") {
              onCreateMusic(validFiles);
            } else if (file.type && file.type.split("/")[0] === "video") {
              onCreateVideo(validFiles);
            }
            URL.revokeObjectURL(reader.result);
          };
          reader.readAsDataURL(file);
        });
        setUploading(false);
      }
    },
    accept:
      "image/*, application/pdf, application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, audio/*, video/*",
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
        {"올리기"}
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
            accept:
              "image/*, application/pdf, application/msword, application/vnd.ms-excel, audio/*, video/*",
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
              accept: "",
              multiple: false,
            })}
          />
        </MenuItem>
      </Menu>
      <input {...getInputProps()} />
    </form>
  );
}
