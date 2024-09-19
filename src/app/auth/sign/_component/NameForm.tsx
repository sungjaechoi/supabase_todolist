'use client'

import { FormState, UseFormRegister } from 'react-hook-form'
import { FormValues } from '../page'

type Props = {
  register: UseFormRegister<FormValues>
  formState: FormState<FormValues>
}

export default function NameForm({
  register,
  formState: { errors, touchedFields },
}: Props) {
  return (
    <>
      <div className="flex flex-col justify-center items-center p-2 border border-gray-300 rounded-lg">
        <label htmlFor="name">
          <span className="blind">name</span>
        </label>
        <input
          className="w-full h-[30px] flex-auto px-2"
          placeholder="name / Nick Name"
          type="text"
          {...register('name', {
            required: '이름은 필수 항목 입니다.',
            validate: (value) =>
              value.length < 3 ||
              value.length >= 8 ||
              '이름은 최소 3자 이상 8자 미만 입니다.',
          })}
        />
        {touchedFields.name && errors.name && (
          <span className="flex justify-start w-full mt-[5px] text-sm text-red-500">
            {errors.name.message}
          </span>
        )}
      </div>
      <span className="ml-3 text-sm text-gray-400">
        이름, 별칭은 3글자 이상 8글자 미만 입니다.
      </span>
    </>
  )
}
