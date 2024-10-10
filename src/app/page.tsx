import Categories from './_component/Categories'
import Todo from './_component/Todo'

export default function Home() {
  return (
    <div className="w-full h-full ">
      <div className="flex h-full">
        <div className=" flex-shrink basis-60 h-full border-r border-gray-300">
          <h1 className="text-xl py-5 font-semibold text-center">TODO LIST</h1>
          <Categories />
        </div>
        <div className="flex-auto pt-20 flex justify-center items-start">
          <Todo />
        </div>
      </div>
    </div>
  )
}
