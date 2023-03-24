import { createSlice } from '@reduxjs/toolkit'

export const weatherStatus = createSlice({
  name: 'counter',
  initialState: {
    data : {}
  },
  reducers: {
    addWeatherStatus: (state, action ) => {
      console.log("action: ", action)
      state.data= action.payload
    },
  
  }
})

// Action creators are generated for each case reducer function
export const { addWeatherStatus, } = weatherStatus.actions

export default weatherStatus.reducer