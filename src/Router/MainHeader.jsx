import { Box, Typography, Toolbar, IconButton, Button } from "@mui/material";
import { Menu } from "@mui/icons-material";
import * as React from "react";
import Searchs from "../components/Search";
import { Link } from "react-router-dom";

export default function Header({ setMobileOpen }) {
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
      <Link to="/">
        <Button variant="contained" color="inherit">
          로그아웃
        </Button>
      </Link>
    </Toolbar>
  );
}
