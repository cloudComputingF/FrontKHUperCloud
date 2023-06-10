import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  Button,
} from "@mui/material";

export default function Share({ open, onClose, url, filename, handlePasswordSubmit }) {
  const [password, setPassword] = useState("");

  const cleanURL = "http://127.0.0.1:5173/Main"

  const handleSubmit = () => {
    handlePasswordSubmit(password);

    const mailtoLink = `mailto:?subject=Password-Protected File: ${filename}&body=암호가 걸린 파일을 공유합니다. 파일을 열기 위해 암호를 입력하세요.%0A%0A파일 이름: ${filename}%0A다운로드 링크: ${cleanURL}%0A암호: ${password}`;

    window.location.href = mailtoLink;

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{filename}</DialogTitle>
      <DialogContent>
        <p>링크 공유</p>
        <p>{cleanURL}</p>
        <p>암호가 있다면 입력하세요:</p>
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
          <Button variant="contained" onClick={handleSubmit}>
            보내기
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
