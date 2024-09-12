'use client'

import Link from 'next/link'
import { ChangeEventHandler, useState } from 'react'

type Props = {
  email: string
  validateEmail: (email: string) => void
  emailDuplicationMessage: string
  emailDuplicationCheck: (email: string) => void
  isEmailDuplication: boolean
  isEmailValdateCompleate: boolean
  emailError: string
}

export default function EmailForm({
  email,
  validateEmail,
  emailDuplicationCheck,
  isEmailDuplication,
  isEmailValdateCompleate,
  emailError,
  emailDuplicationMessage,
}: Props) {
  const [isBlur, setIsBlur] = useState(false)

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    validateEmail(e.target.value)
  }

  const onBlur = () => {
    setIsBlur(true)
    validateEmail(email)
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full p-2 border border-gray-300 rounded-lg">
        <label htmlFor="email">
          <span className="blind">email</span>
        </label>
        <div className="flex w-full">
          <input
            className="h-[30px] w-full flex-auto px-2"
            placeholder="username@email"
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={onChange}
            onBlur={onBlur}
            required
          />
          <button
            type="button"
            className="flex-initial w-[100px] h-[30px] px-1 border border-gray-500 rounded-lg border-solid"
            disabled={isEmailValdateCompleate}
            onClick={async () => {
              emailDuplicationCheck(email)
            }}
          >
            중복 검사
          </button>
        </div>
      </div>
      {emailError && isBlur && (
        <span className="flex justify-start w-full mt-[5px] text-sm text-red-500">
          {emailError}
        </span>
      )}
      {emailDuplicationMessage && (
        <span className="flex justify-start w-full mt-[5px] text-sm text-blue-500">
          {emailDuplicationMessage}
        </span>
      )}
      {isEmailDuplication ? (
        <div className="flex flex-col gap-2">
          <span className="flex justify-center items-center h-[30px] text-center text-red-500 ">
            이미 사용중인 이메일 입니다.
          </span>
          <span className="flex justify-center items-center h-[30px] text-center text-blue-500 ">
            회원 이시라면 로그인 화면으로 돌아가세요.
          </span>
          <Link
            className="h-[40px] flex justify-center items-center border border-gray-300 rounded-lg border-solid"
            href={'auth/login'}
          >
            Go Login
          </Link>
        </div>
      ) : null}
    </>
  )
}
