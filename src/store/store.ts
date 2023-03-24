import { configureStore } from '@reduxjs/toolkit'
import  weatherStatus  from './configure/counterSlice'
export default configureStore({
  reducer: {
    weatherStatus : weatherStatus
  }
})