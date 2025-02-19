import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '~/redux/store'
import styles from './taskInput.module.scss'
import { addTodo, cancelEditTodo, finishEditTodo } from '~/redux/todoSlice'

export default function TaskInput() {
  const [name, setName] = useState('')
  const editingTodo = useSelector((state: RootState) => state.todo.editingTodo)
  const dispatch = useDispatch()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!name.trim()) return alert('Please enter a caption')

    if (editingTodo) {
      dispatch(finishEditTodo({ ...editingTodo, name }))
    } else {
      dispatch(addTodo(name))
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
