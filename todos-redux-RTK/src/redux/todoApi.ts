import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Todo } from '~/@types/todo.type'

export const todoApi = createApi({
  reducerPath: 'todoApi',
  tagTypes: ['Todos'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders(headers) {
      headers.set('Content-Type', 'application/json')
      return headers
    }
  }),
  // keepUnusedDataFor: 5, //applied to all endpoints (default is 60s)
  endpoints: (builder) => ({
    getTodo: builder.query<Todo, string>({
      query: (todoId) => ({
        url: `/todos/${todoId}`
        // headers: {
        //   'Cache-Control': 'no-cache'
        // },
        // params: {
        //   id: todoId
        // }
      })
      // keepUnusedDataFor: 2 // applied to this endpoint
    }),
    getTodos: builder.query<Todo[], void>({
      query: () => '/todos',
      providesTags: (result) => {
        if (result) {
          return [...result.map(({ id }) => ({ type: 'Todos' as const, id })), { type: 'Todos' as const, id: 'LIST' }]
        }
        return [{ type: 'Todos', id: 'LIST' }]
      }
    }),
    addTodo: builder.mutation<Todo, Omit<Todo, 'id'>>({
      query: (body) => ({
        url: '/todos',
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }]
    }),
    updateTodo: builder.mutation<Todo, Todo>({
      query: (body) => ({
        url: `/todos/${body.id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Todos', id }]
    }),
    deleteTodo: builder.mutation<object, string>({
      query: (todoId) => ({
        url: `/todos/${todoId}`,
        method: 'DELETE'
      }),
      invalidatesTags: (_result, _error, todoId) => [{ type: 'Todos', id: todoId }]
    })
  })
})

export const { useGetTodosQuery, useAddTodoMutation, useGetTodoQuery, useUpdateTodoMutation, useDeleteTodoMutation } =
  todoApi
