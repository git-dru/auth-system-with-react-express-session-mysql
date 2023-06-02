import { AppDispatch } from '../store';
import axios from 'axios'

import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,

  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL
} from '../types/user';

import { BASE_URL } from '../../config';
// register
export const register = (username:string, email:string, password:string) => async (dispatch:AppDispatch) => {

  try {
      dispatch({ type: USER_REGISTER_REQUEST })

      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      }
      const { data } = await axios.post(`${BASE_URL}/api/user/register/`,
          { 'username': username, 'email': email, 'password': password },
          config
      )
      
      dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: data.result.email
      })
      
  }
  catch (error) {
      dispatch({
          type: USER_REGISTER_FAIL,
      })
  }
}

export const login = (email:string, password:string) => async (dispatch:AppDispatch) => {
    console.log(email)

    try {
        dispatch({ type: USER_LOGIN_REQUEST })
  
        const { data } = await axios.post(`${BASE_URL}/api/user/login/`,
            { 'email': email, 'password': password },
            {withCredentials: true}
        )

        console.log(data)
        
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data.result.email
        })
    }
    catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
        })
    }
  }
  