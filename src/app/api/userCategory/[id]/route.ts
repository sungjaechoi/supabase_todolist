import {
  serviceDeleteCategoryWithTodos,
  serviceGetCategorie,
  serviceUpdateCategoryWithTodos,
} from '@/app/_service/serviceCategorie'

type UserCategories = {
  params: { id: string }
}

export async function GET(requset: Request, { params }: UserCategories) {
  const id = params.id
  const response = await serviceGetCategorie(id)
  return Response.json({ message: 'ok', data: response })
}

export async function DELETE(request: Request, { params }: UserCategories) {
  const userId = params.id
  const requestBody = await request.json()
  const categoryId = requestBody.categoryId
  const categoryName = requestBody.categoryName

  const response = await serviceDeleteCategoryWithTodos(
    userId,
    categoryId,
    categoryName,
  )
  return Response.json({ message: 'ok', data: response })
}

export async function PATCH(request: Request, { params }: UserCategories) {
  const requestBody = await request.json()
  const userId = params.id
  const categoryId = requestBody.categoryId
  const categoryName = requestBody.categoryName
  const newCategoryName = requestBody.newCategoryName

  const response = await serviceUpdateCategoryWithTodos(
    userId,
    categoryId,
    categoryName,
    newCategoryName,
  )
  return Response.json({
    message: 'ok',
    data: {
      updateCategory: response.updateCategory,
      updateTodos: response.updateTodos,
    },
  })
}
