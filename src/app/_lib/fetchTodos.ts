import { Prisma, todo } from '@prisma/client'

export async function fetchGetTodos(userId: string, categoryNames: string) {
  try {
    const response = await fetch(
      `/api/users/todo/${userId}?category=${categoryNames}`,
    )

    if (!response.ok) {
      throw Error(`fetch Error: ${response.status}`)
    }

    const responseObj = await response.json()

    const todos: todo[] = responseObj.data

    return todos
  } catch (error) {
    console.error('getTodosError:', error)
    return []
  }
}

export async function fetchCreateTodo(
  userId: string,
  text: string,
  category: string,
) {
  try {
    const response = await fetch('/api/todo', {
      method: 'POST',
      body: JSON.stringify({ userId, text, category }),
    })

    if (!response.ok) {
      throw Error(`Fetch Error: ${response.status}`)
    }

    const responseObj = await response.json()

    const todo: todo = responseObj.data

    return todo
  } catch (error) {
    throw new Error('fetchCreateTodoError')
  }
}

export async function fetchUpdateTodo(data: Prisma.todoUpdateInput) {
  try {
    const response = await fetch('/api/todo', {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw Error(`FetchError: ${response.status}`)
    }

    const responseObj = await response.json()

    const todo: todo = responseObj.data

    return todo
  } catch (error) {
    throw new Error('fetchUpdateError')
  }
}

export async function fetchDeleteTodo(id: string) {
  try {
    const response = await fetch('/api/todo', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    })

    if (!response.ok) {
      throw Error(`FetchError: ${response.status}`)
    }

    return id
  } catch (error) {
    throw new Error('fetchDeleteTodoError')
  }
}
