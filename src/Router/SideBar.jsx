import {
  Mail,
  FolderOpen,
  Description,
  FolderSpecial,
  DeleteForever,
  Photo,
  LiveTv,
} from "@mui/icons-material";
import {
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

const listItemStyle = {
  display: "flex",
  alignItems: "center",
};

export default function SideBar({ onAllFilesClick, onPhotoClick, onDocumentsClick,onDeleteClick }){
  const handleAllFilesClick = () => {
    onAllFilesClick();
  };

  const handlePhotoClick = () => {
    onPhotoClick();
  };

  const handleDocumentsClick = () => {
    onDocumentsClick();
  };
  const handleDeleteClick=()=>{
    onDeleteClick();
  }
  return(
  <>
    <Link
      to="/"
      style={{
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        color: "black",
        width: "200px",
        height: "150px",
      }}
    >
     <img
              src="/images/Logo.PNG"
              alt="Cloud Icon"
              style={{
                width: "220px",
                height: "100px",
                marginLeft: "-0.5rem",
                fill: "black",
              }}
            />
    </Link>
    <Toolbar sx={{ mt: -8 }} />
    <Divider />
    <List>
      {/*모든파일*/}
      <ListItem disablePadding sx={listItemStyle}>
        <ListItemButton sx={{ py: "7px" }} onClick={handleAllFilesClick}>
          <ListItemIcon>
            <FolderOpen />
          </ListItemIcon>
          <ListItemText
            primary="모든파일"
            sx={{ textAlign: "center", marginLeft: "-32px" }}
          />
        </ListItemButton>
      </ListItem>
      {/*사진*/}
      <ListItem disablePadding sx={listItemStyle}>
        <ListItemButton sx={{ py: "7px" }} onClick={handlePhotoClick}>
          <ListItemIcon>
            <Photo />
          </ListItemIcon>
          <ListItemText
            primary="사진"
            sx={{ textAlign: "center", marginLeft: "-32px" }}
          />
        </ListItemButton>
      </ListItem>
      {/*문서*/}
      <ListItem disablePadding sx={listItemStyle} >
        <ListItemButton sx={{ py: "7px" }} onClick={handleDocumentsClick}>
          <ListItemIcon>
            <Description />
          </ListItemIcon>
          <ListItemText
            primary="문서"
            sx={{ textAlign: "center", marginLeft: "-32px" }}
          />
        </ListItemButton>
      </ListItem>
      {/*동영상*/}
      <ListItem disablePadding sx={listItemStyle}>
        <ListItemButton sx={{ py: "7px" }}>
          <ListItemIcon>
            <LiveTv />
          </ListItemIcon>
          <ListItemText
            primary="동영상"
            sx={{ textAlign: "center", marginLeft: "-32px" }}
          />
        </ListItemButton>
      </ListItem>
    </List>
    <Divider />
    <List>
      {/*즐겨찾기*/}
      <ListItem disablePadding sx={listItemStyle}>
        <ListItemButton sx={{ py: "7px" }}>
          <ListItemIcon>
            <FolderSpecial />
          </ListItemIcon>
          <ListItemText
            primary="즐겨찾기"
            sx={{ textAlign: "center", marginLeft: "-32px" }}
          />
        </ListItemButton>
      </ListItem>
      {/*공유*/}
      <ListItem disablePadding sx={listItemStyle}>
        <ListItemButton sx={{ py: "7px" }}>
          <ListItemIcon>
            <Mail />
          </ListItemIcon>
          <ListItemText
            primary="공유"
            sx={{ textAlign: "center", marginLeft: "-32px" }}
          />
        </ListItemButton>
      </ListItem>
      {/*휴지통*/}
      <ListItem disablePadding sx={listItemStyle}>
        <ListItemButton sx={{ py: "7px" }} onClick={handleDeleteClick}>
          <ListItemIcon>
            <DeleteForever />
          </ListItemIcon>
          <ListItemText
            primary="휴지통"
            sx={{ textAlign: "center", marginLeft: "-32px" }}
          />
        </ListItemButton>
      </ListItem>
    </List>
  </>
  );
        }

