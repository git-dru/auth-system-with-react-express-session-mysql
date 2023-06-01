import { AppDispatch } from '../store';
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from '../types/user';

import axios from 'axios'

// register
export const register = (username:string, email:string, password:string) => async (dispatch:AppDispatch) => {

  try {
      dispatch({ type: USER_REGISTER_REQUEST })

      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      }
      const { data } = await axios.post(`api/user/register/`,
          { 'username': username, 'email': email, 'password': password },
          config
      )
      dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: data
      })
  }
  catch (error) {
      dispatch({
          type: USER_REGISTER_FAIL,
      })
  }
}

