'use client'
import TodoInsert from './TodoInsert'
import TodoList from './TodoList'
import { useTodosContext } from './_contexts/todoContext'

export default function Todo() {
  const {
    todos,
    isLoading,
    categoryNames,
    createTodo,
    updateTodo,
    deleteTodo,
    categories,
  } = useTodosContext()
  return (
    <div className="flex flex-col w-full h-full bg-white rounded-[8px] max-md:rounded-none max-md:rounded-b-[8px]">
      <TodoInsert createTodo={createTodo} categories={categories} />
      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
        categoryNames={categoryNames}
        categories={categories}
        isLoading={isLoading}
      />
    </div>
  )
}
