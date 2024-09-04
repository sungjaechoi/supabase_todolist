'use client'

import { useRef, useState } from 'react'
import TodoInsert from './TodoInsert'
import TodoList from './TodoList'
import { useTodosContext } from './_contexts/todoContext'

import Link from 'next/link'
export default function Todo() {
  const { todos, createTodo, updataTodo, deleteTodo } = useTodosContext()

  return (
    <>
      <Link href="/login">Test</Link>
      <TodoInsert createTodo={createTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} updataTodo={updataTodo} />
    </>
  )
}
