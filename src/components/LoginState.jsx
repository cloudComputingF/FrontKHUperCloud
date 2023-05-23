function Loginstate () {

const [isLogin, setIsLogin] = useState(false); //로그인 관리

  useEffect(() => {
    if (sessionStorage.getItem('user_id') === null) {
      // sessionStorage 에 name 라는 key 값으로 저장된 값이 없다면
      console.log("isLogin ?? :: ", isLogin);
    } else {
      // sessionStorage 에 name 라는 key 값으로 저장된 값이 있다면
      // 로그인 상태 변경
      setIsLogin(true); // 후에 setIsLogin true면 아이디? 닉네임? 메인페이지에 뜨게 해야 함
      console.log("isLogin ?? :: ", isLogin);
    }
  })
}

export default Loginstate;