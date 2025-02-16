import PropTypes from 'prop-types'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Todo } from 'src/@types/todo.type'
import { TodoTypes } from 'src/PropTypes/todo.propType'
import styles from './taskInput.module.scss'

interface TaskInputProps {
  addTodo: (name: string) => void
  editTodo: (name: string) => void
  finishEditTodo: () => void
  currentTodo: Todo | null
}

export default function TaskInput({ addTodo, currentTodo, editTodo, finishEditTodo }: TaskInputProps) {
  const [name, setName] = useState<string>('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (currentTodo) {
      finishEditTodo()
      if (name) setName('')
    } else {
      addTodo(name)
      setName('')
    }
  }

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (currentTodo) {
      editTodo(value)
    } else {
      setName(value)
    }
  }

  return (
    <div className='mb-2'>
      <h1 className={styles.title}>To do list typescript</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='caption goes here'
          value={currentTodo ? currentTodo.name : name}
          onChange={onChangeInput}
        />
        <button type='submit'>{currentTodo ? '✔️' : '➕'}</button>
      </form>
    </div>
  )
}

TaskInput.propTypes = {
  addTodo: PropTypes.func,
  editTodo: PropTypes.func,
  finishEditTodo: PropTypes.func,
  currentTodo: PropTypes.oneOfType([TodoTypes, PropTypes.oneOf([null])])
}
