import { useSelector } from 'react-redux'
import { Todo } from '~/@types/todo.type'
import { RootState, useAppDispatch } from '~/redux/store'
import { completedTodo, deleteTodo } from '~/redux/todoAsyncThunk'
import { startEditTodo } from '~/redux/todoSlice'
import styles from './taskList.module.scss'

interface TaskListProps {
  doneTaskList?: boolean
  todos: Todo[]
}

export default function TaskList({ doneTaskList, todos }: TaskListProps) {
  const dispatch = useAppDispatch()
  const isLoading = useSelector((state: RootState) => state.todo.loading)

  const handleCompletedTodo = (id: string) => {
    dispatch(completedTodo(id))
  }

  const handleStartEditTodo = (id: string) => {
    dispatch(startEditTodo(id))
  }

  const handleDeleteTodo = (id: string, name: string) => {
    if (!confirm(`Delete todo: ${name}`)) return
    dispatch(deleteTodo(id))
  }

  return (
    <div className='mb-2'>
      <h2 className={styles.title}>{doneTaskList ? 'Completed' : 'Not completed'}</h2>
      {isLoading && <div>Loading...</div>}
      {todos.map((task) => (
        <div className={styles.task} key={task.id}>
          <input
            title='Done'
            type='checkbox'
            className={styles.taskCheckbox}
            checked={task.done}
            onChange={() => handleCompletedTodo(task.id)}
          />

          <span className={`${styles.taskName} ${doneTaskList ? styles.taskNameDone : ''}`}>{task.name}</span>

          <div className={styles.taskActions}>
            <button title='Edit' className={styles.taskBtn} onClick={() => handleStartEditTodo(task.id)}>
              🖊️
            </button>
            <button title='Delete' className={styles.taskBtn} onClick={() => handleDeleteTodo(task.id, task.name)}>
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
