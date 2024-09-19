import Link from 'next/link'

type Props = {
  isDuplication: boolean
}

export default function DuplicationMessage({ isDuplication }: Props) {
  return (
    <>
      {isDuplication && (
        <div className="flex flex-col gap-2">
          <span className="flex justify-center items-center h-[30px] text-center text-red-500 ">
            이미 사용중인 이메일 입니다.
          </span>
          <span className="flex justify-center items-center h-[30px] text-center text-blue-500 ">
            회원 이시라면 로그인 화면으로 돌아가세요.
          </span>
          <Link
            className="h-[40px] flex justify-center items-center border border-gray-300 rounded-lg border-solid"
            href={'auth/login'}
          >
            Go Login
          </Link>
        </div>
      )}
    </>
  )
}
