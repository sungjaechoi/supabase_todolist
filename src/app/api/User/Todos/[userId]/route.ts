import { serviceGetTodos } from '@/app/_service/serviceTodos'

type UrlInfo = {
  params: { userId: string }
}

export async function GET(request: Request, userinfo: UrlInfo) {
  const userId = userinfo.params.userId
  const response = await serviceGetTodos(userId)
  return Response.json({ message: 'ok', data: response })
}
