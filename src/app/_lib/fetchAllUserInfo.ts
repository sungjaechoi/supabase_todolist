import { userinfo } from '@prisma/client'

export async function fetchAllUserInfo() {
  try {
    const response = await fetch('/api/userinfo')

    if (!response.ok) {
      throw Error(`Fetch Error: ${response.status}`)
    }

    const responseObj = await response.json()

    const userInfo: userinfo[] = responseObj.data

    return userInfo
  } catch (error) {
    console.error('fetchGetUser Error :', error)
  }
}
