import React, { useState } from 'react';
import "./SignUp.css"

function SignupForm() {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');
  const [root, setRoot] = useState('');
  const [code, setCode] = useState('');
  const [agreement, setAgreement] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
        event.stopPropagation();
        alert("입력을 확인해주세요.")
    } 
    else if (password !== password1){
        alert('비밀번호와 비밀번호 확인이 같지 않습니다.')
        }
    
    else {

      console.log('Form submitted:', {
        name,
        nickname,
        email,
        password,
        password1,
        root,
        code,
        agreement,
      }); //백엔드 DB로 넘겨줄 것들

    }
    setValidated(true);
  };

  return (
    
  
    <div className="container">
      <div className="SignUpImage">
      <img src="/images/Logo.PNG" alt="Cloud Icon" />
      </div>
      <div className="input-form-backgroud row">
        <div className="input-form col-md-12 mx-auto">
          <h4 className="mb-3">회원가입</h4>
          <form className={validated ? 'was-validated' : ''} noValidate onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="name">이름</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder=""
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <div className="invalid-feedback">이름을 입력해주세요.</div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="nickname">아이디</label>
                <input
                  type="text"
                  className="form-control"
                  id="nickname"
                  placeholder=""
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  required
                />
                <div className="invalid-feedback">아이디를 입력해주세요.</div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="email">이메일</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="invalid-feedback">이메일을 입력해주세요.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="invalid-feedback">비밀번호를 입력해주세요.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="password1">비밀번호 확인</label>
              <input
                type="password"
                className="form-control"
                id="password1"
                placeholder="비밀번호를 다시 입력하세요"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
                required
              />
              <div className="invalid-feedback">비밀번호를 다시 입력해주세요.</div>
            </div>
            <hr className="mb-4" />
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="aggrement"
                checked={agreement}
                onChange={(e) => setAgreement(e.target.checked)}
                required
              />
              <label className="custom-control-label" htmlFor="aggrement">
                개인정보 수집 및 이용에 동의합니다.
              </label>
            </div>
            <div className="mb-4"></div>
            <button className="btn btn-primary btn-lg btn-block" type="submit">회원가입</button>
          </form>
        </div>
      </div>
    </div>
  );

}


export default SignupForm;