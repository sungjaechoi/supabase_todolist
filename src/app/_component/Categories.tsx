'use client'
import { useCategoryContext } from './_contexts/categoryCntext'
import CategoryInsert from './CategoryInsert'
import CategoryList from './CategoryList'

export default function Categories() {
  const {
    createCategory,
    categoryDeleteWithTodos,
    toggle,
    categories,
    categoryNames,
    clean,
    categoryUdateWithTodos,
  } = useCategoryContext()
  return (
    <div className="flex-auto">
      <CategoryInsert createCategorie={createCategory} />
      <CategoryList
        toggle={toggle}
        categoryNames={categoryNames}
        categories={categories}
        categoryDeleteWithTodos={categoryDeleteWithTodos}
        categoryUdateWithTodos={categoryUdateWithTodos}
        clean={clean}
      />
    </div>
  )
}
