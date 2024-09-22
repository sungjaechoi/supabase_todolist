'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { FormValues } from '@/model/formValues'

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

export async function signup(signupData: FormValues) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs

  const data = {
    email: signupData.email,
    password: signupData.password,
    options: {
      data: {
        name: signupData.name, // name을 user_metadata로 추가
        gender: signupData.gender,
      },
    },
  }

  console.log(data)

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
