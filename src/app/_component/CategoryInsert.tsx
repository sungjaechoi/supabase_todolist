'use client'

import { FormValues } from '@/model/formValues'
import { useState } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import Input from './Input'
import InputErrorMessage from './InputErrorMessage'
import { MdAdd } from 'react-icons/md'

type Props = {
  createCategorie: (name: string) => void
}

export default function CategoryInsert({ createCategorie }: Props) {
  const {
    register,
    handleSubmit,
    formState,
    watch,
    reset,
  }: UseFormReturn<FormValues> = useForm<FormValues>({ mode: 'onChange' })

  const [isToogleState, setIsToogleState] = useState(false)

  const toogleInputfield = () => {
    setIsToogleState((prev) => !prev)
  }

  const value = watch('categorieCreate')

  const onSubmit = () => {
    createCategorie(value)
    reset({ categorieCreate: '' })
    setIsToogleState(false)
  }

  return (
    <div className="w-full py-[16px]">
      <div className="flex flex-col relative w-full px-[16px]">
        <div className="w-full py-1 border border-solid border-[#f2f3f7] bg-[#f2f3f7] rounded-[8px]">
          <form
            className="flex w-full gap-1 mr-[10px] "
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              inputName="categorieCreate"
              inputType="text"
              placeholder="카테고리를 입력하세요"
              register={register}
              fieldoptions={{
                required: '카테고리를 입력하세요',
              }}
            />
            <button type="submit" className="mr-2">
              <MdAdd className="w-[20px] h-[20px]" />
            </button>
          </form>
        </div>
        <div className=" absolute top-[33px] left-[15px]">
          <InputErrorMessage
            inputName="categorieCreate"
            formState={formState}
          />
        </div>
      </div>
    </div>
  )
}
