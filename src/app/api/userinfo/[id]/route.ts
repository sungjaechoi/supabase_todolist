import { serviceGetUser } from '@/app/_service/serviceUserInfo'

type id = {
  params: { id: string }
}

export async function GET(request: Request, id: id) {
  const useId = id.params.id
  const response = await serviceGetUser(useId)
  const userInfo = response[0]

  return Response.json({ message: 'ok', data: userInfo })
}
