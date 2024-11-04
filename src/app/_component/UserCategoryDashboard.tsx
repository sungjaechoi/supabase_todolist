'use client'

import { useEffect, useState } from 'react'
import UserInfoPanelWithLogout from './UserInfoPanelWithLogout'
import Categories from './Categories'
import MainHeading from './MainHeading'
import { useCategoryContext } from './_contexts/categoryCntext'
import { VscChromeClose } from 'react-icons/vsc'

export default function UserCategoryDashboard() {
  const { isMenuOpen, setIsMenuOpen } = useCategoryContext()
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768) // 모바일 해상도 기준
    }

    // 컴포넌트가 마운트될 때와 윈도우 크기가 변경될 때 처리
    handleResize()
    window.addEventListener('resize', handleResize)

    // 컴포넌트가 언마운트될 때 이벤트 제거
    return () => window.removeEventListener('resize', handleResize)
  }, [isMobile])

  if (isMobile === null) {
    return null
  }

  return (
    <>
      {isMobile ? (
        <>
          <MainHeading />
          {isMenuOpen && (
            <>
              <div className="fixed top-0 left-0 bottom-0 w-full h-full z-[1000] bg-[rgba(0,0,0,0.8)]">
                <div className="relative w-full h-full">
                  <button
                    type="button"
                    className="absolute top-0 left-0 w-full h-full flex justify-end"
                    onClick={() => {
                      setIsMenuOpen(false)
                    }}
                  >
                    <VscChromeClose className="w-[60px] h-[60px] p-[20px] fill-white" />
                  </button>
                  <div className="absolute top-1/2 left-1/2 w-[80%] h-[60%] -translate-x-1/2 -translate-y-1/2 bg-white rounded-[8px]">
                    <Categories isMobile={isMobile} />
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <MainHeading />
          <UserInfoPanelWithLogout />
          <Categories isMobile={isMobile} />
        </>
      )}
    </>
  )
}
