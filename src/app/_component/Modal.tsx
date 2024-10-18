'use client'

import { useEffect } from 'react'
import { useCategoryContext } from './_contexts/categoryCntext'

export default function Modal() {
  const {
    isModalOpen,
    setIsModalOpen,
    modalInterface,
    categoryDeleteWithTodos,
  } = useCategoryContext()

  useEffect(() => {
    const el = document.querySelector('body') as HTMLBodyElement
    el.style.overflowY = 'hidden'

    return () => {
      el.style.overflowY = 'auto'
    }
  }, [])

  return (
    <>
      {isModalOpen && (
        <div className="fixed top-0 left-0 bottom-0 w-full h-full z-[1000] bg-[rgba(0,0,0,0.8)]">
          <div className="relative w-full h-full">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-1/2 left-1/2 w-[400px] h-[300px] -translate-x-1/2 -translate-y-1/2 bg-[#f2f3f7] rounded-lg max-md:w-[300px] max-md:h-[240px]">
                <div className="h-full p-8 flex flex-col justify-between ">
                  <div className="flex flex-col gap-[8px] justify-center items-center h-full text-xl">
                    <p className="break-keep text-center">
                      {modalInterface.category} 카테고리 안에{' '}
                      {modalInterface.todoLength}개의 항목이 존재 합니다.
                      <p>모두 삭제 하시겠습니까?</p>
                    </p>
                  </div>
                  <div className="flex justify-between gap-3">
                    <button
                      className="w-full h-12 font-semibold rounded-[8px] border border-solid border-gray-500"
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false)
                      }}
                    >
                      아니오
                    </button>
                    <button
                      className="w-full h-12 bg-gray-500 font-semibold text-white rounded-lg"
                      type="button"
                      onClick={() => {
                        categoryDeleteWithTodos(
                          modalInterface.categoryId,
                          modalInterface.category,
                        )
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
      )}
    </>
  )
}
