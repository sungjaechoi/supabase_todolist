import { Todo } from './Todo'
import TodoItem from './TodoItem'

type Props = {
  todos: Todo[]
  remove: (id: string) => void
  toggle: (id: string) => void
  update: (id: string, text: string) => void
}

export default function TodoList({ todos, remove, toggle, update }: Props) {
  return (
    <div className="TodoList">
      {todos.map((todo) => (
        <TodoItem
          todo={todo}
          key={todo.id}
          toggle={toggle}
          remove={remove}
          update={update}
        />
      ))}
    </div>
  )
}
