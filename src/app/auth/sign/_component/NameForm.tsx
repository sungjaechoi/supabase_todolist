'use client'

import { ChangeEventHandler, useState } from 'react'

type Props = {
  userName: string
  userNameError: string
  validateUserName: (name: string) => void
}

export default function NameForm({
  userName,
  userNameError,
  validateUserName,
}: Props) {
  const [isBlur, setIsBlur] = useState(false)

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    validateUserName(e.target.value)
  }

  const onBlur = () => {
    setIsBlur(true)
    validateUserName(userName)
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center p-2 border border-gray-300 rounded-lg">
        <label htmlFor="name">
          <span className="blind">name</span>
        </label>
        <input
          className="w-full h-[30px] flex-auto px-2"
          placeholder="name / Nick Name"
          id="name"
          name="name"
          type="text"
          value={userName}
          onChange={onChange}
          onBlur={onBlur}
          required
        />
        {userNameError && isBlur && (
          <span className="flex justify-start w-full mt-[5px] text-sm text-red-500">
            {userNameError}
          </span>
        )}
      </div>
      <span className="ml-3 text-sm text-gray-400">
        이름, 별칭은 3글자 이상 8글자 미만 입니다.
      </span>
    </>
  )
}
