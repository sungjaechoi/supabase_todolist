'use client'

import CategoryItem from './CategoryItem'
import { userCategory } from '@prisma/client'
import LoadingCategoryList from './_skeletonUi/LoadingCategoryList'

type Props = {
  categories: userCategory[]
  toggle: (category: string) => void
  categoryNames: string[]
  clean: () => void
  categoryUdateWithTodos: (
    categoryId: string,
    categoryName: string,
    newCategoryName: string,
  ) => void
  onModal: (userId: string, categoryId: string, category: string) => void
  isLoading: boolean | null
}

export default function CategoryList({
  categories,
  toggle,
  categoryNames,
  clean,
  categoryUdateWithTodos,
  onModal,
  isLoading,
}: Props) {
  const allListToggletBtnHandler = () => {
    clean()
  }

  return (
    <div
      style={{ overflowY: isLoading ? 'hidden' : 'auto' }}
      className="flex flex-col h-[calc(100%-70px)] pb-[60px] max-md:p-0 max-md:h-full"
    >
      <button
        type="button"
        className="flex-initial w-full min-h-[50px]"
        onClick={allListToggletBtnHandler}
      >
        <span className="font-semibold">전체</span>
      </button>
      {isLoading ? (
        <LoadingCategoryList />
      ) : (
        <ul className="flex-auto flex flex-col gap-[8px] h-full pl-[16px] pr-[8px] customScrollbar">
          {categories &&
            categories.map((category) => (
              <CategoryItem
                key={category.id}
                category={category}
                toggle={toggle}
                isCheck={categoryNames.includes(category.name)}
                categoryUdateWithTodos={categoryUdateWithTodos}
                onModal={onModal}
              />
            ))}
        </ul>
      )}
    </div>
  )
}
