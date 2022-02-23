import React, { useState } from 'react'
//import Axios from axios;
import { useDispatch } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import { loginUser } from '../../../_actions/user_action';
import Auth from '../../../hoc/auth';

function LoginPage(props) {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [Email, setEmail] = useState("") // state을 만들어준다.
  const [Password, setPassword] = useState("")  

  const onEmailHandler = (event) => {
    setEmail(event.target.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.target.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault(); // 페이지 리프레쉬 되는 것을 막아줌

    console.log('Email', Email)
    console.log('Password', Password)
    
    let body = {
      email: Email,
      password: Password
    }

    dispatch(loginUser(body)) // action을 취함 => user_action.js
    .then(response => {
      if(response.payload.loginSuccess) {
        //props.history.push('/')
        navigate('/')
      } else {
        alert('Error')
      }
    })     
  }

  return (
    <div style ={{
      display: 'flex', justifyContent: 'center', alignItems: 'center'
      , width: '100%', height: '100vh'
    }}>
      <form style={{ display: 'flex', flexDirection: 'column'}}
            onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default Auth(LoginPage, false);