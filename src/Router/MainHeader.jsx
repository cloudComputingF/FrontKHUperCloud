import { Box, Typography, Toolbar, IconButton, Button } from "@mui/material";
import { Menu } from "@mui/icons-material";
import * as React from "react";
import Searchs from "../components/Search";
import { Link } from "react-router-dom";
export default function Header({ setMobileOpen }) {
  
  const onClickHandler = () => {
    axios.post('/logout')
        .then (response => {
          if(response.data.success){
            sessionStorage.removeItem('user_id')
             //로그아웃 성공시 로그인 페이지로 이동
            document.location.href = '/';
          } else {
            alert('로그아웃 하는데 실패했습니다.')
          }
        })
  }

  const handleLogout = async () => {
    try {
      // 액세스 토큰을 가져옴
      const accessToken = localStorage.getItem('accessToken');
  
      const response = await fetch('/oauth2/sign-out', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      });
  
      if (response.ok) {
        // 로그아웃 성공
  
        // 액세스 토큰 제거
        localStorage.removeItem('accessToken');
        document.location.href = '/';
  
        // 추가적인 처리를 진행하거나 리다이렉트 등을 수행할 수 있습니다.
      } else {
        // 로그아웃 실패
        alert('로그아웃 하는데 실패했습니다.')
      }
    } catch (error) {
      // 요청 실패
      alert('로그아웃 하는데 실패했습니다.')
    }
  };

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
        <Button onClick={handleLogout}  variant="contained" color="inherit">
          로그아웃
        </Button>
      </Link>
    </Toolbar>
  );
}
