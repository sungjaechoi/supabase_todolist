'use client'

import { FormValues } from '@/model/formValues'
import { useState } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import { FiPlusCircle } from 'react-icons/fi'
import Input from './Input'
import { GiCancel } from 'react-icons/gi'
import InputErrorMessage from './InputErrorMessage'

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
    <div className="flex justify-center items-center">
      <button type="button" onClick={toogleInputfield}>
        {isToogleState ? (
          <GiCancel className="w-[30px] h-[30px]" />
        ) : (
          <FiPlusCircle className="w-[30px] h-[30px]" />
        )}
      </button>
      {isToogleState ? (
        <div className="flex relative">
          <div className="w-full p-1 ml-1 border border-gray-300 rounded-lg">
            <form
              className="flex w-full gap-1"
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
              <button type="submit" className="flex-shrink">
                <FiPlusCircle className="w-[20px] h-[20px]" />
              </button>
            </form>
          </div>
          <div className=" absolute top-8 left-2">
            <InputErrorMessage
              inputName="categorieCreate"
              formState={formState}
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}
