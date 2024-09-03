'use client'
import { useState } from 'react'
import { MdAdd } from 'react-icons/md'

type Props = {
  createTodo: (text: string) => void
}

export default function TodoInsert({ createTodo }: Props) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    if (e.target.value.trim() !== '') {
      setError('')
    }
  }

  const click = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (value.trim() === '') {
      setError('할 일을 입력하세요.') // 에러 메시지 설정
      return
    }
    createTodo(value)
    setValue('')
    setError('')
  }
  return (
    <div className="px-3 py-2 mb-5 border border-gray-300 rounded-lg relative">
      <form className="flex w-[600px]">
        <input
          className="h-[30px] flex-auto"
          placeholder="할 일을 입력하세요"
          value={value}
          onChange={change}
        />
        <button type="submit" className="flex-shrink" onClick={click}>
          <MdAdd className="w-[30px] h-[30px]" />
        </button>
      </form>
      {error && (
        <p className="text-red-500 text-sm mt-2 absolute top-10 left-2">
          {error}
        </p>
      )}
    </div>
  )
}
