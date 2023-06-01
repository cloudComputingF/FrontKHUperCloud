import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

function SignupForm() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [agreement, setAgreement] = useState(false);
  const [validated, setValidated] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
/*
  const onClickSubmit = () => {
    axios
      .post("http://43.207.224.148:8000/api/register/local", {
        userId: id,
        password: password,
        username: name,
        email: email,
      })
      .then(function (response) {
        if (response.data.code == 0) {
          setPopup({
            open: true,
            title: "Confirm",
            message: "Join Success!",
            callback: function () {
              navigate("/login");
            },
          });
        } else {
          let message = response.data.message;
          if (response.data.code == 10000) {
            message =
              "User ID is duplicated. Please enter a different User ID. ";
          }
          setPopup({
            open: true,
            title: "Error",
            message: message,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
*/
{/*API 명세 보고 수정*/}
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const formData = {
      userId: form.get("id"),
      password: form.get("password"),
      username: form.get("name"),
      email: form.get("email"), 
    };
    if (password !== password1) {
      alert("비밀번호와 비밀번호 확인이 같지 않습니다.");
    } else {

      fetch("http://43.207.224.148:8000/api/register/local", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            setIsLoggedIn(true); // 로그인 상태를 변경
            localStorage.setItem("isLoggedIn", "true"); // 로그인 상태를 로컬 스토리지에 저장
            return response.json(); // Parse response body as JSON
          } else {
            throw new Error("회원 가입에 실패했습니다");
          }
        })
        .then((data) => {
          navigate("/", { state: { pk: data.pk } });  // 상태 넘겨주기
        })
        .catch((error) => {
          // 오류 처리
          console.error("Error:", error);
        });
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
          <form
            className={validated ? "was-validated" : ""}
            noValidate
            onSubmit={handleSubmit}
          >
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
                <label htmlFor="id">아이디</label>
                <input
                  type="text"
                  className="form-control"
                  id="id"
                  placeholder=""
                  value={id}
                  onChange={(e) => setId(e.target.value)}
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
              <div className="invalid-feedback">
                비밀번호를 다시 입력해주세요.
              </div>
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
            <button className="btn btn-primary btn-lg btn-block" type="submit">
              회원가입
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
