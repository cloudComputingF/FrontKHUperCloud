import {
  Mail,
  Cloud,
  FolderOpen,
  Description,
  FolderSpecial,
  DeleteForever,
  Photo,
  LiveTv,
} from "@mui/icons-material";
import {
  Typography,
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

const SideBar = (
  <>
    <Link
      to="/"
      style={{
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        color: "black",
        width: "100px",
        height: "150px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: 20,
          marginTop: -15,
        }}
      >
        <Cloud
          style={{
            width: "100px",
            height: "100px",
            marginTop: 7,
          }}
        />
        <Typography variant="h15" style={{ marginTop: 10, marginLeft: "7px" }}>
          KHUper CLOUD
        </Typography>
      </div>
    </Link>
    <Toolbar sx={{ mt: -8 }} />
    <Divider />
    <List>
      {/*모든파일*/}
      <ListItem disablePadding sx={listItemStyle}>
        <ListItemButton sx={{ py: "7px" }}>
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
        <ListItemButton sx={{ py: "7px" }}>
          <ListItemIcon>
            <Photo />
          </ListItemIcon>
          <ListItemText
            primary="사진"
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
      {/*문서*/}
      <ListItem disablePadding sx={listItemStyle}>
        <ListItemButton sx={{ py: "7px" }}>
          <ListItemIcon>
            <Description />
          </ListItemIcon>
          <ListItemText
            primary="문서"
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
        <ListItemButton sx={{ py: "7px" }}>
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
export default SideBar;
