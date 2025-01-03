'use client'
import { FormValues } from '@/model/formValues'
import { Path, RegisterOptions, UseFormRegister } from 'react-hook-form'

type Props = {
  inputName: Path<FormValues>
  inputType: string
  placeholder?: string
  inputValue?: string
  register: UseFormRegister<FormValues>
  fieldoptions?: RegisterOptions<FormValues>
  style?: string
}

export default function Input({
  inputName,
  register,
  inputType,
  placeholder,
  fieldoptions,
  inputValue,
  style,
}: Props) {
  return (
    <>
      <label className="w-full">
        <span className="blind">{inputName}</span>
        <input
          className={`w-full h-[30px] flex-auto px-2 ${style}`}
          type={inputType}
          placeholder={placeholder}
          value={inputValue || ''}
          {...register(inputName, { ...fieldoptions })}
        />
      </label>
    </>
  )
}
