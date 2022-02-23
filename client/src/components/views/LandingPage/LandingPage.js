import React, { useEffect } from 'react'
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../_actions/user_action';
import { useDispatch } from 'react-redux';
import Auth from '../../../hoc/auth';


function LandingPage() {

    useEffect(() => {
        axios.get('/api/hello')
        .then(response => console.log(response.data))
    }, [])

let navigate = useNavigate();    
const dispatch = useDispatch();

const onClickHandler = () => {
  dispatch(logoutUser())
  .then(response => {
    console.log(response);
     if(response.payload.success) {
       navigate('/login')
     } else {
       alert('로그아웃 하는데 실패했습니다.')
     }
  }).catch(err => console.log(err));
}
  return (
    <div style ={{
      display: 'flex', justifyContent: 'center', alignItems: 'center'
      , width: '100%', height: '100vh'
    }}>
    <h2>시작 페이지</h2>

    <button onClick={onClickHandler}>
        로그아웃
    </button>
    </div>
  )
}

export default Auth(LandingPage, null);