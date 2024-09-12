'use client'

import { ChangeEventHandler, useState } from 'react'

type Props = {
  password: string
  passwordReType: string
  validatePassword: (password: string, passwordReType: string) => void
  passwordError: string
}

export default function PasswordForm({
  password,
  passwordReType,
  validatePassword,
  passwordError,
}: Props) {
  const [isPasswordBlur, setIsPasswordBlur] = useState(false)
  const [isPasswordCheckBlur, setIsPasswordCheckBlur] = useState(false)

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    validatePassword(e.target.value, passwordReType)
  }

  const onChangePasswordCheck: ChangeEventHandler<HTMLInputElement> = (e) => {
    validatePassword(password, e.target.value)
  }

  const onBlurPassword = () => {
    setIsPasswordBlur(true)
    validatePassword(password, passwordReType)
  }

  const onBlurPasswordCheck = () => {
    setIsPasswordCheckBlur(true)
    validatePassword(password, passwordReType)
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center p-2 border border-gray-300 rounded-lg">
        <label htmlFor="password">
          <span className="blind">password</span>
        </label>
        <input
          className="w-full h-[30px] flex-auto px-2"
          placeholder="password"
          id="password"
          name="password"
          type="password"
          value={password}
          onBlur={onBlurPassword}
          onChange={onChangePassword}
          required
        />
      </div>
      <div className="flex flex-col justify-center items-center p-2 border border-gray-300 rounded-lg">
        <label htmlFor="password-retype">
          <span className="blind">password 확인</span>
        </label>
        <input
          className="w-full h-[30px] flex-auto px-2"
          placeholder="retype password"
          id="password-retype"
          name="password-retype"
          type="password"
          value={passwordReType}
          onChange={onChangePasswordCheck}
          onBlur={onBlurPasswordCheck}
          required
        />
        {passwordError && isPasswordBlur && isPasswordCheckBlur && (
          <span className="flex justify-start w-full mt-[5px] text-sm text-red-500">
            {passwordError}
          </span>
        )}
      </div>
      <span className="ml-3 text-sm text-gray-400">
        비밀 번호는 6자 이상입니다.
      </span>
    </>
  )
}
