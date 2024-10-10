import {
  serviceCreateTodo,
  serviceDeleteTodo,
  serviceUpdateTodo,
} from '@/app/_service/serviceTodos'

export async function POST(request: Request) {
  const requestBody = await request.json()
  const text = requestBody.text
  const userId = requestBody.userId
  const category = requestBody.category
  const response = await serviceCreateTodo(userId, text, category)
  return Response.json({ message: 'ok', data: response })
}

export async function PATCH(request: Request) {
  const todo = await request.json()
  const response = await serviceUpdateTodo(todo)
  return Response.json({ message: 'ok', data: response })
}

export async function DELETE(request: Request) {
  const requestBody = await request.json()
  const id = requestBody.id
  const response = await serviceDeleteTodo(id)
  return Response.json({ message: 'ok' })
}
