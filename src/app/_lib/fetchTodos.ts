import { Todo } from '@/model/todos'
import { json } from 'stream/consumers'

export async function fetchGetTodos() {
  try {
    const response = await fetch('/api/Todos')

    if (!response.ok) {
      throw Error(`fetch Error:${response.status}`)
    }

    const responseObj = await response.json()
    const todos: Todo[] = responseObj.data

    return todos
  } catch (error) {
    console.error('getTodosError:', error)
  }
}

export async function fetchCreateTodo(text: string) {
  try {
    const response = await fetch('/api/Todos', {
      method: 'POST',
      body: JSON.stringify({ text }),
    })

    if (!response.ok) {
      throw Error(`Fetch Error: ${response.status}`)
    }

    const responseObj = await response.json()

    const todo: Todo = responseObj.data

    return todo
  } catch (error) {
    console.error('fetchCreateTodo', error)
  }
}

export async function fetchUpdataTodo(data: Todo) {
  try {
    const response = await fetch('/api/Todos', {
      method: 'PATCH',
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw Error(`FetchError:${response.status}`)
    }

    const resposeObj = await response.json()

    const todo: Todo = resposeObj.data

    return todo
  } catch (error) {
    console.error('fetchUpdateError:', error)
  }
}

export async function fetchDeleteTodo(id: string) {
  try {
    const response = await fetch('/api/Todos', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    })

    if (!response.ok) {
      throw Error(`FetchError:${response.status}`)
    }

    return response.ok
  } catch (error) {
    console.error('fetchDeleteTodoError:', error)
  }
}
