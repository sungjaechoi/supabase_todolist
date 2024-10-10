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
  categoryNames,
  categories,
}: Props) {
  // 카테고리별로 그룹화된 todos 데이터를 생성
  const groupedTodos = groupTodosByCategory(todos)
  return (
    <>
      {categories
        .map((c) => c.name)
        .map((category) =>
          groupedTodos[category] ? (
            <div key={category}>
              <h3>{category}</h3>
              <ul>
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
    </>
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
