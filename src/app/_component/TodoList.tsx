import { todo } from '@prisma/client'
import TodoItem from './TodoItem'

type Props = {
  todos: todo[]
  deleteTodo: (id: string) => void
  updataTodo: (todo: todo) => void
}

export default function TodoList({ todos, deleteTodo, updataTodo }: Props) {
  return (
    <div className="TodoList">
      {todos.map((todo) => (
        <TodoItem
          todo={todo}
          key={todo.id}
          deleteTodo={deleteTodo}
          updataTodo={updataTodo}
        />
      ))}
    </div>
  )
}
