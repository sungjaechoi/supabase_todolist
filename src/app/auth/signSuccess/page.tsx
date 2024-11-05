'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function SignSuccessPage() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 10)

    if (countdown === 0) {
      router.push('/auth/login')
    }

    // 컴포넌트가 언마운트될 때 타이머를 정리
    return () => clearInterval(timer)
  }, [countdown, router])

  console.log(countdown)

  return (
    <div className="w-full h-[60%] min-h-[300px] flex flex-col items-center justify-center gap-4">
      <span>축하합니다! 회원가입이 완료되었습니다.</span>
      <span>이메일을 확인하시고 인증 절차를 마무리해 주세요.</span>
      <span>{countdown}초 후 로그인 페이지로 이동합니다.</span>
      <span>기다리기 어렵다면, 아래 버튼을 눌러 바로 이동할 수 있습니다!</span>
      <Link
        className="w-[300px] h-[50px] flex justify-center items-center border border-gray-300 rounded-lg border-solid"
        href={'/auth/login'}
      >
        Go Login
      </Link>
    </div>
  )
}
