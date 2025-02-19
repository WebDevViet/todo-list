import { configureStore } from '@reduxjs/toolkit'
import todoSlice from './todoSlice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    todo: todoSlice
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
