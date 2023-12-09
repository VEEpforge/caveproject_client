import { configureStore } from '@reduxjs/toolkit'
// import { apiSlice } from '../api/apiSlice'
import authReducer from '../features/auth/authSlice'
import { setupListeners } from '@reduxjs/toolkit/query/react'


export const store = configureStore ({
    reducer: {
      auth: authReducer
    },

    // middleware: (getDefaultMiddleware) =>
    // 	getDefaultMiddleware().concat(apiSlice.middleware),
  	// devTools: true,
})