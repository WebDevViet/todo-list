import TaskInput from '@/TaskInput'
import TaskList from '@/TaskList'
import { useGetTodosQuery } from '~/redux/todoApi'
import styles from './todoList.module.scss'

export default function TodoList() {
  const { data: todos = [], isFetching } = useGetTodosQuery()

  const doneTaskList = todos.filter((task) => task.done)
  const notDoneTaskList = todos.filter((task) => !task.done)

  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput />
        <TaskList todos={notDoneTaskList} isFetching={isFetching} />
        <TaskList todos={doneTaskList} isFetching={isFetching} doneTaskList />
      </div>
    </div>
  )
}
