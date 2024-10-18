'use client'
import { FormValues } from '@/model/formValues'
import { Path, RegisterOptions, UseFormRegister } from 'react-hook-form'

type Props = {
  inputName: Path<FormValues>
  inputType: string
  register: UseFormRegister<FormValues>
  radioValues: string[]
  fieldoptions?: RegisterOptions<FormValues>
}

export default function InputRadio({
  inputName,
  register,
  inputType,
  fieldoptions,
  radioValues,
}: Props) {
  return (
    <>
      {
        <>
          {radioValues.map((value) => {
            return (
              <div key={value} className="w-full relative">
                <input
                  className="peer absolute left-0 top-0 w-full h-full"
                  placeholder="gender"
                  {...register(inputName, { ...fieldoptions })}
                  id={value}
                  name={inputName}
                  type={inputType}
                  value={value}
                />
                <label
                  className="w-full h-full flex justify-center items-center rounded-lg cursor-pointer transition-colors duration-300 text-gray-400 peer-checked:text-black peer-checked:bg-white"
                  htmlFor={value}
                >
                  <span className="font-semibold">{value}</span>
                </label>
              </div>
            )
          })}
        </>
      }
    </>
  )
}
