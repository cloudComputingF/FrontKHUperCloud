import React from "react";
import { Box, Button, Typography, Toolbar, AppBar } from "@mui/material";
import HomeHeader from "./HomeHeader";
function HomePage() {
  return (
    <div>
      <HomeHeader />
      <Box
        sx={{
          backgroundImage: "url(/images/my-images.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-end",
          minHeight: "100vh",
          padding: "100px",
        }}
      >
        <div style={{ whiteSpace: "pre-line", textAlign: "right" }}>
          <Typography
            variant="h3"
            sx={{ color: "white" }}
            style={{ display: "inline-block", marginRight: "125px" }}
          >
            KHUperCLOUD와 함께
          </Typography>
          {"\n"}
          <Typography
            variant="h3"
            sx={{ color: "white" }}
            style={{ display: "inline-block", marginRight: "6px" }}
          >
            중요한 사진,자료를 한곳에서
          </Typography>
          {"\n"}
          <Typography
            variant="h6"
            sx={{ color: "white" }}
            style={{ display: "inline-block", marginRight: "200px" }}
          >
            AWS와 연계한 대용량 스토리지 서비스입니다.
          </Typography>
          {"\n"}
          <Typography
            variant="h6"
            sx={{ color: "white" }}
            style={{ display: "inline-block", marginRight: "100px" }}
          >
            사진과 문서자료를 안전하게 보관하고 작업할수 있습니다.
          </Typography>
          {"\n"}
          <Typography
            variant="h6"
            sx={{ color: "white" }}
            style={{ display: "inline-block", marginRight: "265px" }}
          >
            기존에 없던 특별한 기능을 제공합니다.
          </Typography>
        </div>
      </Box>
    </div>
  );
}
export default HomePage;
