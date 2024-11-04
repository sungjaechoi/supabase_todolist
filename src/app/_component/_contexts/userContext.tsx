'use client'

import { fetchGetUserInfo } from '@/app/_lib/fetchUserInfo'
import { createClient } from '@/utils/supabase/client'
import { users } from '@prisma/client'

import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

// Context 생성
type UserInfo = {
  id: string
  name: string
  email: string
  gender: string
}

const UserContext = createContext<{
  user: users | null
  userInfo: UserInfo | null
  isLoading: boolean
  getUser: () => void
}>({
  user: null,
  userInfo: null,
  getUser: () => {},
  isLoading: false,
})

// 2. Provider 컴포넌트 작성
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<users | null>(null)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const client = createClient()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const getUser = async () => {
    const id = (await client.auth.getUser()).data.user?.id
    setIsLoading(true)
    if (id) {
      const user = (await fetchGetUserInfo(id)) as users | undefined
      if (user) {
        setUser(user)
        const user_meta_data = JSON.parse(
          JSON.stringify(user.raw_user_meta_data),
        )
        const userInfo: UserInfo = {
          id: user_meta_data.sub,
          name: user_meta_data.name,
          email: user_meta_data.email,
          gender: user_meta_data.gender,
        }
        setUserInfo(userInfo)
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <UserContext.Provider value={{ user, userInfo, getUser, isLoading }}>
      {children}
    </UserContext.Provider>
  )
}

// 3. Custom Hook 작성 (선택 사항)
export const useUserContext = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider')
  }
  return context
}
