// Reducer : 이전 state과 action으로 nextState으로 만듬
import {
    LOGIN_USER, REGISTER_USER, LOGOUT_USER, AUTH_USER
} from '../_actions/types';

export default function (state = {}, action) { // 현재 state은 비어있는 상태
    switch (action.type) { // 다른 타입이 올 때마다 다른 조치를 취해줘야 하기 때문에 스위치문을 사용
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload } // ...state : 빈 상태를 나타냄 => 현 상태를 그대로 가져옴
            break;

        case REGISTER_USER:
            return { ...state, register: action.payload }
            break;    
        
        case LOGOUT_USER:
            return { ...state, logoutSuccess: action.payload }
            break;    
        
        case AUTH_USER:
            return { ...state, userData: action.payload }
            break;        

        default:
            return state; 
    }
}

