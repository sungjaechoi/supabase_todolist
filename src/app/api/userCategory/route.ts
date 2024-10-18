import { serviceCreateCategory } from '@/app/_service/serviceCategorie'

export async function POST(request: Request) {
  const requestBody = await request.json()
  const id = requestBody.id
  const name = requestBody.name
  const response = await serviceCreateCategory(id, name)
  return Response.json({ message: 'ok', data: response })
}
