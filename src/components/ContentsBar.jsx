import { Mail,Cloud,FolderOpen,Description,FolderSpecial } from "@mui/icons-material";
import { Typography, Toolbar, Divider,List,ListItem,ListItemButton,ListItemIcon,ListItemText} from "@mui/material";



const listItemStyle = {
    display: "flex",
    alignItems: "center",
  };

const ContentsBar = (
    <div>
      <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
        <Cloud style={{ width: "100px", height: "80px", margin: "0" }} />
        <Typography variant="h15" style={{ marginLeft: "0px" }}>
          KHUper
          Cloud
        </Typography>
      </div>
      <Toolbar sx={{ mt: -8 }} />
      <Divider />
      <List >
        {["모든파일", "사진", "동영상", "문서"].map((text, index) => (
          <ListItem key={text} disablePadding sx={listItemStyle}>
            <ListItemButton sx={{ py: "7px" }}>
              <ListItemIcon>
                {index % 2 === 0 ? <FolderOpen /> : <Description />}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ textAlign: "center",marginLeft: "-32px"}}  />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["즐겨찾기", "공유"].map((text, index) => (
          <ListItem key={text} disablePadding sx={listItemStyle}>
            <ListItemButton sx={{ py: "8px" }}>
              <ListItemIcon>
                {index % 2 === 0 ? <FolderSpecial /> : <Mail />}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ textAlign: "center",marginLeft: "-32px" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
export default ContentsBar;
