'use client'
import TodoInsert from './TodoInsert'
import TodoList from './TodoList'
import { useTodosContext } from './_contexts/todoContext'

export default function Todo() {
  const {
    todos,
    categoryNames,
    createTodo,
    updateTodo,
    deleteTodo,
    categories,
  } = useTodosContext()
  return (
    <div className="">
      <TodoInsert createTodo={createTodo} categories={categories} />
      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
        categoryNames={categoryNames}
        categories={categories}
      />
    </div>
  )
}
