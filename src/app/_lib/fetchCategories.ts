import { userCategory } from '@prisma/client'

export async function fetchCreateCategory(id: string, name: string) {
  try {
    const response = await fetch('/api/userCategory', {
      method: 'POST',
      body: JSON.stringify({ id, name }),
    })

    if (!response.ok) console.log(`Fetch Error: ${response.status}`)
    const responseObj = await response.json()

    const categorie: userCategory = responseObj.data

    return categorie
  } catch (error) {
    console.error('fetchCreateCategories Error', error)
  }
}

export async function fetchGetCategories(id: string) {
  try {
    const response = await fetch(`/api/userCategory/${id}`)

    if (!response.ok) console.log(`Fetch Error: ${response.status}`)
    const responseObj = await response.json()

    const categories: userCategory[] = responseObj.data

    return categories
  } catch (error) {
    console.error('fetchCreateCategories Error', error)
  }
}

export async function fetchDeleteCategoryWithTodos(
  userId: string,
  categoryId: string,
  categoryName: string,
) {
  try {
    const response = await fetch(`/api/userCategory/${userId}`, {
      method: 'DELETE',
      body: JSON.stringify({ categoryId, categoryName }),
    })

    if (!response.ok) {
      throw Error(`fetch Error: ${response.status}`)
    }

    return response.ok
  } catch (error) {
    console.error('fetchDeleteCategoryWithTodosError:', error)
  }
}

export async function fetchUpdateCategoryWithTodos(
  userId: string,
  categoryId: string,
  categoryName: string,
  newCategoryName: string,
) {
  try {
    const response = await fetch(`/api/userCategory/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify({ categoryId, categoryName, newCategoryName }),
    })

    if (!response.ok) {
      throw Error(`fetch Error: ${response.status}`)
    }

    const responseObj = await response.json()

    const dataObj = responseObj.data

    const categories: userCategory = dataObj.updateCategory

    return categories
  } catch (error) {
    console.error('fetchUpdateCategoryWithTodosError:', error)
  }
}
