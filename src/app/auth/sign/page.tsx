'use client'
import { useEffect, useState } from 'react'
import { signup } from '../../_lib/loginSignActions'
import EmailForm from './_component/EmailForm'
import PasswordForm from './_component/PasswordForm'
import NameForm from './_component/NameForm'
import GenderForm from './_component/GenderForm'
import { fetchAllUserInfo } from '@/app/_lib/fetchAllUserInfo'
import { userinfo } from '@prisma/client'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordReType, setPasswordReType] = useState('')
  const [userName, setUserName] = useState('')
  const [selectedGender, setSelectedGender] = useState('male')
  const [userList, setUserList] = useState<userinfo[]>([])

  const [isEmailValdateCompleate, setIsEmailValdateCompleate] = useState(true)
  const [
    isEmailDuplicationValdateCompleate,
    setIsEmailDuplicationValdateCompleate,
  ] = useState(true)
  const [isPasswordValdateCompleate, setIsPasswordValdateCompleate] =
    useState(true)
  const [isuserNameValdateCompleate, setIsuserNameValdateCompleate] =
    useState(true)

  const [isEmailDuplication, setIsEmailDuplication] = useState(false)

  const [emailDuplicationMessage, setEmailDuplicationMessage] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [userNameError, setUserNameError] = useState('')

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = await fetchAllUserInfo()
      if (userInfo) setUserList(userInfo)
    }
    getUserInfo()
  }, [])

  const validateEmail = (email: string) => {
    setEmail(email)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setEmailError('올바른 이메일이 아닙니다.')
      setIsEmailValdateCompleate(true)
      console.log('IsEmailValdateCompleate', isEmailValdateCompleate)
    } else {
      setEmailError('')
      setIsEmailValdateCompleate(false)
      console.log('IsEmailValdateCompleate', isEmailValdateCompleate)
    }
    setIsEmailDuplication(false)
    setEmailDuplicationMessage('')
    setIsEmailDuplicationValdateCompleate(false)
  }

  const emailDuplicationCheck = async (email: string) => {
    const hasEmail = userList.some((itme) => itme.email === email)
    if (hasEmail) {
      setIsEmailDuplication(true)
      setEmailDuplicationMessage('')
      setIsEmailDuplicationValdateCompleate(false)
    } else {
      setIsEmailDuplication(false)
      setEmailDuplicationMessage('사용 가능한 이메일 입니다.')
      setIsEmailDuplicationValdateCompleate(true)
    }
  }

  const validatePassword = (password: string, passwordReType: string) => {
    setPassword(password)
    setPasswordReType(passwordReType)

    if (password !== passwordReType) {
      setPasswordError('비밀번호가 일치 하지 않습니다.')
      setIsPasswordValdateCompleate(true)
      return
    }

    if (password.length < 6) {
      setPasswordError('비밀 번호는 6자 이상 입니다.')
      setIsPasswordValdateCompleate(true)
      return
    }

    setPasswordError('')
    setIsPasswordValdateCompleate(false)
  }

  const validateUserName = (name: string) => {
    setUserName(name)

    if (name.length < 3 || name.length >= 8) {
      setUserNameError('이름은 최소 3자 이상 8자 미만 입니다.')
      setIsuserNameValdateCompleate(true)
    } else {
      setUserNameError('')
      setIsuserNameValdateCompleate(false)
    }
  }

  const selectGenderHandler = (gender: string) => {
    setSelectedGender(gender)
  }

  const allPass =
    isEmailDuplicationValdateCompleate &&
    isEmailValdateCompleate &&
    isPasswordValdateCompleate &&
    isuserNameValdateCompleate

  return (
    <div className="w-full h-[70%] min-h-[800px] flex items-center justify-center">
      <div className="flex flex-col justify-center items-center gap-6">
        <h1 className="text-5xl font-medium">Sign up</h1>
        <form className="flex flex-col w-[400px] gap-3">
          <EmailForm
            email={email}
            validateEmail={validateEmail}
            emailError={emailError}
            isEmailValdateCompleate={isEmailValdateCompleate}
            emailDuplicationCheck={emailDuplicationCheck}
            isEmailDuplication={isEmailDuplication}
            emailDuplicationMessage={emailDuplicationMessage}
          />
          <PasswordForm
            password={password}
            passwordReType={passwordReType}
            validatePassword={validatePassword}
            passwordError={passwordError}
          />
          <NameForm
            userName={userName}
            userNameError={userNameError}
            validateUserName={validateUserName}
          />
          <GenderForm
            selectedGender={selectedGender}
            selectGenderHandler={selectGenderHandler}
          />
          <button
            className="h-[50px] mt-[10px] border border-gray-300 rounded-lg border-solid font-semibold"
            formAction={signup}
            disabled={allPass}
          >
            가입하기
          </button>
        </form>
      </div>
    </div>
  )
}
