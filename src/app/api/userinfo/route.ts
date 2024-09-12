import { serviceAllUserInfo } from '@/app/_service/serviceAllUserInfo'

export async function GET() {
  const response = await serviceAllUserInfo()
  const userInfo = response

  return Response.json({ message: 'ok', data: userInfo })
}
