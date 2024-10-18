'use client'

import { todo, userCategory } from '@prisma/client'
import TodoItem from './TodoItem'

type Props = {
  todos: todo[]
  deleteTodo: (id: string) => void
  updateTodo: (todo: todo) => void
  categoryNames: string[]
  categories: userCategory[]
}

export default function TodoList({
  todos,
  deleteTodo,
  updateTodo,
  categories,
}: Props) {
  // 카테고리별로 그룹화된 todos 데이터를 생성
  const groupedTodos = groupTodosByCategory(todos)
  return (
    <div className="flex-auto w-full min-w-[300px] px-[16px] my-[16px] customScrollbar max-md:mt-[16px] max-md:mb-0 max-md:pb-[60px] max-md:h-[100vw]">
      {categories
        .map((c) => c.name)
        .map((category) =>
          groupedTodos[category] ? (
            <div key={category} className={`flex flex-col gap-[10px] w-full`}>
              <h3 className="text-[18px] text-black font-semibold">
                {category}
              </h3>
              <ul className="mb-[10px] flex flex-col gap-[10px]">
                {groupedTodos[category].map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    deleteTodo={deleteTodo}
                    updateTodo={updateTodo}
                  />
                ))}
              </ul>
            </div>
          ) : null,
        )}
    </div>
  )
}

// 카테고리별로 todos를 그룹화하는 함수
function groupTodosByCategory(todos: todo[]) {
  return todos.reduce((acc, todo) => {
    const category = todo.category || '' // null일 경우 'Uncategorized'로 처리
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(todo)
    return acc
  }, {} as Record<string, todo[]>)
}
