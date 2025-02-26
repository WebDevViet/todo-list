import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '~/redux/store'
import { useAddTodoMutation, useGetTodoQuery, useUpdateTodoMutation } from '~/redux/todoApi'
import { cancelEditTodo } from '~/redux/todoSlice'
import styles from './taskInput.module.scss'

export default function TaskInput() {
  const [name, setName] = useState('')
  const [addTodo] = useAddTodoMutation()
  const [updateTodo] = useUpdateTodoMutation()
  const editingTodoId = useSelector((state: RootState) => state.todo.editingTodoId)
  const {
    data: todo,
    isFetching,
    isError
  } = useGetTodoQuery(editingTodoId, {
    skip: !editingTodoId
    // refetchOnReconnect: true
    // refetchOnFocus: false,
    // refetchOnMountOrArgChange: true
    // pollingInterval: 10000 // will refetch every 10 seconds
  })

  const dispatch = useAppDispatch()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!name.trim()) return alert('Please enter a caption')

    try {
      if (editingTodoId && todo) {
        await updateTodo({ ...todo, name }).unwrap()
      } else {
        await addTodo({ name, done: false }).unwrap()
      }
    } catch (error) {
      console.log('🚀 ~ handleDeleteTodo ~ error:', error)
      alert('An error occurred')
    }

    setName('')
  }

  const cancelEdit = useCallback(() => {
    dispatch(cancelEditTodo())
    setName('')
  }, [dispatch])

  useEffect(() => {
    if (editingTodoId && todo) setName(todo.name)
  }, [todo, editingTodoId])

  useEffect(() => {
    if (isError) {
      cancelEdit()
      alert('An error occurred')
    }
  }, [isError, cancelEdit])

  return (
    <div className='mb-2'>
      <h1 className={styles.title}>To do list</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type='text' placeholder='caption goes here' onChange={(e) => setName(e.target.value)} value={name} />
        <button title='Add' disabled={isFetching}>
          {isFetching ? '🔃' : editingTodoId ? '✅' : '➕'}
        </button>
        {editingTodoId && (
          <button onClick={cancelEdit} disabled={isFetching}>
            ❌
          </button>
        )}
      </form>
    </div>
  )
}
