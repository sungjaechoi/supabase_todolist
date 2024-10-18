'use client'

import { useCategoryContext } from './_contexts/categoryCntext'
import CategoryInsert from './CategoryInsert'
import CategoryList from './CategoryList'

export default function Categories() {
  const {
    createCategory,
    toggle,
    categories,
    categoryNames,
    clean,
    categoryUdateWithTodos,
    onModal,
  } = useCategoryContext()
  return (
    <div className="flex-auto bg-white rounded-bl-[8px] rounded-br-[8px] h-[calc(100%-80px)] max-md:rounded-[8px]">
      <CategoryInsert createCategorie={createCategory} />
      <CategoryList
        toggle={toggle}
        categoryNames={categoryNames}
        categories={categories}
        categoryUdateWithTodos={categoryUdateWithTodos}
        clean={clean}
        onModal={onModal}
      />
    </div>
  )
}
