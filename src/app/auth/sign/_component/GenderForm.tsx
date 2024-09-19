'use client'

import { UseFormRegister } from 'react-hook-form'
import { FormValues } from '../page'

type Props = {
  register: UseFormRegister<FormValues>
}

export default function GenderForm({ register }: Props) {
  return (
    <div className="flex justify-center h-[40px] border border-gray-300 rounded-lg">
      <div className="w-full relative">
        <input
          className="peer absolute left-0 top-0 w-full h-full"
          placeholder="gender"
          {...register('gender')}
          id="male"
          name="gender"
          type="radio"
          value="male"
        />
        <label
          className="w-full h-[40px] flex justify-center items-center rounded-lg cursor-pointer transition-colors duration-300 peer-checked:bg-gray-400"
          htmlFor="male"
        >
          <span className="">남성</span>
        </label>
      </div>
      <div className="w-full relative">
        <input
          className="peer absolute left-0 top-0 w-full h-full"
          placeholder="gender"
          {...register('gender')}
          id="female"
          name="gender"
          type="radio"
          value="female"
        />
        <label
          className="w-full h-[40px] flex justify-center items-center rounded-lg cursor-pointer transition-colors duration-300 peer-checked:bg-gray-400"
          htmlFor="female"
        >
          <span className="">여성</span>
        </label>
      </div>
    </div>
  )
}
