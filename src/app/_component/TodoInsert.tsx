'use client'
import { useState } from 'react'
import { MdAdd } from 'react-icons/md'

type Props = {
  insert: (text: string) => void
}

export default function TodoInsert({ insert }: Props) {
  const [value, setValue] = useState('')

  const change = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value)

  const click = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    insert(value)
    setValue('')
  }
  return (
    <div className="px-3 py-2 mb-5 border border-gray-300 rounded-lg">
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
    </div>
  )
}
