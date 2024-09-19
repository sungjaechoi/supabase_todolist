'use client'
import { useEffect, useState } from 'react'
import { signup } from '../../_lib/loginSignActions'
import EmailForm from './_component/EmailForm'
import PasswordForm from './_component/PasswordForm'
import NameForm from './_component/NameForm'
import GenderForm from './_component/GenderForm'
import { fetchAllUserInfo } from '@/app/_lib/fetchAllUserInfo'
import { userinfo } from '@prisma/client'
import { UseFormReturn, useForm } from 'react-hook-form'

export type FormValues = {
  email: string
  password: string
  passwordReType: string
  name: string
  gender: string
}

export default function SignUpPage() {
  const [userList, setUserList] = useState<userinfo[]>([])

  const [isDuplicationPass, setIsDuplicationPass] = useState(false)
  const [emailDuplicationMessage, setEmailDuplicationMessage] = useState('')

  const {
    register,
    // input value의 추적 하여 react-hook-form의 상태로 상태관리,
    // 첫번째 인자: inputName
    // 두번째 인자: {required(필수 입력규칙), 유효성검사, 에러메세지},
    // register는 name, onChange, onBlur, ref 같은 이벤트 속성을 반환
    //인풋 내부의 "...register()" => 반환된 속성을 input에 적용

    handleSubmit,
    // 폼 제출 시 유효성 검사를 처리하고, 검증이 완료된 데이터를 전달해주는 함수 => 폼의 "onSubmit" 이벤트에 연결
    // 첫번째 인자 : 유효성 검사가 통과 했을 때 실행할 함수
    // 두번쨰 인자 : 유효성검사가 실패 했을 때 실행할 함수
    // 폼 제출 시 "handleSubmit" 호출 -> react Hook -form 등록된 모든필드 유효성 검사 -> 결과에 따른 처리(성공, 실패)
    formState, // useForm 훅에서 반환되는 객체로 폼의 상태와 관련된 정보를 제공
    // 1. errors : 유효성 검사의 실패 정보를 담고있는 객체, 각 인풋의 이름'key', 에러정보가 값 ex){ email: { message: '올바른 이메일 형식이 아닙니다.' } }
    // 2. isValid : 폼 필드의 유효여부 불리언 값
    // 3. isDirty: 폼의 값을 변경했는지 여부를 나타내는 불리언 값
    // 4. isSubmitting : 폼의 제출 여부 불리언 값, 폼이 제출되는 동안 true, 제출이 완료되면 false
    // 5. isSubmitSuccessful : 폼 제출이 성공적으로 완료되었는지 여부를 나타내는 불리언 값, 폼 제출 함수가 성공적으로 실행된 후에 true로 설정
    // 6. isSubmitted : 폼이 한 번이라도 제출되었는지 여부를 나타내는 불리언 값, 폼이 여러번 제출할 때마다 상태를 추적
    // 7. touchedFields : 한 번이라도 포커스를 잃은 필드를 추적하는 객체, 포커스를 잃으면 해당 필드의 이름이 touchedFields에 기록 ex) { email: true, password: true }
    // 8. dirtyFields : 사용자가 수정한 필드들을 추적하는 객체, 값이 변경된 필드들만 true로 표시
    // 9. submitCount: 폼이 제출된 횟수를 나타내는 숫자
    watch,
    //폼 필드의 값을 실시간으로 추적, 특정 필드의 값을 추적하거나, 폼 전체 필드의 상태 변화를 감지 => 로 동적으로 유효성 검사를 하거나, 다른 필드의 값을 참고할 때 유용
    // watch('input name') : 특정 필드 값 추적
    // watch() : 모든 폼 필드 값을 추적
    // watch(['input name','input name']) : 다수 필드 값 추적
    //!reset,
    // 폼 초기화
    //!setValue,
    // 필드 값 설정
    //!getValues,
    // 폼 값 가져오기
    //!trigger,
    // 유효성 검사 실행
    //!resetField,
    // 특정 필드 초기화
    //!control,
    // Controller 컴포넌트를 제어
    //!unregister,
    // 필드를 폼에서 제거
    setError,
    // 수동으로 에러 설정
    clearErrors,
  }: // 에러 지우기
  UseFormReturn<FormValues> = useForm<FormValues>({
    defaultValues: {
      email: '',
      name: '',
      password: '',
      passwordReType: '',
      gender: 'male',
    },
    mode: 'onChange',
  })

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = await fetchAllUserInfo()
      if (userInfo) setUserList(userInfo)
    }
    getUserInfo()
  }, [])

  const emailDuplicationCheck = async (email: string) => {
    const hasEmail = userList.some((itme) => itme.email === email)

    if (hasEmail) {
      setIsDuplicationPass(false)
      // setEmailDuplicationMessage('')
    } else {
      setIsDuplicationPass(true)
      // setEmailDuplicationMessage('사용 가능한 이메일 입니다.')
    }
  }

  const onSubmit = async (data: FormValues) => {
    await signup(data)
  }

  // const selectGenderHandler = (gender: string) => {
  //   setSelectedGender(gender)
  // }

  return (
    <div className="w-full h-[70%] min-h-[800px] flex items-center justify-center">
      <div className="flex flex-col justify-center items-center gap-6">
        <h1 className="text-5xl font-medium">Sign up</h1>
        <form
          className="flex flex-col w-[400px] gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <EmailForm
            register={register}
            formState={formState}
            watch={watch}
            emailDuplicationCheck={emailDuplicationCheck}
            isDuplicationPass={isDuplicationPass}
            emailDuplicationMessage={emailDuplicationMessage}
            setIsDuplicationPass={setIsDuplicationPass}
          />
          <PasswordForm
            register={register}
            formState={formState}
            watch={watch}
          />
          <NameForm register={register} formState={formState} />
          <GenderForm register={register} />
          <button
            className="h-[50px] mt-[10px] border border-gray-300 rounded-lg border-solid font-semibold"
            type="submit"
            //ture : 중복             ture : 통과
            disabled={!formState.isValid || !isDuplicationPass}
          >
            가입하기
          </button>
        </form>
      </div>
    </div>
  )
}
