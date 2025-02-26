import { Todo } from '~/@types/todo.type'
import { useAppDispatch } from '~/redux/store'
import { startEditTodo } from '~/redux/todoSlice'
import styles from './taskList.module.scss'
import { useDeleteTodoMutation, useUpdateTodoMutation } from '~/redux/todoApi'

interface TaskListProps {
  doneTaskList?: boolean
  todos: Todo[]
  isFetching: boolean
}

export default function TaskList({ doneTaskList, todos, isFetching }: TaskListProps) {
  const dispatch = useAppDispatch()
  const [deleteTodo] = useDeleteTodoMutation()
  const [updateTodo] = useUpdateTodoMutation()

  const handleStartEditTodo = (id: string) => {
    dispatch(startEditTodo(id))
  }

  const handleDeleteTodo = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return
    try {
      await deleteTodo(id).unwrap()
    } catch (error) {
      console.log('🚀 ~ handleDeleteTodo ~ error:', error)
      alert('An error occurred')
    }
  }

  const handleDoneTodo = async (task: Todo) => {
    try {
      await updateTodo({
        ...task,
        done: !task.done
      }).unwrap()
    } catch (error) {
      console.log('🚀 ~ handleDoneTodo ~ error:', error)
      alert('An error occurred')
    }
  }

  return (
    <div className='mb-2'>
      <h2 className={styles.title}>{doneTaskList ? 'Completed' : 'Not completed'}</h2>
      {isFetching && <div>Loading...</div>}
      {todos.map((task) => (
        <div className={styles.task} key={task.id}>
          <input
            title='Done'
            type='checkbox'
            className={styles.taskCheckbox}
            defaultChecked={task.done}
            onChange={() => handleDoneTodo(task)}
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
