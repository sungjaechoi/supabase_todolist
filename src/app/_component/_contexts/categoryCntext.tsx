'use client'

import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useUserContext } from './userContext'
import {
  fetchCreateCategory,
  fetchDeleteCategoryWithTodos,
  fetchGetCategories,
  fetchUpdateCategoryWithTodos,
} from '@/app/_lib/fetchCategories'
import { userCategory } from '@prisma/client'
// Context 생성

const CategoryContext = createContext<{
  categories: userCategory[]
  categoryNames: string[]
  userId: string | undefined
  createCategory: (name: string) => void
  categoryDeleteWithTodos: (categoryId: string, categoryName: string) => void
  toggle: (category: string) => void
  clean: () => void
  categoryUdateWithTodos: (
    categoryId: string,
    categoryName: string,
    newCategoryName: string,
  ) => void
}>({
  categories: [],
  userId: '',
  categoryNames: [],
  createCategory: () => {},
  categoryDeleteWithTodos: (id: string, category: string) => {},
  toggle: (category: string) => {},
  clean: () => {},
  categoryUdateWithTodos: (
    categoryId: string,
    categoryName: string,
    newCategoryName: string,
  ) => {},
})

// 2. Provider 컴포넌트 작성
export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUserContext()
  const [userId, setUserId] = useState('')
  const [categories, setCategories] = useState<userCategory[]>([])
  const [categoryNames, setCategoryNames] = useState<string[]>([])

  useEffect(() => {
    const getCategories = async () => {
      if (user) {
        setUserId(user.id)
        const id = user.id
        const categories = (await fetchGetCategories(id)) as userCategory[]
        setCategories(categories)
      }
    }
    getCategories()
  }, [user])

  const toggle = (category: string) => {
    const hasCategory = categoryNames.includes(category)
    if (hasCategory) {
      const next = categoryNames.filter((c) => c !== category)
      setCategoryNames(next)
    } else {
      const next = [...categoryNames, category]
      setCategoryNames(next)
    }
  }

  const createCategory = async (name: string) => {
    if (user) {
      const userId = user.id
      const category = await fetchCreateCategory(userId, name)
      if (category) {
        setCategories([...categories, category])
      }
    }
  }

  const categoryDeleteWithTodos = async (
    categoryId: string,
    categoryName: string,
  ) => {
    const deleteCategoryWithTodos = await fetchDeleteCategoryWithTodos(
      userId,
      categoryId,
      categoryName,
    )
    if (deleteCategoryWithTodos) {
      const next = categories.filter((category) => category.id !== categoryId)
      setCategories(next)
    }
  }

  const categoryUdateWithTodos = async (
    categoryId: string,
    categoryName: string,
    newCategoryName: string,
  ) => {
    const udateCategoryWithTodos = await fetchUpdateCategoryWithTodos(
      userId,
      categoryId,
      categoryName,
      newCategoryName,
    )

    if (udateCategoryWithTodos) {
      const newCategory = udateCategoryWithTodos
      const targetIndex = categories.findIndex(
        (category) => category.id === categoryId,
      )
      const hasTargetIndex = targetIndex !== -1
      if (hasTargetIndex) {
        const next = [...categories]
        next[targetIndex] = newCategory
        setCategories(next)
        setCategoryNames([])
      }
    }
  }

  const clean = () => {
    setCategoryNames([])
  }

  return (
    <CategoryContext.Provider
      value={{
        categoryNames,
        categories,
        createCategory,
        userId,
        categoryDeleteWithTodos,
        toggle,
        clean,
        categoryUdateWithTodos,
      }}
    >
      {children}
    </CategoryContext.Provider>
  )
}

// 3. Custom Hook 작성 (선택 사항)
export const useCategoryContext = () => {
  const context = useContext(CategoryContext)
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider')
  }
  return context
}
