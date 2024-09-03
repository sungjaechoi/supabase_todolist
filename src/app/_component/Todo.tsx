'use client'

import { useRef, useState } from 'react'
import TodoInsert from './TodoInsert'
import TodoList from './TodoList'
import { useTodosContext } from './_contexts/todoContext'

export default function Todo() {
  const { todos, createTodo, updataTodo, deleteTodo } = useTodosContext()

  return (
    <>
      <TodoInsert createTodo={createTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} updataTodo={updataTodo} />
    </>
  )
}
