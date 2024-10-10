'use client'

import {
  fetchCreateTodo,
  fetchDeleteTodo,
  fetchGetTodos,
  fetchUpdateTodo,
} from '@/app/_lib/fetchTodos'

import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Prisma, todo, userCategory } from '@prisma/client'
import { useCategoryContext } from './categoryCntext'

// Context 생성
const TodosContext = createContext<{
  todos: todo[]
  // selectedCategories: SelectedCategories[]
  createTodo: (text: string, category: string) => void
  updateTodo: (todo: Prisma.todoUpdateInput) => void
  deleteTodo: (id: string) => void
  categoryNames: string[]
  categories: userCategory[]
}>({
  todos: [],
  createTodo: (text: string, category: string) => {},
  updateTodo: (todo: Prisma.todoUpdateInput) => {},
  deleteTodo: (id: string) => {},
  categoryNames: [],
  categories: [],
})

// 2. Provider 컴포넌트 작성
export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const { categoryNames, userId, categories } = useCategoryContext()
  const [todos, setTodos] = useState<todo[]>([])

  useEffect(() => {
    const getTodos = async () => {
      if (userId) {
        const categoryString = categoryNames.join(',')
        const todos = await fetchGetTodos(userId, categoryString)
        if (todos) {
          setTodos(todos)
        }
      }
    }
    getTodos()
  }, [userId, categoryNames])

  const createTodo = async (text: string, category: string) => {
    if (userId) {
      const todo = await fetchCreateTodo(userId, text, category)
      if (todo) {
        setTodos([...todos, todo])
      }
    }
  }

  const updateTodo = async (todo: Prisma.todoUpdateInput) => {
    const newTodo = await fetchUpdateTodo(todo)
    if (newTodo) {
      const targetIndex = todos.findIndex((todo) => todo.id === newTodo.id)
      const hasTargetIndex = targetIndex !== -1
      if (hasTargetIndex) {
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
      value={{
        todos,
        createTodo,
        updateTodo,
        deleteTodo,
        categoryNames,
        categories,
      }}
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
