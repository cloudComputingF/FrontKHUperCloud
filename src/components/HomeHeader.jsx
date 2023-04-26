import React from "react";
import { Box, Button, Typography, Toolbar, AppBar } from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";

export default function HomeHeader() {
  return (
    <AppBar
      position="static"
      sx={{ position: "fixed", top: 0, left: 0, right: 0, bgcolor: "white" }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button variant="Text" style={{ textTransform: "capitalize" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: "white",
                flex: 1,
              }}
            >
              <CloudIcon
                sx={{ fontSize: "5rem", marginRight: "0.5rem", fill: "black" }}
              />
              <Typography
                variant="h6"
                noWrap
                sx={{ display: "flex", alignItems: "center", color: "black" }}
              >
                KHUperCLOUD
              </Typography>
            </Box>
          </Button>
          <Button
            variant="Text"
            sx={{ marginRight: "40rem", color: "black", fontSize: 15 }}
          >
            기능 소개
          </Button>
          <Button
            variant="Text"
            style={{ color: "blue", textTransform: "capitalize", fontSize: 15 }}
          >
            KHUperCLOUD 바로가기
          </Button>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button sx={{ color: "black", fontSize: 15 }}>로그인</Button>
            <Button sx={{ color: "black", marginLeft: "1rem", fontSize: 15 }}>
              회원가입
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
