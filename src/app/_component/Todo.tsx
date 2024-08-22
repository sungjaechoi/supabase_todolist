'use client'

import { useRef, useState } from 'react'
import TodoInsert from './TodoInsert'
import TodoList from './TodoList'

export type Todo = {
  id: string
  text: string
  checked: boolean
}

export default function Todo() {
  const [todos, setTodos] = useState<Todo[]>([])

  const nextId = useRef(1)

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
    const targetIndex = todos.findIndex((todo) => todo.id === id)
    if (targetIndex !== -1) {
      const target = [...todos]
      target[targetIndex].checked = !target[targetIndex].checked
      setTodos(target)
    }
  }

  const update = (id: string, newText: string) => {
    const targetIndex = todos.findIndex((todo) => todo.id === id)
    console.log(targetIndex)
    if (targetIndex !== -1) {
      const next = [...todos]
      next[targetIndex].text = newText
      console.log(id, newText, next)
      setTodos(next)
    }
  }

  return (
    <>
      <TodoInsert insert={insert} />
      <TodoList todos={todos} toggle={toggle} remove={remove} update={update} />
    </>
  )
}
