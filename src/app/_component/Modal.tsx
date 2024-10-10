'use client'

import { userCategory } from '@prisma/client'
import { useEffect, useState } from 'react'

type Props = {
  category: userCategory
  categoryDeleteWithTodos: (categoryId: string, categoryName: string) => void
  close: () => void
  todosLength: number | null
}

export default function Modal({
  category,
  categoryDeleteWithTodos,
  close,
  todosLength,
}: Props) {
  useEffect(() => {
    const el = document.querySelector('body') as HTMLBodyElement
    el.style.overflowY = 'hidden'

    return () => {
      el.style.overflowY = 'auto'
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 bottom-0 w-full h-full z-[1000] bg-[rgba(0,0,0,0.8)]">
      <div className="relative w-full h-full">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/2 left-1/2 w-1/2 h-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg">
            <div className="h-full p-8 flex flex-col justify-between ">
              <div className=" text-xl">
                {category.name} 카테고리 안에 {todosLength}개의 항목이 존재
                합니다. 모두 삭제 하시겠습니까?
              </div>
              <div className="flex justify-between gap-3">
                <button
                  className="w-full h-12 bg-red-400 font-semibold text-white rounded-lg"
                  type="button"
                  onClick={() => {
                    close()
                  }}
                >
                  아니오
                </button>
                <button
                  className="w-full h-12 bg-green-400 font-semibold text-white rounded-lg"
                  type="button"
                  onClick={() => {
                    categoryDeleteWithTodos(category.id, category.name)
                  }}
                >
                  예
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
