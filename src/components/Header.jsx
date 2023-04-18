import { Box, Typography, Toolbar, IconButton, Button } from "@mui/material";
import { Menu } from "@mui/icons-material";
import * as React from "react";
import Searchs from './Search'


export default function Header({setMobileOpen}) {
  return (
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={setMobileOpen}
        sx={{ mr: 2, display: { sm: "none" } }}
      >
        <Menu />
      </IconButton>
      <Typography
        variant="h6"
        noWrap
        component="div"
        style={{ marginLeft: "-50px" }}
      >
        <Searchs />
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      <Button variant="outlined" color="inherit">
        Log Out
      </Button>
    </Toolbar>
  );
}
