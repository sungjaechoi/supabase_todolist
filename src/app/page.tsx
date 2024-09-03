import Todo from './_component/Todo'
import { TodosProvider } from './_component/_contexts/todoContext'

export default function Home() {
  return (
    <div className="flex flex-col items-center pt-[60px]">
      <h1 className="pb-[20px]  text-xl font-semibold">TODO LIST</h1>
      <TodosProvider>
        <Todo />
      </TodosProvider>
    </div>
  )
}
