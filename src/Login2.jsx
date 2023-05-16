// import React, { useEffect, useState } from "react";
// import styles from "./Login2.module.css"

// const User = {
//     Id: 'test2323',
//     Pw: 'test2323@@@'
// }

// const Login2 = () => {
//     const [Id, setId] = useState('');
//     const [Pw, setPw] = useState('');

//     const handleInputId = (e) => {
//         setId(e.target.value)
//     }
 
//     const handleInputPw = (e) => {
//         setPw(e.target.value)
//     }

//     // const onClickLogin = () => {
//     //     console.log('click login')
//     // }

//     const onClickConfirmButton = () => {
//         console.log(Id)
//         console.log(Pw)
//         if(Id == User.Id && Pw == User.Pw) {
//             alert('로그인에 성공했습니다');
//         } else {
//             alert('등록되지 않은 회원입니다.')
//         }
//     }

//     // useEffect(() => {
//     //     axios.get('/user_inform/login')
//     //     .then(res => console.log(res))
//     //     .catch()
//     // },
//     // // 페이지 호출 후 처음 한번만 호출될 수 있도록 [] 추가
//     // [])


//     return (
//       <div>
//         <h2>Welcome to Khuper cloud!</h2>
//         <div className="container" id="container">
//             <div class="form-container sign-in-container">
//                 <form action='#'>
//                 <h1 className={styles.h1}>Sign in</h1>
//                 <div className="social-container">
//                     <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
//                     <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
//                     <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
//                   </div>
//                   <span>or use your account</span>
//                   <input type="Id" value={Id} placeholder="Id" onChange={handleInputId} />
//                   <input type="password" value={Pw}  placeholder="Password" onChange={handleInputPw} />
//                   <a href="#">Forgot your password?</a>
//                   <button 
//                     type='button'
//                     id="signIn"
//                     onClick={onClickConfirmButton}>
//                     Sign In
//                     </button>
//                 </form>
//           </div>
//           <div className="overlay-container">
//             <div className="overlay">
//               <div className="overlay-panel overlay-left">
//               </div>
//               <div className="overlay-panel overlay-right">
//                 <h1 className={styles.h1}>KHUper CLOUD</h1>
//                 <p>Enter your personal details and start journey with us</p>
//                 <button
//                   className="ghost"
//                   id="signUp"
//                 >
//                   Sign Up
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }


// export default Login2;
