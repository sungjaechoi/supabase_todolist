type Props = {
  isDuplicationPass: boolean
}

export default function DuplicationPassMessage({ isDuplicationPass }: Props) {
  return (
    <>
      {isDuplicationPass && (
        <p className="flex justify-start w-full mt-[5px] text-sm text-blue-500">
          사용 가능한 이메일 입니다.
        </p>
      )}
    </>
  )
}
