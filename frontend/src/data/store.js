import { configureStore } from '@reduxjs/toolkit'
import addressReducer from '../components/assets/addressSlice'

export default configureStore({
  reducer: {
    address: addressReducer,
  },
})