'use client'

import { todo, userCategory } from '@prisma/client'
import TodoItem from './TodoItem'
import LoadingTodoList from './_skeletonUi/LoadingTodoList'

type Props = {
  todos: todo[]
  deleteTodo: (id: string) => void
  updateTodo: (todo: todo) => void
  categories: userCategory[]
  isLoading: boolean
  categoryNames: string[]
}

export default function TodoList({
  todos,
  deleteTodo,
  updateTodo,
  categories,
  isLoading,
  categoryNames,
}: Props) {
  type Category = {
    id: string
    userId: string
    name: string
    list: todo[]
  }

  function groupTodosByCategory(todos: todo[] = []) {
    const categoryArray = categories.reduce((acc, category) => {
      if (categoryNames.join(',').length === 0) {
        acc.push({
          id: category.id,
          userId: category.userId,
          name: category.name,
          list: [],
        })
      } else {
        if (categoryNames.join(',').includes(category.name)) {
          acc.push({
            id: category.id,
            userId: category.userId,
            name: category.name,
            list: [],
          })
        }
      }

      return acc
    }, [] as Category[])
    todos.forEach((todo) => {
      const todoItem = categoryArray.find((item) => item.name === todo.category)
      if (todoItem) {
        todoItem.list.push(todo)
      }
    })
    return categoryArray
  }
  // 카테고리별로 그룹화된 todos 데이터를 생성
  const groupedTodos = groupTodosByCategory(todos)

  const isListEmpty = todos.length === 0 ? true : false

  if (isLoading) {
    return <LoadingTodoList />
  }

  if (isListEmpty) {
    return (
      <div className="flex flex-col justify-center items-center flex-auto gap-4 w-full min-w-[300px] px-[16px] my-[16px] text-[#9ca3af] text-[20px] max-md:mt-[16px] max-md:mb-0 max-md:pb-[60px] max-md:h-[100vw]">
        <strong>항목이 없습니다.</strong>
        <p>항목을 추가해주세요.</p>
      </div>
    )
  }

  return (
    <div className="flex-auto w-full min-w-[300px] px-[16px] my-[16px] customScrollbar max-md:mt-[16px] max-md:mb-0 max-md:pb-[60px] max-md:h-[100vw]">
      {groupedTodos.map((todo) => {
        if (todo.list.length === 0) {
          return (
            <div key={todo.id} className={`flex flex-col gap-[10px] w-full`}>
              <h3 className="text-[18px] text-black font-semibold">
                {todo.name}
              </h3>
              <p className="py-[4px] px-[10px] text-[#9ca3af]">
                이 카테고리에 항목이 없습니다.
              </p>
            </div>
          )
        }
        return (
          <div key={todo.id} className={`flex flex-col gap-[10px] w-full`}>
            <h3 className="text-[18px] text-black font-semibold">
              {todo.name}
            </h3>
            <ul className="mb-[10px] flex flex-col gap-[10px]">
              {todo.list.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  deleteTodo={deleteTodo}
                  updateTodo={updateTodo}
                />
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}
