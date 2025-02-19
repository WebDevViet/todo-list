import { Todo } from '~/@types/todo.type'
import styles from './taskList.module.scss'
import { useDispatch } from 'react-redux'
import { deleteTodo, doneTodo, startEditTodo } from '~/redux/todoSlice'

interface TaskListProps {
  doneTaskList?: boolean
  todos: Todo[]
}

export default function TaskList({ doneTaskList, todos }: TaskListProps) {
  const dispatch = useDispatch()

  const handleDoneTodo = (id: string) => {
    dispatch(doneTodo(id))
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
      {todos.map((task) => (
        <div className={styles.task} key={task.id}>
          <input
            title='Done'
            type='checkbox'
            className={styles.taskCheckbox}
            checked={task.done}
            onChange={() => handleDoneTodo(task.id)}
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
