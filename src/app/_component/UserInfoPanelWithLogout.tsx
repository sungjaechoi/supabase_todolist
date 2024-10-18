'use client'
import { FaRegUserCircle } from 'react-icons/fa'
import { signOut } from '../_lib/loginSignActions'
import { useUserContext } from './_contexts/userContext'
import { useState } from 'react'
import { VscChromeClose } from 'react-icons/vsc'

export default function UserInfoPanelWithLogout() {
  const { userInfo } = useUserContext()
  const [isClick, setIsClick] = useState(false)

  const onClick = async () => {
    await signOut()
  }
  return (
    <div className="absolute left-0 bottom-0 flex justify-start items-center gap-[8px] w-full h-[60px] p-[10px] rounded-[8px] bg-gray-400">
      <button
        className=" absolute top-0 left-0 w-full h-full"
        onClick={() => {
          setIsClick(true)
        }}
      >
        <span className="blind">로그아웃</span>
      </button>

      {isClick && (
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center gap-[6px] bg-gray-300 rounded-[8px]">
          <div className="relative w-full h-full p-[4px]">
            <button
              className="w-full h-full"
              onClick={() => {
                setIsClick(false)
              }}
            >
              <span className="absolute top-0 right-0 p-[4px]">
                <VscChromeClose className="w-[15px] h-[15px]" />
              </span>
            </button>
            <button
              className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2  w-[200px] h-[40px] rounded-[8px] text-[14px] text-white bg-gray-500"
              onClick={onClick}
            >
              <span className="">로그아웃</span>
            </button>
          </div>
        </div>
      )}

      <span className="">
        <FaRegUserCircle className="fill-white w-[40px] h-[40px]" />
      </span>
      <div className="flex flex-col">
        <span className="text-white">{userInfo?.name}</span>
        <span className="text-white">{userInfo?.email}</span>
      </div>
    </div>
  )
}
