// import React from 'react';
// import { useParams } from 'react-router-dom';

// const FolderPage = () => {
//   const { folderId } = useParams();

//   폴더 ID를 사용하여 필요한 데이터 가져오기 등의 로직 작성

//   return (
//     <div>
//       <h1>폴더 페이지</h1>
//       <p>폴더 ID: {folderId}</p>
//       {/* 폴더 페이지 내용 추가 */}
//     </div>
//   );
// };

// export default FolderPage;

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
import DocumentList from "../components/DocumentList";
import DeleteList from "../components/DeleteList";
import { Link, useParams } from "react-router-dom";

function FolderPage({ window }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerWidth = 200;
  const [imageUrls, setImageUrls] = useState([]);
  const [documentUrls, setDocumentUrls] = useState([]);
  const [childChecked, setChildChecked] = useState({});
  const [selfcheck, setselfcheck] = useState(false);
  const [parentChecked, setParentChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedOption, setSelectedOption] = useState("all");
  const [deleteList, setDeleteList] = useState([]);
  const { folderName } = useParams();

  const handleAllFilesClick = () => {
    setSelectedOption("all");
  };

  const handlePhotoClick = () => {
    setSelectedOption("photo");
  };

  const handleDocumentsClick = () => {
    setSelectedOption("documents");
  };
  const handleDeleteFilesClick = () => {
    setSelectedOption("delete");
  };

  const handleChildCheckboxChange = (imgKey, newChecked) => {
    setChildChecked((prevChecked) => ({
      ...prevChecked,
      [imgKey.toString()]: { checked: newChecked, value: "some value" },
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

  {
    /*서버에 보낼 함수*/
  }
  const handleUpload = (file) => {
    if (file.type.includes("image")) {
      const imageData = {
        url: URL.createObjectURL(file),
        fileName: file.name,
        fileSize: file.size,
        imgKey: `img-${Date.now()}`,
      };

      setImageUrls((prevUrls) => [...prevUrls, imageData]);
    } else if (
      file.type.includes("application/pdf") ||
      file.type.includes(".doc") ||
      file.type.includes(".docx") ||
      file.type.includes("application/msword") ||
      file.type.includes("application/vnd.ms-excel") ||
      file.type.includes(".xls") ||
      file.type.includes(".xlsx") ||
      file.type.includes(".csv") ||
      file.type.includes(".ppt") ||
      file.type.includes(".pptx") ||
      file.type.includes("application/vnd.ms-powerpoint")
    ) {
      const documentData = {
        url: URL.createObjectURL(file),
        fileName: file.name,
        fileSize: file.size,
        docKey: `doc-${Date.now()}`,
      };

      setDocumentUrls((prevUrls) => [...prevUrls, documentData]);
    }
  };

  const handleRestore = () => {
    const selectedImages = Object.entries(childChecked)
      .filter(([_, checked]) => checked.checked)
      .map(([key]) => key);

    const selectedDocuments = Object.entries(childChecked)
      .filter(([_, checked]) => checked.checked)
      .map(([key]) => key);
    setImageUrls((prevImageUrls) => {
      const restoredImages = selectedImages.map((imageKey) => {
        const restoredImage = deleteList.find(
          (item) => item.imgKey === imageKey
        );
        if (restoredImage) {
          //console.log(restoredImage);
          return {
            fileName: restoredImage.fileName,
            fileSize: restoredImage.fileSize,
            imgKey: imageKey,
            url: restoredImage.url,
          };
        }
        return null;
      });
      const filteredRestoredImages = restoredImages.filter(Boolean);
      return [...prevImageUrls, ...filteredRestoredImages];
    });
    setDocumentUrls((prevDocumentUrls) => {
      const restoredDocuments = selectedDocuments.map((documentKey) => {
        // Find the restored document details based on the documentKey
        const restoredDocument = deleteList.find(
          (item) => item.docKey === documentKey
        );

        if (restoredDocument) {
          // Return the restored document with correct details
          //console.log(restoredDocument);
          return {
            fileName: restoredDocument.fileName,
            fileSize: restoredDocument.fileSize,
            docKey: documentKey,
            url: restoredDocument.url, // Update with the correct URL for the document
            // Update with the correct filename for the document
          };
        }

        return null;
      });

      const filteredRestoredDocuments = restoredDocuments.filter(Boolean);
      console.log(filteredRestoredDocuments);

      return [...prevDocumentUrls, ...filteredRestoredDocuments];
    });

    setDeleteList((prevDeleteList) =>
      prevDeleteList.filter(
        (item) =>
          !(
            selectedImages.includes(item.imgKey) ||
            selectedDocuments.includes(item.docKey)
          )
      )
    );
    parentchange({ target: { checked: false } });
    setChildChecked({});
  };

  const handleDelete = () => {
    const selectedImages = Object.entries(childChecked)
      .filter(([_, checked]) => checked.checked)
      .map(([key]) => key);

    const selectedDocuments = Object.entries(childChecked)
      .filter(([_, checked]) => checked.checked)
      .map(([key]) => key);

    // Remove selected images from the imageUrls array
    setImageUrls((prevImageUrls) =>
      prevImageUrls.filter(
        (imageUrl) => !selectedImages.includes(imageUrl.imgKey)
      )
    );

    // Remove selected documents from the documentUrls array
    setDocumentUrls((prevDocumentUrls) =>
      prevDocumentUrls.filter(
        (documentUrl) => !selectedDocuments.includes(documentUrl.docKey)
      )
    );

    // Create an array of deleted items with their details
    const deletedItems = [
      ...imageUrls.filter((imageUrl) =>
        selectedImages.includes(imageUrl.imgKey)
      ),
      ...documentUrls.filter((documentUrl) =>
        selectedDocuments.includes(documentUrl.docKey)
      ),
    ];

    // Update the deleteList state
    setDeleteList((prevDeleteList) => [...prevDeleteList, ...deletedItems]);
    parentchange({ target: { checked: false } });
    setChildChecked({});
  };

  {
    /*서버 호출 업로드*/
  }

  //  const handleUpload = (file) => {
  //     const imageData = new FormData();
  //     imageData.append('url', URL.createObjectURL(file));

  //     const xhr = new XMLHttpRequest();
  //     xhr.open('POST', 'http://43.207.224.148:8000/upload/file', true);
  //     xhr.send(imageData);

  //     const newImageData = {
  //       url: URL.createObjectURL(file),
  //       fileName: file.name,
  //       fileSize: file.size,
  //       imgKey: `img-${Date.now()}`,
  //     };
  //     setImageUrls((prevUrls) => [...prevUrls, newImageData]);
  //   };

  {
    /*서버 파일 다운로드 */
  }

  const handleDownload = () => {
    const checkedKeys = Object.keys(childChecked).filter(
      (key) => childChecked[key].checked
    );
    checkedKeys.forEach((key) => {
      const imageData = imageUrls.find((image) => image.imgKey === key);
      if (imageData) {
        const fileName = imageData.fileName; // Set the file name based on the imageData
        const downloadUrl = `http://43.207.224.148:8000/download/file?file_name=${encodeURIComponent(
          fileName
        )}`; // Construct the download URL
        window.open(downloadUrl); // Open the download URL in a new window/tab
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
  }, [childChecked, handleDelete]);

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
        ></Drawer>
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
          <SideBar
            onAllFilesClick={handleAllFilesClick}
            onPhotoClick={handlePhotoClick}
            onDocumentsClick={handleDocumentsClick}
            onDeleteClick={handleDeleteFilesClick}
          />
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
        <Box sx={{ position: "absolute", top: 82, left: 200, width: "85%" }}>
          <div style={{ marginLeft: 15 }}>
            <h4>
              {" "}
              <Link to='/Main'>KHUperCLOUD</Link> &gt; {folderName} &nbsp;
            </h4>
          </div>
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
              {/*서버에 삭제 요청 handleEmptyTrash 정의 필요*/}
              {selectedOption === "delete" ? (
                <>
                  <Button
                    sx={{ marginTop: 0.3, marginLeft: 1 }}
                    variant="contained"
                    /*onClick={handleEmptyTrash}*/
                  >
                    휴지통 비우기
                  </Button>
                  <Button
                    sx={{ marginTop: 0.3, marginLeft: 1 }}
                    variant="outlined"
                    onClick={handleRestore}
                  >
                    복원
                  </Button>
                </>
              ) : (
                <>
                  <Upload
                    onCreateImage={handleUpload}
                    onCreateDocument={handleUpload}
                  />
                  <Button
                    sx={{ marginTop: 0.3, marginLeft: 1 }}
                    onClick={handleDownload}
                    variant="outlined"
                  >
                    내려받기
                  </Button>
                  <Button
                    sx={{ marginTop: 0.3, marginLeft: 1 }}
                    variant="outlined"
                    onClick={handleDelete}
                  >
                    삭제
                  </Button>
                </>
              )}
            </Box>
          </Box>

          <Divider sx={{ my: 2.3 }} />
        </Box>
        <Box sx={{ mt: 20, display: "flex", flexWrap: "wrap" }}>
          {selectedOption === "all" ? (
            <>
              <div style={{ margin: "5px", flexBasis: "100%" }}>
                <ImageList
                  imageUrls={imageUrls}
                  parentcheck={selfcheck}
                  childChecked={childChecked}
                  onChildCheckboxChange={handleChildCheckboxChange}
                />
              </div>
              <div
                style={{
                  margin: "0px",
                  flexBasis: "100%",
                  paddingTop: "0",
                  marginTop: -130,
                }}
              >
                <DocumentList
                  documentUrls={documentUrls}
                  parentcheck={selfcheck}
                  childChecked={childChecked}
                  onChildCheckboxChange={handleChildCheckboxChange}
                />
              </div>
            </>
          ) : selectedOption === "photo" ? (
            <ImageList
              imageUrls={imageUrls}
              parentcheck={selfcheck}
              childChecked={childChecked}
              onChildCheckboxChange={handleChildCheckboxChange}
            />
          ) : selectedOption === "documents" ? (
            <div style={{marginTop:-130}}>
            <DocumentList 
              documentUrls={documentUrls}
              parentcheck={selfcheck}
              childChecked={childChecked}
              onChildCheckboxChange={handleChildCheckboxChange}
            />
            </div>
          ) : selectedOption === "delete" ? (
            <div style={{marginTop:-130}}>
            <DeleteList
              deleteList={deleteList}
              parentcheck={selfcheck}
              childChecked={childChecked}
              onChildCheckboxChange={handleChildCheckboxChange}
            />
            </div>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
}

FolderPage.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default FolderPage;
