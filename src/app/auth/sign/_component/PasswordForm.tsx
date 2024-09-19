'use client'

import { ChangeEventHandler, useState } from 'react'
import { FormState, UseFormRegister, UseFormWatch } from 'react-hook-form'
import { FormValues } from '../page'

type Props = {
  register: UseFormRegister<FormValues>
  formState: FormState<FormValues>
  watch: UseFormWatch<FormValues>
}

export default function PasswordForm({
  register,
  formState: { errors, touchedFields, isValid },
  watch,
}: Props) {
  const password = watch('password')

  return (
    <>
      <div className="flex flex-col justify-center items-center p-2 border border-gray-300 rounded-lg">
        <label htmlFor="password">
          <span className="blind">password</span>
        </label>
        <input
          className="w-full h-[30px] flex-auto px-2"
          type="password"
          placeholder="password"
          {...register('password', {
            required: '비밀번호는 필수 입력 항목 입니다.',
            minLength: {
              value: 6,
              message: '비밀번호는 6자 이상이어야 합니다.',
            },
          })}
        />
      </div>
      <div className="flex flex-col justify-center items-center p-2 border border-gray-300 rounded-lg">
        <label htmlFor="password">
          <span className="blind">password 확인</span>
        </label>
        <input
          className="w-full h-[30px] flex-auto px-2"
          type="password"
          placeholder="retype password"
          {...register('passwordReType', {
            validate: (valus) =>
              valus === password || '비밀번호가 일치하지 않습니다.',
          })}
        />
        {touchedFields.password && errors.password && (
          <span className="flex justify-start w-full mt-[5px] text-sm text-red-500">
            {errors.password.message}
          </span>
        )}
        {touchedFields.passwordReType && errors.passwordReType && (
          <span className="flex justify-start w-full mt-[5px] text-sm text-red-500">
            {errors.passwordReType.message}
          </span>
        )}
      </div>
      <span className="ml-3 text-sm text-gray-400">
        비밀 번호는 6자 이상입니다.
      </span>
    </>
  )
}
