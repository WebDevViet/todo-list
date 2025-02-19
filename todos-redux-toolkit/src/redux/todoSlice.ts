import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit'
import { Todo } from '~/@types/todo.type'

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
    addTodo: {
      // prepare callback này sẽ chạy trước khi vào reducer
      prepare: (name: string) => ({
        payload: { name, id: nanoid(), done: false }
      }),
      reducer: (state, { payload }: PayloadAction<Todo>) => {
        state.todos.push(payload)
      }
    },
    startEditTodo: (state, { payload: todoId }: PayloadAction<string>) => {
      state.editingTodo = state.todos.find((todo) => todo.id === todoId) || null
    },
    cancelEditTodo: (state) => {
      state.editingTodo = null
    },
    finishEditTodo: (state, { payload }: PayloadAction<Todo>) => {
      const todoIndexToUpdate = state.todos.findIndex((todo) => todo.id === payload.id)
      if (todoIndexToUpdate !== -1) state.todos[todoIndexToUpdate] = payload
      state.editingTodo = null
    },
    doneTodo: (state, { payload: todoId }: PayloadAction<string>) => {
      state.todos.some((todo) => {
        if (todo.id === todoId) {
          todo.done = !todo.done
          return true
        }
        return false
      })
    },
    deleteTodo: (state, { payload: todoId }: PayloadAction<string>) => {
      const todoIndexToDelete = state.todos.findIndex((todo) => todo.id === todoId)

      if (todoIndexToDelete !== -1) state.todos.splice(todoIndexToDelete, 1)

      if (state.editingTodo?.id === todoId) state.editingTodo = null
    }
  }
  // extraReducers(builder) {
  //   builder
  //     .addMatcher(
  //       (action) => action.type === 'todo/addTodo', // điều kiện để chạy hàm reducer bên dưới
  //       (state, action) => {
  //         console.log('🚀 ~ addMatcher ~ state:', current(state)) // current được import từ '@reduxjs/toolkit'
  //         console.log('🚀 ~ addMatcher ~ action:', action)
  //       }
  //     )
  //     .addDefaultCase((state, action) => {
  //       // nếu không khớp action type thì sẽ tự động chạy hàm này
  //       console.log('🚀 ~ addDefaultCase ~ state:', current(state)) // current để convert state dạng proxy về obj
  //       console.log('🚀 ~ addDefaultCase ~ action:', action)
  //     })
  // }
})

export const { startEditTodo, cancelEditTodo, finishEditTodo, doneTodo, deleteTodo, addTodo } = todoSlice.actions
export default todoSlice.reducer
