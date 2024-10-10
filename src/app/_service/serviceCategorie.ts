import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function serviceGetCategorie(id: string) {
  const response = await prisma.userCategory.findMany({
    where: {
      userId: id,
    },
  })

  return response
}

export async function serviceCreateCategory(id: string, name: string) {
  const response = await prisma.userCategory.create({
    data: {
      userId: id,
      name: name,
    },
  })

  return response
}

export async function serviceDeleteCategoryWithTodos(
  userId: string,
  categoryId: string,
  categoryName: string,
) {
  const response = await prisma.$transaction(async (prisma) => {
    // 먼저 해당 카테고리에 속하는 todos를 삭제
    const deleteTodos = await prisma.todo.deleteMany({
      where: {
        userId: userId,
        category: categoryName,
      },
    })

    // 그 다음 해당 카테고리를 삭제
    const deleteCategory = await prisma.userCategory.delete({
      where: { id: categoryId },
    })

    return { deleteTodos, deleteCategory }
  })

  return response
}

export async function serviceUpdateCategoryWithTodos(
  userId: string,
  categoryId: string,
  categoryName: string,
  newCategoryName: string,
) {
  const response = await prisma.$transaction(async (prisma) => {
    const updateCategory = await prisma.userCategory.update({
      where: { id: categoryId },
      data: { name: newCategoryName },
    })

    const updateTodos = await prisma.todo.updateMany({
      where: {
        userId: userId,
        category: categoryName,
      },
      data: {
        category: newCategoryName,
      },
    })

    return { updateTodos, updateCategory }
  })

  return response
}
