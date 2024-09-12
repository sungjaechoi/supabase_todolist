import { userinfo } from '@prisma/client'

export async function fetchGetUserInfo(id: string) {
  try {
    const response = await fetch(`/api/userinfo/${id}`)

    if (!response.ok) {
      throw Error(`Fetch Error: ${response.status}`)
    }

    const responseObj = await response.json()

    const user: userinfo = responseObj.data

    return user
  } catch (error) {
    console.error('fetchGetUser Error :', error)
  }
}
