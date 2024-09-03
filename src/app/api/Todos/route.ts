import {
  serviceCreateTood,
  serviceDeleteTodo,
  serviceGetTodos,
  serviceUpdataTodo,
} from '@/app/_service/serviceTodos'

export async function GET() {
  const response = await serviceGetTodos()
  return Response.json({ message: 'ok', data: response })
}

export async function POST(request: Request) {
  const requstBody = await request.json()
  const text = requstBody.text
  const response = await serviceCreateTood(text)
  return Response.json({ message: 'ok', data: response })
}

export async function PATCH(request: Request) {
  const todo = await request.json()
  const response = await serviceUpdataTodo(todo)
  return Response.json({ message: 'ok', data: response })
}

export async function DELETE(request: Request) {
  const requestBody = await request.json()
  const id = requestBody.id
  const response = await serviceDeleteTodo(id)
  return Response.json({ message: 'ok' })
}
