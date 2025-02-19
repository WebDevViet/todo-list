import TaskInput from '@/TaskInput'
import TaskList from '@/TaskList'
import { useSelector } from 'react-redux'
import { RootState } from '~/redux/store'
import styles from './todoList.module.scss'

export default function TodoList() {
  const todos = useSelector((state: RootState) => state.todo.todos)
  const doneTaskList = todos.filter((task) => task.done)
  const notDoneTaskList = todos.filter((task) => !task.done)

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
