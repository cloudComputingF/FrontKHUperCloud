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

  useEffect(() => {
    fetch(`http://35.78.185.19:8000/files/search?folder=Main/${encodeURIComponent(folderName)}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache', // 캐싱 방지 헤더 추가
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch folder and file data.');
        }
      })
      .then((data) => {
        console.log('파일: ', data); // 확인용
        
        const files = data.Message.filter((fileName) => !fileName.endsWith('/')); // 추출한 파일만 필터링해서 files 변수에 할당
        const folders = data.Message.filter((fileName) => fileName.endsWith('/')); // 추출한 폴더만 필터링해서 folders 변수에 할당
  
        files.forEach((fileName) => {
          // 파일 경로에서 파일 이름만 추출
          const filePathParts = fileName.split('/');
          const fileNameOnly = filePathParts[filePathParts.length - 1];
  
          const file = new File([], fileNameOnly); // 파일 객체 생성
  
          if (file.name.includes('.PNG') || file.name.includes('.JPG')) {
            fetch(`http://35.78.185.19:8000/files/download?fileName=Main/${encodeURIComponent(folderName)}/${encodeURIComponent(fileNameOnly)}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            })
              .then((response) => {
                if (response.ok) {
                  console.log(response);
                  return response.json();
                } else {
                  throw new Error('Failed to fetch download URL.');
                }
              })
              .then((data) => {
                console.log('Download URL:', data.Message);
                const downloadUrls = data.Message.map((item) => item.download);
                console.log('Download URLs:', downloadUrls[0]);
                const download = downloadUrls[0];
  
                const newImageData = {
                  url: download,
                  fileName: fileNameOnly,
                  fileSize: download.size,
                  imgKey: `img-${Date.now()}`,
                };
                setImageUrls((prevUrls) => [...prevUrls, newImageData]);
              })
              .catch((error) => {
                console.error('Error:', error);
              });
          } else if (
            file.name.includes('.pdf') ||
            file.name.includes('.doc') ||
            file.name.includes('.docx') ||
            file.name.includes('.xls') ||
            file.name.includes('.xlsx') ||
            file.name.includes('.csv') ||
            file.name.includes('.ppt') ||
            file.name.includes('.pptx')
          ) {
            fetch(`http://35.78.185.19:8000/files/download?fileName=Main/${encodeURIComponent(folderName)}/${encodeURIComponent(fileNameOnly)}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            })
              .then((response) => {
                if (response.ok) {
                  console.log(response);
                  return response.json();
                } else {
                  throw new Error('Failed to fetch download URL.');
                }
              })
              .then((data) => {
                console.log('Download URL:', data.Message);
                const downloadUrls = data.Message.map((item) => item.download);
                console.log('Download URLs:', downloadUrls[0]);
                const download = downloadUrls[0];
  
                const documentData = {
                  url: download,
                  fileName: fileNameOnly,
                  fileSize: download.size,
                  docKey: `doc-${Date.now()}`,
                };
                setDocumentUrls((prevUrls) => [...prevUrls, documentData]);
              })
              .catch((error) => {
                console.error('Error:', error);
              });
          }
        });
  
        // Separate folder creation
      //   const newFolders = folders.map((folderName) => {
      //     const folderPathParts = folderName.split('/');
      //     const folderNameOnly = folderPathParts[folderPathParts.length - 2];
      //     const newFolder = {
      //       id: data.id,
      //       name: folderNameOnly,
      //     };
      //     return newFolder;
      //   });
  
      //   // Update the state with the new folders
      //   setFolders((prevFolders) => [...prevFolders, ...newFolders]);
      // }
  })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);








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

  const handleDelete = () => {
    const selectedImages = Object.entries(childChecked)
      .filter(([_, checked]) => checked.checked)
      .map(([key]) => key);
    const selectedDocuments = Object.entries(childChecked)
      .filter(([_, checked]) => checked.checked)
      .map(([key]) => key);
    setImageUrls((prevImageUrls) =>
      prevImageUrls.filter(
        (imageUrl) => !selectedImages.includes(imageUrl.imgKey)
      )
    );
    setDocumentUrls((prevDocumentUrls) =>
      prevDocumentUrls.filter(
        (documentUrl) => !selectedDocuments.includes(documentUrl.docKey)
      )
    );
  
    const deletedItems = [
      ...imageUrls.filter((imageUrl) =>
        selectedImages.includes(imageUrl.imgKey)
      ),
      ...documentUrls.filter((documentUrl) =>
        selectedDocuments.includes(documentUrl.docKey)
      ),
    ];
  
    deletedItems.forEach((item) => {
      console.log(item.fileName);
      const uploadFilePath = item.fileName; // 파일 경로 인코딩
      const deleteUrl = `http://35.78.185.19:8000/files/move/trash?fileKey=Main/${folderName}/${uploadFilePath}`;
  
      fetch(deleteUrl, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  
    setDeleteList((prevDeleteList) => [...prevDeleteList, ...deletedItems]);
    parentchange({ target: { checked: false } });
    setChildChecked({});
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
      filteredRestoredImages.forEach((item) => {
        const uploadFilePath = item.fileName; // 파일 경로 인코딩
        const deleteUrl = `http://18.234.144.161:8080/trash/restore/trash/Main/${folderName}/${uploadFilePath}`;
      
        fetch(deleteUrl, {
          method: 'DELETE',
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
      });
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
      filteredRestoredDocuments.forEach((item) => {
        const uploadFilePath = item.fileName; // 파일 경로 인코딩
        const deleteUrl = `http://18.234.144.161:8080/trash/restore/trash/Main/${folderName}/${uploadFilePath}`;
      
        fetch(deleteUrl, {
          method: 'DELETE',
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
      });
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

  const handleUpload = (file) => {
    const formData = new FormData();
    formData.append('dir', `Main/${folderName}/`);
    formData.append('file', file);
  
    fetch('http://35.78.185.19:8000/files/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          console.log("response!:", response);
          const fileName = file.name;
          fetch(`http://35.78.185.19:8000/files/download?fileName=Main/${encodeURIComponent(folderName)}/${encodeURIComponent(fileName)}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((response) => {
              if (response.ok) {
                console.log(response);
                return response.json();
              } else {
                throw new Error('Failed to fetch download URL.');
              }
            })
            .then((data) => {
              console.log('Download URL:', data.Message);
              const downloadUrls = data.Message.map((item) => item.download);
              console.log('Download URLs:', downloadUrls[0]);
              const download = downloadUrls[0];
  
              if (file.name.includes('.PNG') || file.name.includes('.JPG')) {
                const newImageData = {
                  url: download,
                  fileName: fileName,
                  fileSize: download.size,
                  imgKey: `img-${Date.now()}`,
                };
                setImageUrls((prevUrls) => [...prevUrls, newImageData]);
              } else if (
                file.name.includes('.pdf') ||
                file.name.includes('.doc') ||
                file.name.includes('.docx') ||
                file.name.includes('.xls') ||
                file.name.includes('.xlsx') ||
                file.name.includes('.csv') ||
                file.name.includes('.ppt') ||
                file.name.includes('.pptx')
              ) {
                const documentData = {
                  url: download,
                  fileName: fileName,
                  fileSize: download.size,
                  docKey: `doc-${Date.now()}`,
                };
                setDocumentUrls((prevUrls) => [...prevUrls, documentData]);
              }
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        } else {
          throw new Error('Failed to upload file.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleDownload = () => {
    const checkedKeys = Object.keys(childChecked).filter((key) => childChecked[key].checked);
  
    checkedKeys.forEach((key) => {
      const imageData = imageUrls.find((image) => image.imgKey === key);
      const documentData = documentUrls.find((document) => document.docKey === key);
  
      if (imageData) {
        const fileName = imageData.fileName;
        console.log(fileName)
  
        fetch(`http://35.78.185.19:8000/files/download?fileName=Main/${encodeURIComponent(folderName)}/${encodeURIComponent(fileName)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            if (response.ok) {
              console.log(response);
              return response.json();
            } else {
              throw new Error('Failed to fetch download URL.');
            }
          })
          .then((data) => {
            console.log('Download URL:', data.Message);
            const downloadUrls = data.Message.map((item) => item.download);
            console.log('Download URLs:', downloadUrls[0]);
            const download = downloadUrls[0]
            
            const link = document.createElement('a');
            link.href = download;
            link.download = fileName;
            link.click();
            
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }

      else {
        const fileName = documentData.fileName;
        console.log(fileName)
  
        fetch(`http://35.78.185.19:8000/files/download?fileName=Main/${encodeURIComponent(folderName)}/${encodeURIComponent(fileName)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
           .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Failed to fetch download URL.');
            }
          })
          .then((data) => {
            console.log('Download URL:', data.Message);
            const downloadUrls = data.Message.map((item) => item.download);
            console.log('Download URLs:', downloadUrls[0]);
            const download = downloadUrls[0]
            
            const link = document.createElement('a');
            link.href = download;
            link.download = fileName;
            link.click();
            
          })
          .catch((error) => {
            console.error('Error:', error);
          });

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
  }, [childChecked],handleAllFilesClick,handleDeleteFilesClick);

  const container =
    window !== undefined ? () => window().document.body : undefined;


    const [showModal, setShowModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [folders, setFolders] = useState([]);
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };


    const createFolder = () => {
      if (newFolderName.trim() === "") {
        alert("폴더 이름을 입력해주세요.");
        return;
      }

      const folderName = newFolderName.trim()
    
      // 폴더 생성 경로
      const folderPath = `Maintest/${folderName}/`;
    
      // API 요청에 필요한 데이터
      const requestData = {
        path: folderPath,
      };
    
      // API 엔드포인트
      const apiUrl = "http://35.78.185.19:8000/files/folder";
    
      // API 요청 설정
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      };
    
      // API 요청 보내기
      fetch(apiUrl, requestOptions)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("폴더 생성에 실패했습니다.");
          }
        })
        .then((data) => {
          // 새로운 폴더 객체 생성
          const newFolder = {
            id: data.id, // 서버에서 할당된 폴더 ID
            name: newFolderName,
          };
    
          // 기존 폴더 목록에 새 폴더를 추가한 후, 업데이트된 폴더 목록으로 상태를 업데이트합니다.
          setFolders((prevFolders) => [...prevFolders, newFolder]);
    
          // 폴더 생성 후 입력 필드 초기화
          setNewFolderName("");
    
          // 모달 닫기
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };


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
                    <div>
                      <h2> {folderName} &nbsp;</h2>
                  </div>

                    <Upload
                      onCreateImage={handleUpload}
                      onCreateDocument={handleUpload}
                    />
  
                    <Button
                      sx={{ marginTop: 0.3, marginLeft: 1 }}
                      variant="outlined"
                      onClick={openModal}
                    >
                      새폴더
                    </Button>
  
                    {/* 모달 */}
                    {showModal && (
                      <div className="modal-overlay2">
                        <div className="modal2">
                          <div className="modal-content2">
                            <h3>새 폴더 생성</h3>
                            <input
                              type="text"
                              value={newFolderName}
                              onChange={(e) => setNewFolderName(e.target.value)}
                              placeholder="폴더 이름"
                            />
                            <button onClick={createFolder}>생성</button>
                            <button onClick={closeModal}>취소</button>
                          </div>
                        </div>
                      </div>
                    )}
  
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
          
            
            <Box>
              {selectedOption === "all" ? (
                <>
                <Box sx={{mt: 16}}>
                <div style={{display: 'flex', flexWrap: 'wrap' }}>
                {folders.map((folder) => ( //이때 이 folders 는 백에서 가지고 와서 mappping ?
                <div key={folder.name}>
                <Link to={`/${folder.name}`}>
                <img 
                key={folder.name} 
                src="/images/Folder.png" 
                alt={folder.name} 
                style={{ width: '100px', height: '100px', margin: "20px" }}
                 // 클릭 시 handleFolderClick 함수 호출
                />
                </Link>
                <p style={{textAlign: 'center'}}>{folder.name}</p> {/* 폴더 이름 표시 */}
                </div>
                 ))}
              </div>
              </Box>
  
  
                <div style={{ margin: '5px', flexBasis: '100%'}}>
                  <ImageList
                    imageUrls={imageUrls}
                    parentcheck={selfcheck}
                    childChecked={childChecked}
                    onChildCheckboxChange={handleChildCheckboxChange}
                  />
                </div>
                {/* <Divider orientation="horizontal" sx={{ borderBottom: '2px solid black' }} />  */}
                <div style={{ margin: '0px', flexBasis: '100%', paddingTop: '0', marginTop:-130 }}>
                  <DocumentList
                    documentUrls={documentUrls}
                    parentcheck={selfcheck}
                    childChecked={childChecked}
                    onChildCheckboxChange={handleChildCheckboxChange}
                  />
                </div>
              </>
            ) : selectedOption === "photo" ? (
              <Box sx={{mt: 20}}>
              <ImageList 
                imageUrls={imageUrls}
                parentcheck={selfcheck}
                childChecked={childChecked}
                onChildCheckboxChange={handleChildCheckboxChange}
              />
              </Box>
            ) : selectedOption === "documents" ? (
              <DocumentList
                documentUrls={documentUrls}
                parentcheck={selfcheck}
                childChecked={childChecked}
                onChildCheckboxChange={handleChildCheckboxChange}
              />
            ) : selectedOption === "delete" ? (
              <DeleteList
                deleteList={deleteList}
                parentcheck={selfcheck}
                childChecked={childChecked}
                onChildCheckboxChange={handleChildCheckboxChange}
              />
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
