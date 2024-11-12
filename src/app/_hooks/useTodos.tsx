import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCategoryContext } from '../_component/_contexts/categoryCntext'
import {
  fetchCreateTodo,
  fetchDeleteTodo,
  fetchGetTodos,
  fetchUpdateTodo,
} from '../_lib/fetchTodos'
import { todo } from '@prisma/client'
import { useState } from 'react'

export default function useTodos() {
  const { categoryNames, userId, categories } = useCategoryContext()
  const categoryString = categoryNames.join(',')
  const queryClient = useQueryClient()

  const [isLoading, setIsLoading] = useState(true)
  const { data: todos } = useQuery<todo[]>({
    queryKey: ['todos', categoryString],
    queryFn: async () => {
      setIsLoading(true)
      const data = await fetchGetTodos(userId, categoryString)
      setIsLoading(false)
      return data
    },
    staleTime: 0, // 기본값 0인경우 오래된 것으로 취급 = 마운트 될때마다 데이터 패칭
    enabled: Boolean(userId), // 유저 이이디가 들어올때가지 기다려라
  })

  const mutationCreateTodo = useMutation({
    mutationFn: async ({
      text,
      category,
    }: {
      text: string
      category: string
    }) => {
      return await fetchCreateTodo(userId, text, category)
    },
    onSuccess: (newTodo) => {
      queryClient.setQueryData<todo[]>(
        ['todos', categoryString],
        (oldTodos) => {
          if (oldTodos) {
            return [...oldTodos, newTodo] // 기존 항목에 새 항목을 추가한 새 배열 반환
          } else {
            return []
          }
        },
      )
    },
    onError: (error) => {
      console.error('Failed to create todo:', error)
    },
  })

  const createTodo = (text: string, category: string) => {
    mutationCreateTodo.mutate({ text, category })
  }

  const mutationUpdateTodo = useMutation({
    mutationFn: async (todo: todo) => await fetchUpdateTodo(todo),

    onMutate: async (updateTodo) => {
      await queryClient.cancelQueries({ queryKey: ['todos', categoryString] })
      const prevTodos = queryClient.getQueryData<todo[]>([
        'todos',
        categoryString,
      ])

      if (prevTodos) {
        const targetIndex = prevTodos.findIndex(
          (todo) => todo.id === updateTodo.id,
        )
        const hasTargetIndex = targetIndex !== -1
        if (hasTargetIndex) {
          const next = [...prevTodos]
          next[targetIndex] = updateTodo
          queryClient.setQueryData<todo[]>(['todos', categoryString], next)
        }
      }

      return { prevTodos }
    },

    onError: (error, _, context) => {
      if (context?.prevTodos) {
        queryClient.setQueryData<todo[]>(
          ['todos', categoryString],
          context.prevTodos,
        )
      }
      console.error('Failed to update todo:', error)
    },
  })

  const updateTodo = (todo: todo) => {
    mutationUpdateTodo.mutate(todo)
  }

  const mutationDeleteTodo = useMutation({
    mutationFn: async (id: string) => await fetchDeleteTodo(id),
    onSuccess: (id) => {
      queryClient.setQueryData<todo[]>(
        ['todos', categoryString],
        (oldTodos) => {
          if (oldTodos) {
            return oldTodos.filter((todo) => todo.id !== id)
          } else {
            return []
          }
        },
      )
    },
    onError: (error) => {
      console.error('Failed to delete todo:', error)
    },
  })

  const deleteTodo = (id: string) => {
    mutationDeleteTodo.mutate(id)
  }

  return {
    todos,
    isLoading,
    createTodo,
    deleteTodo,
    updateTodo,
    categories,
    categoryNames,
  }
}
