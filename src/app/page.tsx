import Modal from './_component/Modal'
import Todo from './_component/Todo'
import UserCategoryDashboard from './_component/UserCategoryDashboard'
import UserInfoPanelWithLogout from './_component/UserInfoPanelWithLogout'

export default function Home() {
  return (
    <div className="w-full h-full">
      <div className="flex gap-[20px] h-full min-h-[300px] max-w-[1000px] p-[20px] mx-auto max-md:flex-col max-md:gap-0">
        <div className="relative flex flex-col h-full bg-white rounded-[8px] flex-initial max-w-[260px] max-md:max-w-none max-md:h-auto">
          <UserCategoryDashboard />
        </div>
        <div className="flex-auto flex justify-center items-start h-full">
          <Todo />
        </div>
        <div className="relative hidden max-md:block">
          <UserInfoPanelWithLogout />
        </div>
      </div>
      <Modal />
    </div>
  )
}
