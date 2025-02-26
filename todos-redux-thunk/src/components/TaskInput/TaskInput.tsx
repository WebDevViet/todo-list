import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '~/redux/store'
import { addTodo, updateTodo } from '~/redux/todoAsyncThunk'
import { cancelEditTodo } from '~/redux/todoSlice'
import styles from './taskInput.module.scss'

export default function TaskInput() {
  const [name, setName] = useState('')
  const editingTodo = useSelector((state: RootState) => state.todo.editingTodo)
  const dispatch = useAppDispatch()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!name.trim()) return alert('Please enter a caption')

    try {
      if (editingTodo) {
        await dispatch(updateTodo({ ...editingTodo, name })).unwrap()
      } else {
        await dispatch(addTodo({ name, done: false })).unwrap()
      }
    } catch (error) {
      alert(error)
    }

    setName('')
  }

  const cancelEdit = () => {
    if (editingTodo) {
      dispatch(cancelEditTodo())
    }
    setName('')
  }

  useEffect(() => {
    setName(editingTodo?.name || '')
  }, [editingTodo])

  return (
    <div className='mb-2'>
      <h1 className={styles.title}>To do list</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type='text' placeholder='caption goes here' onChange={(e) => setName(e.target.value)} value={name} />
        <button title='Add'>{editingTodo ? '✅' : '➕'}</button>
        {editingTodo && <button onClick={cancelEdit}>❌</button>}
      </form>
    </div>
  )
}
