'use client'
import Link from 'next/link'
import { login, InstantLogin } from '../../_lib/loginSignActions'
import { CiUser, CiLock } from 'react-icons/ci'
import { useSearchParams } from 'next/navigation'
import { useEffect, Suspense, useState } from 'react'
import { BeatLoader, FadeLoader } from 'react-spinners'

export default function LoginPage() {
  return (
    <Suspense fallback={<FadeLoader />}>
      <LoginContent />
    </Suspense>
  )
}

function LoginContent() {
  const query = useSearchParams()
  const isValidAuth = query.get('loginError') || ''
  const [isLoginLoading, setIsLoginLoading] = useState(false)
  const [isInstantLoginLoading, setIsInstantLoginLoading] = useState(false)

  useEffect(() => {
    const isReload = query.get('isReload')
    if (isReload) {
      window.location.href = '/'
    }
  }, [query]) // useEffect 의존성 배열에 query 추가

  const InstantLoginHandler = async () => {
    setIsInstantLoginLoading(true)
    await InstantLogin()
  }

  return (
    <div className="w-full h-[60%] min-h-[300px] flex items-center justify-center">
      <div className="flex flex-col justify-center items-center gap-5">
        <h1 className="text-5xl font-medium">로그인</h1>
        <form className="flex flex-col w-[300px] gap-3">
          <div className="flex justify-center items-center p-2 border border-gray-300 rounded-lg bg-white">
            <label htmlFor="email">
              <span className="blind">이메일</span>
              <CiUser className="w-[25px] h-[25px]" />
            </label>
            <input
              className="h-[30px] flex-auto px-2"
              placeholder="이메일을 입력해주세요"
              id="email"
              name="email"
              type="email"
              required
            />
          </div>
          <div className="flex justify-center items-center p-2 border border-gray-300 rounded-lg bg-white">
            <label htmlFor="password">
              <span className="blind">비밀번호</span>
              <CiLock className="w-[25px] h-[25px]" />
            </label>
            <input
              className="h-[30px] flex-auto px-2"
              placeholder="비밀번호"
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
            className="h-[40px] border border-gray-300 rounded-lg border-solid bg-white"
            formAction={login}
            onClick={() => {
              setIsLoginLoading(true)
            }}
          >
            {isLoginLoading ? (
              <BeatLoader color="#cacaca" margin={4} size={8} />
            ) : (
              '로그인'
            )}
          </button>
          <Link
            className="h-[40px] flex justify-center items-center border border-gray-300 rounded-lg border-solid bg-gray-400 text-white"
            href={'/auth/sign'}
          >
            회원 가입
          </Link>
          <button
            className="h-[40px] border border-gray-300 rounded-lg border-solid bg-white"
            type="button"
            onClick={InstantLoginHandler}
          >
            {isInstantLoginLoading ? (
              <BeatLoader color="#cacaca" margin={4} size={8} />
            ) : (
              '즉시 로그인'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
