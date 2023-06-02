import { AppDispatch } from '../store';
import axios from 'axios'

import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
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

