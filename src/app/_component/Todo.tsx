'use client'

import { useRef, useState } from 'react'
import TodoInsert from './TodoInsert'
import TodoList from './TodoList'
import { useTodosContext } from './_contexts/todoContext'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'

export default function Todo() {
  const { todos, createTodo, updataTodo, deleteTodo } = useTodosContext()
  const client = createClient()
  // console.log(
  //   'createClient',
  //   client.auth.getUser().then((res) => {
  //     console.log(res)
  //     // client.auth.signOut()
  //   }),
  // )

  return (
    <>
      <Link href="/login">Test</Link>
      <TodoInsert createTodo={createTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} updataTodo={updataTodo} />
    </>
  )
}
