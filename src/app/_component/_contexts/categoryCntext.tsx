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
import { fetchGetTodos } from '@/app/_lib/fetchTodos'

type ModalInterface = {
  categoryId: string
  category: string
  todoLength: number
}

// Context 생성
const CategoryContext = createContext<{
  isLoading: boolean
  categories: userCategory[]
  categoryNames: string[]
  userId: string
  isMenuOpen: boolean
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  modalInterface: ModalInterface
  createCategory: (name: string) => void
  categoryDeleteWithTodos: (categoryId: string, categoryName: string) => void
  toggle: (category: string) => void
  clean: () => void
  categoryUdateWithTodos: (
    categoryId: string,
    categoryName: string,
    newCategoryName: string,
  ) => void
  onModal: (userId: string, categoryId: string, category: string) => void
}>({
  categories: [],
  userId: '',
  categoryNames: [],
  isMenuOpen: false,
  isModalOpen: false,
  modalInterface: { categoryId: '', category: '', todoLength: 0 },
  isLoading: false,
  createCategory: () => {},
  categoryDeleteWithTodos: (id: string, category: string) => {},
  toggle: (category: string) => {},
  clean: () => {},
  categoryUdateWithTodos: (
    categoryId: string,
    categoryName: string,
    newCategoryName: string,
  ) => {},
  setIsMenuOpen: () => {
    false
  },
  setIsModalOpen: () => {
    false
  },
  onModal: () => {},
})

// 2. Provider 컴포넌트 작성
export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUserContext()
  const [userId, setUserId] = useState('')
  const [categories, setCategories] = useState<userCategory[]>([])
  const [categoryNames, setCategoryNames] = useState<string[]>([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalInterface, setModalInterface] = useState<ModalInterface>({
    categoryId: '',
    category: '',
    todoLength: 0,
  })
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const getCategories = async () => {
      if (user) {
        setIsLoading(true)
        setUserId(user.id)
        const id = user.id
        const categories = (await fetchGetCategories(id)) as userCategory[]
        setCategories(categories)
        setIsLoading(false)
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
      const hasCategory = categoryNames.includes(categoryName)
      if (hasCategory) {
        const next = categoryNames.filter((c) => c !== categoryName)
        setCategoryNames(next)
      }
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

  const onModal = async (
    userId: string,
    categoryId: string,
    category: string,
  ) => {
    const todos = await fetchGetTodos(userId, category)
    setIsModalOpen(true)
    if (todos) {
      const next = {
        categoryId: categoryId,
        category: category,
        todoLength: todos.length || 0,
      }
      setModalInterface(next)
    }
  }

  return (
    <CategoryContext.Provider
      value={{
        isLoading,
        onModal,
        modalInterface,
        isModalOpen,
        setIsModalOpen,
        isMenuOpen,
        setIsMenuOpen,
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
