import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ImageCard from "./ImageCard";
import { useDropzone } from "react-dropzone";

export default function Upload({ onCreateContents }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [uploading, setUploading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const validFiles = acceptedFiles.filter((file) => {
        const isImage = file.type && file.type.split("/")[0] === "image";
        const isSmallEnough = file.size <= 5000000; // 5MB 이하로 제한

        return isImage && isSmallEnough;
      });
      setUploading(true);
      validFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          onCreateContents(validFiles);
          URL.revokeObjectURL(reader.result);
        };
        reader.readAsDataURL(file);
      });
      setUploading(false);
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
          })}
        >
          파일 올리기
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
          }}
        >
          폴더 올리기
        </MenuItem>
      </Menu>
      <input {...getInputProps()} />
    </form>
  );
}
