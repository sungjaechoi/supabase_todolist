'use client'
import { IoMenu } from 'react-icons/io5'
import React from 'react'
import { useCategoryContext } from './_contexts/categoryCntext'
export default function MainHeading() {
  const { setIsMenuOpen } = useCategoryContext()
  return (
    <div className="flex-initial py-[25px] px-[20px] border-b-4 border-[#f2f3f7] border-solid max-md:flex max-md:justify-between">
      <h1 className="font-semibold text-[25px] leading-[25px] text-black">
        TODO LIST
      </h1>
      <div>
        <button
          type="button"
          className="hidden max-md:block"
          onClick={() => {
            setIsMenuOpen(true)
          }}
        >
          <IoMenu className="w-[25px] h-[25px]" />
        </button>
      </div>
    </div>
  )
}
