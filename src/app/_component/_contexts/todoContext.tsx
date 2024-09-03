'use client'

import {
  fetchCreateTodo,
  fetchDeleteTodo,
  fetchGetTodos,
  fetchUpdataTodo,
} from '@/app/_lib/fetchTodos'
import { Todo } from '@/model/todos'
// 1. Context 생성
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

// Context 생성
const TodosContext = createContext<{
  todos: Todo[]
  createTodo: (text: string) => void
  updataTodo: (todo: Todo) => void
  deleteTodo: (id: string) => void
}>({
  todos: [],
  createTodo: (text: string) => {},
  updataTodo: (todo: Todo) => {},
  deleteTodo: (id: string) => {},
})

// 2. Provider 컴포넌트 작성
export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    const getTodos = async () => {
      const todos = await fetchGetTodos()
      if (todos) {
        setTodos(todos)
      }
    }
    getTodos()
  }, [])

  const createTodo = async (text: string) => {
    const todo = await fetchCreateTodo(text)
    if (todo) {
      setTodos([...todos, todo])
    }
  }

  const updataTodo = async (todo: Todo) => {
    console.log('m/Todo', todo)
    const newTodo = await fetchUpdataTodo(todo)
    console.log(newTodo)
    if (newTodo) {
      const targetIndex = todos.findIndex((todo) => todo.id === newTodo.id)
      if (targetIndex !== -1) {
        const next = [...todos]
        next[targetIndex] = newTodo
        console.log(next)
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
