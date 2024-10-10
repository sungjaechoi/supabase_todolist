'use client'

import { userCategory } from '@prisma/client'
import { useEffect, useState } from 'react'
import Modal from './Modal'
import { fetchGetTodos } from '../_lib/fetchTodos'
import { useForm, UseFormReturn } from 'react-hook-form'
import { FormValues } from '@/model/formValues'

type Props = {
  category: userCategory
  toggle: (category: string) => void
  categoryDeleteWithTodos: (categoryId: string, categoryName: string) => void
  isCheck: boolean
  categoryUdateWithTodos: (
    categoryId: string,
    categoryName: string,
    newCategoryName: string,
  ) => void
}

type todosLengthInit = null | number

export default function CategoryItem({
  category,
  categoryDeleteWithTodos,
  categoryUdateWithTodos,
  toggle,
  isCheck,
}: Props) {
  const [isShow, setIsShow] = useState(false)
  const [todosLength, setTodosLength] = useState<todosLengthInit>(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const el = document.querySelector('#aaa') as HTMLInputElement
    el && el.focus()
  }, [isEditing]) // isEditing 상태가 변경될 때마다 실행

  const { register, handleSubmit, watch, reset }: UseFormReturn<FormValues> =
    useForm<FormValues>({
      defaultValues: {
        categoryEdit: category.name,
      },
      mode: 'onChange',
    })

  console.log(isEditing)

  const value = watch('categoryEdit')

  const onSubmit = async (data: FormValues) => {
    categoryUdateWithTodos(category.id, category.name, data.categoryEdit)
    setIsEditing(false)
  }

  const close = () => {
    return setIsShow(false)
  }

  const onModal = (userId: string, category: string) => {
    setIsShow(true)
    const getTodosWithLength = async () => {
      const todos = await fetchGetTodos(userId, category)
      if (todos) {
        setTodosLength(todos.length)
      }
    }
    getTodosWithLength()
  }

  const showModal = isShow && todosLength !== null

  return (
    <li className="flex flex-nowrap items-center justify-center border border-gray-300 rounded-lg p-2">
      <div className="w-full relative">
        <button
          type="button"
          className={`${
            isCheck ? 'bg-red-300' : 'bg-white'
          } w-full h-[40px] flex justify-center items-center rounded-lg cursor-pointer transition-colors duration-300`}
          onClick={() => {
            !isEditing && toggle(category.name)
          }}
        >
          {isCheck && isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>
                <input
                  id="aaa"
                  className=""
                  type="text"
                  defaultValue={value}
                  {...register('categoryEdit', {
                    required: '카테고리를 입력하세요',
                  })}
                />
              </label>
              <div className="flex justify-between gap-2">
                <button
                  type="button"
                  className="w-full"
                  onClick={() => {
                    setIsEditing(false)
                    reset({ categoryEdit: category.name })
                  }}
                >
                  취소
                </button>
                <button type="submit" className="w-full">
                  수정
                </button>
              </div>
            </form>
          ) : (
            <span className="font-semibold">{category.name}</span>
          )}
        </button>
        {!isEditing && (
          <button
            type="button"
            className="absolute right-0 top-0 w-[30px] h-[30px]"
            onClick={() => {
              onModal(category.userId, category.name)
            }}
          >
            삭제
          </button>
        )}

        {isCheck && !isEditing && (
          <button
            type="button"
            className="absolute left-0 top-0 w-[30px] h-[30px]"
            onClick={(e) => {
              setIsEditing(true)
            }}
          >
            수정
          </button>
        )}
      </div>
      {showModal && (
        <Modal
          category={category}
          categoryDeleteWithTodos={categoryDeleteWithTodos}
          close={close}
          todosLength={todosLength}
        />
      )}
    </li>
  )
}
