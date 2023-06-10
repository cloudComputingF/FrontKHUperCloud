import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Modal from 'react-modal';


import { useDropzone } from "react-dropzone";

Modal.setAppElement('#root');

export default function Upload2({
  onCreateImage,
  onCreateDocument,
  onCreateMusic,
  onCreateVideo,
  onCreateFolder,
  onPasswordChange
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [uploading, setUploading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [filePassword, setFilePassword] = useState("");
  
  const handlePasswordChange = () => {
    setAnchorEl(null);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onPasswordChange(filePassword); // 비밀번호를 Mainpage.jsx로 전달
    closeModal();
    alert("파일 비밀번호가 변경되었습니다")
  };
  
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
        <MenuItem onClick={handlePasswordChange}>
          비번 변경
        </MenuItem>

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
            {openModal && (<Modal className="modalpass" isOpen={openModal}>
                          <h5>비밀번호 변경</h5>
                          <div className="password-info">
                          <h7>초기 비번: 1234</h7>
                          </div>
                          <input type="password" value={filePassword} onChange={(e) => setFilePassword(e.target.value)} />
                          <button onClick={handleFormSubmit}>변경</button>
                          <button onClick={closeModal}>취소</button>
                        </Modal>)}



      {/* {openModal && (
        <div className="password-modal">
          <div className="modal-content">
            <h3>비밀번호 변경</h3>
            <form onSubmit={handleFormSubmit}>
              <input type="password" name="newPassword" placeholder="새 비밀번호" />
              <input type="password" name="confirmPassword" placeholder="비밀번호 확인" />
              <div className="modal-actions">
                <Button variant="contained" type="button" onClick={closeModal}>
                  취소
                </Button>
                <Button variant="contained" type="submit">
                  변경
                </Button>
              </div>
            </form>
          </div>
        </div>
      )} */}
      <input {...getInputProps()} />
    </form>
  );
}
