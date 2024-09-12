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
  updataTodo: (todo: todo) => void
}

export default function TodoItem({ todo, deleteTodo, updataTodo }: Props) {
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
    await updataTodo(next)
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
    await updataTodo(next)
    setIsEditing(false)
  }

  const toggleHandler = async () => {
    const copy = JSON.parse(JSON.stringify(todo))
    const next = { ...copy, text: copy.text, checked: !todo.checked }
    await updataTodo(next)
  }

  const keyDownCancelHandler: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Escape') {
      // ESC 키가 눌렸을 때
      cancelHandler()
    }
  }

  return (
    <div className="w-[600px] py-2 border-b flex items-center gap-3">
      <form className="flex w-[530px] flex-auto" onSubmit={formSubmitHandler}>
        <input
          id={`check_${todo.id}`}
          type="checkbox"
          checked={todo.checked as boolean}
          onChange={toggleHandler}
        />
        <label htmlFor={`check_${todo.id}`} className="flex flex-auto">
          {todo.checked ? (
            <MdOutlineCheckBox className="w-[30px] h-[30px]" />
          ) : (
            <MdOutlineCheckBoxOutlineBlank className="w-[30px] h-[30px]" />
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
              className={clsx('text-lg leading-[30px] px-2', {
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
          <button type="button" onClick={editHandler}>
            <FaRegEdit className="w-[30px] h-[30px]" />
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
    </div>
  )
}
