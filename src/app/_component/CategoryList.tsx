'use client'

import { useEffect, useState } from 'react'
import CategoryItem from './CategoryItem'
import Categories from './Categories'
import { userCategory } from '@prisma/client'

type Props = {
  categoryDeleteWithTodos: (categoryId: string, categoryName: string) => void
  categories: userCategory[]
  toggle: (category: string) => void
  categoryNames: string[]
  clean: () => void
  categoryUdateWithTodos: (
    categoryId: string,
    categoryName: string,
    newCategoryName: string,
  ) => void
}

export default function CategoryList({
  categories,
  toggle,
  categoryDeleteWithTodos,
  categoryNames,
  clean,
  categoryUdateWithTodos,
}: Props) {
  const allListToggletBtnHandler = () => {
    clean()
  }

  return (
    <ul className="flex flex-col w-full gap-1">
      <li className='className="flex flex-nowrap items-center justify-center border border-gray-300 rounded-lg p-2'>
        <div className="w-full relative">
          <button
            type="button"
            className={`
              w-full h-[40px] flex justify-center items-center rounded-lg cursor-pointer transition-colors duration-300`}
            onClick={allListToggletBtnHandler}
          >
            <span className="font-semibold">전체</span>
          </button>
        </div>
      </li>
      {categories &&
        categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            toggle={toggle}
            isCheck={categoryNames.includes(category.name)}
            categoryDeleteWithTodos={categoryDeleteWithTodos}
            categoryUdateWithTodos={categoryUdateWithTodos}
          />
        ))}
    </ul>
  )
}
