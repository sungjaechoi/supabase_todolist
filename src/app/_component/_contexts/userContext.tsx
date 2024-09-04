'use client'

import { Todo } from '@/model/todos'
import { createClient } from '@/utils/supabase/client'

// console.log(
//   'createClient',
//   client.auth.getUser().then((res) => {
//     console.log(res)
//     // client.auth.signOut()
//   }),
// )

import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

// Context 생성
const client = createClient()
const UserContext = createContext<{}>({})

// 2. Provider 컴포넌트 작성
export const UserProvider = ({ children }: { children: ReactNode }) => {
  // const [todos, setTodos] = useState<Todo[]>([])

  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>
}

// 3. Custom Hook 작성 (선택 사항)
export const useUserContext = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider')
  }
  return context
}
