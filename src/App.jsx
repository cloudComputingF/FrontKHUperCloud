import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CloudIcon from '@mui/icons-material/Cloud';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
function App() {
  return (
    <Container component="main" maxWidth="md">
      <Box  width={500} height={500}
          sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
      <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
      <CloudIcon/> 
      </Avatar>
       <Typography component="h1" variant="h5">
            ID 로그인
          </Typography>
      <TextField
      margin="normal"
        required
        fullWidth
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
      margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        autoComplete="current-password"
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3,mb:2}}>
        {" "}
        로그인
      </Button>
      <Grid container >
        <Grid item xs>
          <Link>아이디/비밀번호 찾기</Link>
        </Grid>
        <Grid item xs>
          <Link>회원가입</Link>
        </Grid>
      </Grid>
      </Box>
    </Container>
  );
}

export default App;
