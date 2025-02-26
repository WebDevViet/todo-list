import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface TodoState {
  editingTodoId: string
}

const initialState: TodoState = {
  editingTodoId: ''
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    startEditTodo: (state, { payload: todoId }: PayloadAction<string>) => {
      state.editingTodoId = todoId
    },
    cancelEditTodo: (state) => {
      state.editingTodoId = ''
    }
  }
})

export const { startEditTodo, cancelEditTodo } = todoSlice.actions
export default todoSlice.reducer
