'use client'
import TodoInsert from './TodoInsert'
import TodoList from './TodoList'
import useTodos from '../_hooks/useTodos'

export default function Todo() {
  const {
    todos,
    isLoading,
    createTodo,
    deleteTodo,
    updateTodo,
    categories,
    categoryNames,
  } = useTodos()

  return (
    <div className="flex flex-col w-full h-full bg-white rounded-[8px] max-md:rounded-none max-md:rounded-b-[8px]">
      <TodoInsert createTodo={createTodo} categories={categories} />
      <TodoList
        todos={todos || []}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
        categories={categories}
        isLoading={isLoading}
        categoryNames={categoryNames}
      />
    </div>
  )
}
