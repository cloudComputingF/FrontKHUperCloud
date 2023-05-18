import * as React from "react";
import {
  Box,
  CssBaseline,
  AppBar,
  Checkbox,
  Drawer,
  Divider,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import Header from "./MainHeader";
import SideBar from "./SideBar";
import { useState, useEffect } from "react";
import ImageList from "../components/ImageList";
import Upload from "../components/Upload";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import DocumentList from "../components/DocumentList"


function MainPage({ window }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerWidth = 200;
  const [imageUrls, setImageUrls] = useState([]);
  const [documentUrls, setDocumentUrls] = useState([]);
  const [childChecked, setChildChecked] = useState({});
  const [selfcheck, setselfcheck] = useState(false);
  const [parentChecked, setParentChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  
  const [isLogin, setIsLogin] = useState(false); //로그인 관리

  useEffect(() => {
    if (sessionStorage.getItem('user_id') === null) {
      // sessionStorage 에 name 라는 key 값으로 저장된 값이 없다면
      console.log("isLogin ?? :: ", isLogin);
    } else {
      // sessionStorage 에 name 라는 key 값으로 저장된 값이 있다면
      // 로그인 상태 변경
      setIsLogin(true); // 후에 setIsLogin true면 아이디? 닉네임? 메인페이지에 뜨게 해야 함
      console.log("isLogin ?? :: ", isLogin);
    }
  });

  const handleChildCheckboxChange = (imgKey, newChecked) => {
    setChildChecked((prevChecked) => ({
      ...prevChecked,
      [imgKey]: { checked: newChecked, value: "some value" },
    }));
    const allChecked = Object.values(childChecked).every(
      (checked) => checked.checked
    );

    if (allChecked) {
      setParentChecked(true);
      setIndeterminate(false);
    } else {
      const someChecked = Object.values(childChecked).some(
        (checked) => checked.checked
      );
      setParentChecked(false);
      setIndeterminate(someChecked);
    }
  };

  const parentchange = (event) => {
    const newChecked = event.target.checked;
    //각각  imgkey,bool 값 할당
    const newChildChecked = Object.keys(childChecked).reduce(
      (result, imgKey) => {
        result[imgKey] = newChecked;
        return result;
      },
      {}
    );
    //console.log(newChildChecked);

    //변화된 child값 함수 호출 해서 변화
    Object.keys(newChildChecked).forEach((imgKey) => {
      handleChildCheckboxChange(imgKey, newChecked);
    });

    // Update state variables
    setIndeterminate(false);
    if (parentChecked) {
      setselfcheck(false);
    } else {
      setselfcheck(true);
    }
    setParentChecked(newChecked);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleUpload = async (file) => {
    const imageData = new FormData();
    imageData.append('url', URL.createObjectURL(file));
  
    try {
      const response = await fetch('http://43.207.224.148:8000/upload/file', {
        method: 'POST',
        body: imageData,
      });
  
      if (!response.ok) {
        throw new Error('Image upload failed.');
      }
  
      const newImageData = {
        url: URL.createObjectURL(file),
        fileName: file.name,
        fileSize: file.size,
        imgKey: `img-${Date.now()}`,
      };
  
      setImageUrls((prevUrls) => [...prevUrls, newImageData]);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  
  {
    /*체크된 이미지 다운로드 */
  }
  const handleDownload = () => {
    const checkedKeys = Object.keys(childChecked).filter(
      (key) => childChecked[key].checked
    );
    checkedKeys.forEach((key) => {
      const imageData = imageUrls.find((image) => image.imgKey === key);
      if (imageData) {
        const downloadLink = document.createElement("a");
        downloadLink.href = imageData.url;
        downloadLink.download = imageData.fileName;
        downloadLink.click();
      }
    });
  };
  //childcheck 상태 기반 부수효과
  useEffect(() => {
    const allChecked =
      Object.keys(childChecked).length > 0 &&
      Object.values(childChecked).every((checked) => checked.checked);
    const someChecked = Object.values(childChecked).some(
      (checked) => checked.checked
    );
    setParentChecked(allChecked);
    if (someChecked && !allChecked) {
      setIndeterminate(true);
    } else {
      setIndeterminate(false);
    }
  }, [childChecked]);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Header setMobileOpen={handleDrawerToggle} />
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <SideBar />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <SideBar />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          p: 3,
          display: "flex",
          maxWidth: "100%",
        }}
      >
        <Box sx={{ position: "absolute", top: 90, left: 200, width: "85%" }}>
          <Box
            sx={{ display: "flex", alignItems: "center", marginLeft: "14px" }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={parentChecked}
                  indeterminate={indeterminate}
                  onChange={parentchange}
                />
              }
              sx={{ marginRight: 1 }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <Divider orientation="vertical" sx={{ height: "100%" }} />
              <Upload
                onCreateImage={handleUpload}
              />
              <Button sx={{ marginTop: 0.3, marginLeft: 1 }} variant="outlined">
                새폴더
              </Button>
              <Button
                sx={{ marginTop: 0.3, marginLeft: 1 }}
                onClick={handleDownload}
                variant="outlined"
              >
                내려받기
              </Button>
              <Button sx={{ marginTop: 0.3, marginLeft: 1 }} variant="outlined">
                삭제
              </Button>
            </Box>
          </Box>
          <Divider sx={{ my: 2.3 }} />
        </Box>
        <Box
          sx={{
            mt: -2,
            display: "flex",
            flexWrap: "wrap",
          }}
        >
        
          <ImageList
            imageUrls={imageUrls}
            parentcheck={selfcheck}
            childChecked={childChecked}
            onChildCheckboxChange={handleChildCheckboxChange}
        />
        </Box>
      </Box>
    </Box>
  );
}

MainPage.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default MainPage;
