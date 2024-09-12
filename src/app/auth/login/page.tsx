'use client'
import Link from 'next/link'
import { login } from '../../_lib/loginSignActions'
import { CiUser, CiLock } from 'react-icons/ci'
import { useSearchParams } from 'next/navigation'

export default function LoginPage() {
  const query = useSearchParams()
  const isValidAuth = query.get('loginError') || ''

  return (
    <div className="w-full h-[60%] min-h-[300px] flex items-center justify-center">
      <div className="flex flex-col justify-center items-center gap-5">
        <h1 className="text-5xl font-medium">Login</h1>
        <form className="flex flex-col w-[300px] gap-3">
          <div className="flex justify-center items-center p-2 border border-gray-300 rounded-lg">
            <label htmlFor="email">
              <span className="blind">email</span>
              <CiUser className="w-[25px] h-[25px]" />
            </label>
            <input
              className="h-[30px] flex-auto px-2"
              placeholder="username@email"
              id="email"
              name="email"
              type="email"
              required
            />
          </div>
          <div className="flex justify-center items-center p-2 border border-gray-300 rounded-lg">
            <label htmlFor="password">
              <span className="blind">password</span>
              <CiLock className="w-[25px] h-[25px]" />
            </label>
            <input
              className="h-[30px] flex-auto px-2"
              placeholder="password"
              id="password"
              name="password"
              type="password"
              required
            />
          </div>
          {isValidAuth ? (
            <span className="text-center text-red-500">
              이메일과 비밀번호가 올바르지 않습니다.
            </span>
          ) : null}
          <button
            className="h-[40px] border border-gray-300 rounded-lg border-solid"
            formAction={login}
          >
            Log in
          </button>
          <Link
            className="h-[40px] flex justify-center items-center border border-gray-300 rounded-lg border-solid"
            href={'/auth/sign'}
          >
            Sign UP
          </Link>
        </form>
      </div>
    </div>
  )
}
