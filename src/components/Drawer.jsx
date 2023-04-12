import * as React from "react";
import { Box, CssBaseline, Typography, AppBar, Toolbar, IconButton, Button, Drawer, Divider,List,ListItem,ListItemButton,ListItemIcon,ListItemText} from "@mui/material";
import { Mail,Cloud,Menu,FolderOpen,Description,FolderSpecial } from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import Upload from "./Upload";
import Checkboxes from "./CheckBox";
import Searchs from './Search'


const drawerWidth = 200;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const listItemStyle = {
    display: "flex",
    alignItems: "center",
  };

  const listItemIconStyle = {
    minWidth: "30px",
    marginRight: "10px",
  };

  const listItemTextStyle = {
    fontSize: "25px",
  };
  const drawer = (
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
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap component="div" style={{marginLeft: '-50px'}}>
            <Searchs/>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button variant="outlined" color="inherit">
            Log Out
          </Button>
        </Toolbar>
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
          {drawer}
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
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "auto",
        }}
      >
        <Box sx={{ position: "absolute", top: 80, left: 200 ,width: "100%"}}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Checkboxes />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <Divider orientation="vertical" sx={{ height: "100%" }} />
            </Box>
            <Upload/>
          </Box>
          <Divider sx={{ my: 2 }} />
        </Box>
        <Typography variant="h8" component="h4"  sx={{ mt: 30 }}>
          저장된 파일이 없습니다.
        </Typography>
      </Box>
      
      <Toolbar> </Toolbar>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
