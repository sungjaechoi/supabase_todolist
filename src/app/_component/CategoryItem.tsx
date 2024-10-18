'use client'

import { userCategory } from '@prisma/client'
import { useEffect, useState } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import { FormValues } from '@/model/formValues'
import { FiMoreVertical, FiSave, FiX } from 'react-icons/fi'
import { FaRegCheckCircle } from 'react-icons/fa'

type Props = {
  category: userCategory
  toggle: (category: string) => void
  isCheck: boolean
  categoryUdateWithTodos: (
    categoryId: string,
    categoryName: string,
    newCategoryName: string,
  ) => void
  onModal: (userId: string, categoryId: string, category: string) => void
}

export default function CategoryItem({
  category,
  categoryUdateWithTodos,
  toggle,
  isCheck,
  onModal,
}: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [isShowMore, setIsShowMore] = useState(false)

  useEffect(() => {
    const el = document.querySelector('#categoryEdit') as HTMLInputElement
    el && el.focus()
  }, [isEditing]) // isEditing 상태가 변경될 때마다 실행

  const { register, handleSubmit, watch, reset }: UseFormReturn<FormValues> =
    useForm<FormValues>({
      defaultValues: {
        categoryEdit: category.name,
      },
      mode: 'onChange',
    })

  const value = watch('categoryEdit')

  const onSubmit = async (data: FormValues) => {
    categoryUdateWithTodos(category.id, category.name, data.categoryEdit)
    setIsEditing(false)
  }

  return (
    <li className="relative">
      {isCheck && !isEditing && (
        <span className="absolute left-0 top-[50%] -translate-y-1/2">
          <FaRegCheckCircle className="w-[20px] h-[20px] fill-gray-400" />
        </span>
      )}
      <button
        type="button"
        className="felx justify-start items-center w-full h-[60px] pl-[30px] pr-[20px]"
        onClick={() => {
          !isEditing && toggle(category.name)
        }}
      >
        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className=" ">
              <input
                id="categoryEdit"
                className="w-full py-[4px] px-[6px] bg-[#f2f3f7] rounded-[8px]"
                type="text"
                defaultValue={value}
                {...register('categoryEdit', {
                  required: '카테고리를 입력하세요',
                })}
              />
            </label>
            <div className="flex mt-[4px] h-[25px] gap-2">
              <button
                type="button"
                className="flex justify-center items-center w-full rounded-[8px] border border-solid border-gray-400"
                onClick={() => {
                  setIsEditing(false)
                  reset({ categoryEdit: category.name })
                }}
              >
                취소
              </button>
              <button
                type="submit"
                className="flex justify-center items-center w-full rounded-[8px] text-white bg-gray-500"
              >
                수정
              </button>
            </div>
          </form>
        ) : (
          <span>
            <p className="font-semibold text-[17px] text-left break-all">
              {category.name}
            </p>
          </span>
        )}
      </button>
      {!isEditing && (
        <span className="absolute right-0 top-[50%] -translate-y-1/2 w-[30px] h-[50px]">
          <button
            type="button"
            className="w-full h-full flex justify-end items-center"
            onClick={() => {
              setIsShowMore((Prev) => !Prev)
            }}
          >
            <FiMoreVertical className="h-[20px] w-[20px]" />
          </button>
        </span>
      )}
      {isShowMore && (
        <div className="absolute right-[17px] top-0 flex flex-col items-center justify-center w-[60px] h-[60px] bg-gray-400 rounded-[8px]">
          <button
            type="button"
            className="w-full h-full text-white border-b border-white"
            onClick={() => {
              onModal(category.userId, category.id, category.name)
              setIsShowMore(false)
            }}
          >
            삭제
          </button>
          <hr className="w-full h-[1px] bg-white" />
          <button
            type="button"
            className="w-full h-full text-white border-t border-white"
            onClick={(e) => {
              setIsEditing(true)
              setIsShowMore(false)
            }}
          >
            수정
          </button>
        </div>
      )}
    </li>
  )
}
