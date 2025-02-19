import { createAsyncThunk } from '@reduxjs/toolkit'
import { Todo } from '~/@types/todo.type'
import httpClient from '~/utils/httpClient'

export const getTodos = createAsyncThunk('todo/getTodos', async (_, { signal }) => {
  const response = await httpClient.get<Todo[]>('todos', { signal })
  return response.data
})

export const addTodo = createAsyncThunk('todo/addTodo', async (body: Omit<Todo, 'id'>, { signal }) => {
  const response = await httpClient.post<Todo>('todos', body, { signal })
  return response.data
})

export const deleteTodo = createAsyncThunk('todo/deleteTodo', async (todoId: string, { signal }) => {
  const response = await httpClient.delete(`todos/${todoId}`, { signal })
  return response.data
})

export const updateTodo = createAsyncThunk('todo/updateTodo', async (body: Todo, { signal }) => {
  const response = await httpClient.put<Todo>(`todos/${body.id}`, body, { signal })
  return response.data
})

export const completedTodo = createAsyncThunk('todo/completedTodo', async (todoId: string, { signal }) => {
  const response = await httpClient.patch<Todo>(`todos/${todoId}`, { done: true }, { signal })
  return response.data
})
