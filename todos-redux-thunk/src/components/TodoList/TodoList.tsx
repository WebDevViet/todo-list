import TaskInput from '@/TaskInput'
import TaskList from '@/TaskList'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '~/redux/store'
import styles from './todoList.module.scss'
import { useEffect } from 'react'
import { getTodos } from '~/redux/todoAsyncThunk'

export default function TodoList() {
  const todos = useSelector((state: RootState) => state.todo.todos)
  const dispatch = useAppDispatch()

  const doneTaskList = todos.filter((task) => task.done)
  const notDoneTaskList = todos.filter((task) => !task.done)

  useEffect(() => {
    const controller = dispatch(getTodos())
    return () => {
      controller.abort()
    }
  }, [dispatch])

  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput />
        <TaskList todos={notDoneTaskList} />
        <TaskList todos={doneTaskList} doneTaskList />
      </div>
    </div>
  )
}
