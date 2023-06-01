import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
export interface UserState {
  email: string | undefined
}

// Define the initial state using that type
const initialState: UserState = {
  email: undefined
}

export const userSlice = createSlice({
  name: 'USER',
  initialState,
  reducers: {
    REGISTER_SUCCESS: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    }
  }
})

export const { REGISTER_SUCCESS } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type

export default userSlice.reducer