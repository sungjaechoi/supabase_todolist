'use client'

import Link from 'next/link'
import { useState } from 'react'
import { FormState, UseFormRegister, UseFormWatch } from 'react-hook-form'
import { FormValues } from '../page'
import DuplicationMessage from './DuplicationMessage'
import EmailErrorMessage from './EmailErrorMessage'

type Props = {
  register: UseFormRegister<FormValues>
  formState: FormState<FormValues>
  watch: UseFormWatch<FormValues>
  emailDuplicationCheck: (email: string) => void
  isDuplicationPass: boolean
  emailDuplicationMessage: string
  setIsDuplicationPass: (boolean: boolean) => void
}

export default function EmailForm({
  register,
  watch,
  formState: { errors, touchedFields },
  emailDuplicationCheck,
  isDuplicationPass,
  setIsDuplicationPass,
}: Props) {
  const emailValue = watch('email')
  const [isKeypress, setIsKeypress] = useState(false)
  const [isChecked, setIsChecked] = useState(false)

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
            onKeyUp={() => {
              if (!isKeypress) setIsKeypress(true)
            }}
            type="email"
            {...register('email', {
              required: '이메일은 필수 입력 항목입니다.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: '올바른 이메일 형식이 아닙니다.',
              },
              onChange: () => {
                setIsDuplicationPass(false)
                setIsChecked(false)
              },
            })}
          />
          <button
            type="button"
            className={`${
              isKeypress && errors.email === undefined
                ? 'bg-green-500'
                : 'bg-red-500'
            } flex-initial w-[100px] h-[30px] px-1 border border-gray-500 rounded-lg border-solid`}
            disabled={errors.email !== undefined}
            onClick={async () => {
              emailDuplicationCheck(emailValue)
              setIsChecked(true)
            }}
          >
            중복 검사
          </button>
        </div>
      </div>
      <EmailErrorMessage touchedFields={touchedFields} errors={errors} />
      <DuplicationMessage isDuplication={isChecked && !isDuplicationPass} />
      {/* {emailDuplicationMessage && (
        <span className="flex justify-start w-full mt-[5px] text-sm text-blue-500">
          {emailDuplicationMessage}
        </span>
      )} */}

      {isDuplicationPass && (
        <span className="flex justify-start w-full mt-[5px] text-sm text-blue-500">
          사용 가능한 이메일 입니다.
        </span>
      )}
    </>
  )
}
