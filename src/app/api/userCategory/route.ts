import {
  serviceCreateCategory,
  serviceDeleteCategory,
} from '@/app/_service/serviceCategorie'

export async function POST(request: Request) {
  const requestBody = await request.json()
  const id = requestBody.id
  const name = requestBody.name
  const response = await serviceCreateCategory(id, name)
  return Response.json({ message: 'ok', data: response })
}

export async function DELETE(request: Request) {
  const requestBody = await request.json()
  const id = requestBody.id
  const response = await serviceDeleteCategory(id)
  return Response.json({ message: 'ok' })
}
