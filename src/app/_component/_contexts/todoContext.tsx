'use client'

import {
  fetchCreateTodo,
  fetchDeleteTodo,
  fetchGetTodos,
  fetchUpdataTodo,
} from '@/app/_lib/fetchTodos'
// 1. Context 생성
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useUserContext } from './userContext'
import { Prisma, todo } from '@prisma/client'

// Context 생성
const TodosContext = createContext<{
  todos: todo[]
  createTodo: (text: string) => void
  updataTodo: (todo: Prisma.todoUpdateInput) => void
  deleteTodo: (id: string) => void
}>({
  todos: [],
  createTodo: (text: string) => {},
  updataTodo: (todo: Prisma.todoUpdateInput) => {},
  deleteTodo: (id: string) => {},
})

// 2. Provider 컴포넌트 작성
export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUserContext()
  const [todos, setTodos] = useState<todo[]>([])

  useEffect(() => {
    const getTodos = async () => {
      if (user) {
        const userId = user.id
        const todos = await fetchGetTodos(userId)
        if (todos) {
          setTodos(todos)
        }
      }
    }
    getTodos()
  }, [user])

  const createTodo = async (text: string) => {
    if (user) {
      const userId = user.id
      console.log('userId', userId)
      const todo = await fetchCreateTodo(userId, text)
      if (todo) {
        setTodos([...todos, todo])
      }
    }
  }

  const updataTodo = async (todo: Prisma.todoUpdateInput) => {
    const newTodo = await fetchUpdataTodo(todo)
    if (newTodo) {
      const targetIndex = todos.findIndex((todo) => todo.id === newTodo.id)
      if (targetIndex !== -1) {
        const next = [...todos]
        next[targetIndex] = newTodo
        setTodos(next)
      }
    }
  }

  const deleteTodo = async (id: string) => {
    const todo = await fetchDeleteTodo(id)
    if (todo) {
      setTodos(todos.filter((todo) => todo.id !== id))
    }
  }

  return (
    <TodosContext.Provider
      value={{ todos, createTodo, updataTodo, deleteTodo }}
    >
      {children}
    </TodosContext.Provider>
  )
}

// 3. Custom Hook 작성 (선택 사항)
export const useTodosContext = () => {
  const context = useContext(TodosContext)
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider')
  }
  return context
}
