'use client'

import { useRef, useState } from 'react'
import TodoInsert from './TodoInsert'
import TodoItem from './TodoItem'
import TodoList from './TodoList'

export type Todo = {
  id: string
  text: string
  checked: boolean
}

export default function Todo() {
  const [todos, setTodos] = useState<Todo[]>([])

  const nextId = useRef(4)

  const insert = (text: string) => {
    const todo = {
      id: nextId.current.toString(),
      text,
      checked: false,
    }
    setTodos([...todos, todo])
    nextId.current += 1
  }

  const remove = (id: string) => {
    setTodos(
      todos.filter((todo) => {
        return todo.id !== id
      }),
    )
  }

  const toggle = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      ),
    )
  }

  return (
    <>
      <TodoInsert insert={insert} />
      <TodoList todos={todos} toggle={toggle} remove={remove} />
    </>
  )
}
