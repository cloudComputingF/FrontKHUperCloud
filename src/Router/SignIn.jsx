// import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useEffect, useState } from "react";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.


const onClickLogin = () => {
    console.log('click login')
    console.log('ID : ', inputId)
    console.log('PW : ', inputPw)
    axios.post('http://43.207.224.148:8000/api/login/local', { //백으로 요청
        'user_id': id,
        'user_pw': password
    })
    .then(res => {
        console.log(res)
        console.log('res.data.userId :: ', res.data.userId) //백에서 받을 response
        console.log('res.data.msg :: ', res.data.msg)

        if(res.data.userId === undefined){
            // id 일치하지 않는 경우 userId = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
            console.log('======================',res.data.msg)
            alert('등록되지 않은 회원입니다.')
        } else if(res.data.userId === null){
            // id는 있지만, pw 는 다른 경우 userId = null , msg = undefined
            console.log('======================','입력하신 비밀번호 가 일치하지 않습니다.')
            alert('입력하신 비밀번호 가 일치하지 않습니다.')
        } else if(res.data.userId === inputId) {
            // id, pw 모두 일치 userId = userId1, msg = undefined
            console.log('======================','로그인 성공')
            sessionStorage.setItem('user_id', inputId)
        }
        // 작업 완료 되면 Main페이지 이동
        document.location.href = '/Main'
    })
    .catch()
};

//  useEffect(() => {
//      axios.get('/user_inform/login')
//      .then(res => console.log(res))
//      .catch()
//  },[])



const User = {
    Id: 'test2323',
    Pw: 'test2323@@@'
}


const defaultTheme = createTheme();

export default function SignIn() {
    const [id, setId] = useState('');
    const [password, setPw] = useState('');

    const handleInputId = (e) => {
        setId(e.target.value)
    }
 
    const handleInputPw = (e) => {
        setPw(e.target.value)
    }


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      id: data.get('id'),
      password: data.get('password'),
    });

    //현재 더미 데이터로 임의 연결, 추후 백엔드와 연결할 로직
    //로그인 아이디,비번은 상단의 유저 데이터
    if(id == User.Id && password == User.Pw) {
          document.location.href = '/Main'
        
    } else {
            alert('등록되지 않은 회원입니다.')
      }
  }; 

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
       
          <div className="SignInImage">
            <img src="/images/Logo.PNG" alt="Cloud Icon" />
          </div>
          
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}> 
            <TextField
              onChange={handleInputId}
              margin="normal"
              required
              fullWidth
              id="id"
              label="Id"
              name="id"
              autoComplete="id"
              autoFocus
            />
            <TextField
              onChange={handleInputPw}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="로그인 상태 유지"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              로그인
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  비밀번호 찾기
                </Link>
              </Grid>
              <Grid item>
                <Link href ="/SignUp" variant="body2">
                  {"회원가입"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}