import { AsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Todo } from '~/@types/todo.type'
import { addTodo, completedTodo, deleteTodo, getTodos, updateTodo } from './todoAsyncThunk'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

interface TodoState {
  todos: Todo[]
  editingTodo: Todo | null
  loading: boolean
}

const initialState: TodoState = {
  todos: [],
  editingTodo: null,
  loading: false
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    startEditTodo: (state, { payload: todoId }: PayloadAction<string>) => {
      state.editingTodo = state.todos.find((todo) => todo.id === todoId) || null
    },
    cancelEditTodo: (state) => {
      state.editingTodo = null
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getTodos.fulfilled, (state, { payload }) => {
        state.todos = payload
      })
      .addCase(addTodo.fulfilled, (state, { payload }) => {
        state.todos.push(payload)
      })
      .addCase(deleteTodo.fulfilled, (state, { meta: { arg: todoId } }) => {
        const todoIndexToDelete = state.todos.findIndex((todo) => todo.id === todoId)

        if (todoIndexToDelete !== -1) state.todos.splice(todoIndexToDelete, 1)

        if (state.editingTodo?.id === todoId) state.editingTodo = null
      })
      .addCase(updateTodo.fulfilled, (state, { payload }) => {
        state.todos.find((todo, index) => {
          if (todo.id === payload.id) {
            state.todos[index] = payload
            return true
          }
          return false
        })
        state.editingTodo = null
      })
      .addCase(completedTodo.fulfilled, (state, { payload }) => {
        state.todos.some((todo) => {
          if (todo.id === payload.id) {
            todo.done = !todo.done
            return true
          }
          return false
        })
      })
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true
        }
      )
      .addMatcher<RejectedAction>(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          if (!action.meta.aborted) {
            state.loading = false
          }
        }
      )
      .addMatcher<FulfilledAction>(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.loading = false
        }
      )
  }
})

export const { startEditTodo, cancelEditTodo } = todoSlice.actions
export default todoSlice.reducer
