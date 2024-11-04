'use client'

import {
  MdDelete,
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
  MdOutlineCancel,
} from 'react-icons/md'
import { FaRegEdit, FaRegSave } from 'react-icons/fa'
import {
  FormEventHandler,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react'
import { clsx } from 'clsx'
import { todo } from '@prisma/client'

type Props = {
  todo: todo
  deleteTodo: (id: string) => void
  updateTodo: (todo: todo) => void
}

export default function TodoItem({ todo, deleteTodo, updateTodo }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [newText, setNewText] = useState(todo.text)
  const inputRef = useRef<HTMLInputElement>(null)

  const editHandler = () => {
    setIsEditing(true)
  }

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus() // 편집 모드로 변경된 후 input에 포커스 설정
    }
  }, [isEditing]) // isEditing 상태가 변경될 때마다 실행

  const saveHandler = async () => {
    const copy = JSON.parse(JSON.stringify(todo))
    const next = { ...copy, text: newText, checked: copy.checked }
    await updateTodo(next)
    setIsEditing(false)
  }

  const cancelHandler = () => {
    setNewText(todo.text)
    setIsEditing(false)
  }

  const formSubmitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const copy = JSON.parse(JSON.stringify(todo))
    const next = { ...copy, text: newText, checked: copy.checked }
    await updateTodo(next)
    setIsEditing(false)
  }

  const toggleHandler = async () => {
    const copy = JSON.parse(JSON.stringify(todo))
    const next = { ...copy, text: copy.text, checked: !todo.checked }
    await updateTodo(next)
  }

  const keyDownCancelHandler: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Escape') {
      // ESC 키가 눌렸을 때
      cancelHandler()
    }
  }

  const keyDownEnterlHandler: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      toggleHandler()
    }
  }

  return (
    <li className="flex items-center gap-2 w-full px-[10px] py-[4px] rounded-[8px] hover:bg-[rgba(55,191,212,0.2)]">
      <form
        className="relative flex-auto flex w-full"
        onSubmit={formSubmitHandler}
      >
        <input
          className=" absolute top-[3px] left-[3px] w-6 h-6"
          id={`check_${todo.id}`}
          type="checkbox"
          checked={todo.checked as boolean}
          onChange={toggleHandler}
          onKeyDown={keyDownEnterlHandler}
        />
        <label htmlFor={`check_${todo.id}`} className="flex flex-auto">
          {todo.checked ? (
            <MdOutlineCheckBox className="min-w-[30px] min-h-[30px]" />
          ) : (
            <MdOutlineCheckBoxOutlineBlank className="min-w-[30px] min-h-[30px]" />
          )}
          {isEditing ? (
            <input
              type="text"
              value={newText as string}
              ref={inputRef}
              onChange={(e) => setNewText(e.target.value)}
              onKeyDown={keyDownCancelHandler}
              className="text-lg leading-[30px] px-2 w-full"
            />
          ) : (
            <span
              className={clsx('flex-auto text-black leading-[30px] px-2', {
                'line-through': todo.checked,
              })}
            >
              {todo.text}
            </span>
          )}
        </label>
      </form>
      {!todo.checked &&
        (isEditing ? (
          <>
            <button type="button" onClick={saveHandler} className="mr-2">
              <FaRegSave className="w-[30px] h-[30px]" />
            </button>
            <button type="button" onClick={cancelHandler}>
              <MdOutlineCancel className="w-[30px] h-[30px]" />
            </button>
          </>
        ) : (
          <button type="button" className="mr-[5px]" onClick={editHandler}>
            <FaRegEdit className="w-[25px] h-[25px]" />
          </button>
        ))}
      {todo.checked ? (
        <button
          type="button"
          onClick={() => {
            deleteTodo(todo.id)
          }}
        >
          <MdDelete className="w-[30px] h-[30px] mr-1" />
        </button>
      ) : (
        <></>
      )}
    </li>
  )
}
