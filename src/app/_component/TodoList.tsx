import { Todo } from '@/model/todos'
import TodoItem from './TodoItem'

type Props = {
  todos: Todo[]
  deleteTodo: (id: string) => void
  updataTodo: (todo: Todo) => void
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
