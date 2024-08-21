import { MdDelete } from 'react-icons/md'
import { MdCheckBoxOutlineBlank } from 'react-icons/md'
import { ImCheckboxChecked } from 'react-icons/im'
import { FaRegEdit } from 'react-icons/fa'
import { Todo } from './Todo'

type Props = {
  todo: Todo
  remove: (id: string) => void
  toggle: (id: string) => void
}

export default function TodoItem({ todo, remove, toggle }: Props) {
  // const onRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   remove(todo.id)
  // }
  return (
    <div className="py-2 border-b flex items-center gap-3">
      <form className="flex w-[530px]">
        <input
          id={`check_${todo.id}`}
          type="checkbox"
          checked={todo.checked}
          onChange={() => {
            toggle(todo.id)
            console.log(todo.checked)
          }}
        />
        <label htmlFor={`check_${todo.id}`} className="flex">
          {todo.checked ? (
            <ImCheckboxChecked className="w-[30px] h-[30px]" />
          ) : (
            <MdCheckBoxOutlineBlank className="w-[30px] h-[30px]" />
          )}
          <span className="text-lg leading-[30px] px-2">{todo.text}</span>
        </label>
      </form>
      <button type="button">
        <FaRegEdit className="w-[25px] h-[25px]" />
      </button>
      <button
        type="button"
        onClick={() => {
          remove(todo.id)
        }}
      >
        <MdDelete className="w-[30px] h-[30px]" />
      </button>
    </div>
  )
}
