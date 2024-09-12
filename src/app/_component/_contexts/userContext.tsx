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

const UserContext = createContext<{
  user: users | null
}>({ user: null })

// 2. Provider 컴포넌트 작성
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<users | null>(null)
  const client = createClient()

  useEffect(() => {
    const getUser = async () => {
      const id = (await client.auth.getUser()).data.user?.id
      if (id) {
        const user = (await fetchGetUserInfo(id)) as users | undefined
        if (user) {
          setUser(user)
        }
      }
    }
    getUser()
  }, [client.auth])

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
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
