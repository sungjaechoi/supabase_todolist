'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect(`/auth/login?loginError=${true}`)
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        name: formData.get('name') as string, // name을 user_metadata로 추가
        gender: formData.get('gender') as string,
      },
    },
  }
  if (
    !data.email ||
    !data.password ||
    !data.options.data.name ||
    !data.options.data.gender
  ) {
    console.log('필수 입력 값이 누락되었습니다.')
    return
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.log('회원 가입 중 에러가 발생했습니다.', error.message)
    return
  }

  if (error) {
    redirect('/auth/sign')
  }

  redirect(`/auth/signSuccess`)
}
