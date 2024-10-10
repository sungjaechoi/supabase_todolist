import { serviceGetTodos } from '@/app/_service/serviceTodos'

type UrlInfo = {
  params: { userId: string }
}

export async function GET(request: Request, { params }: UrlInfo) {
  const userId = params.userId
  const url = new URL(request.url)
  const queryParams = new URLSearchParams(url.search)
  const categoryName = queryParams.get('category') as string
  const categories = categoryName ? categoryName.split(',') : []

  const response = await serviceGetTodos(userId, categories)
  return Response.json({ message: 'ok', data: response })
}
