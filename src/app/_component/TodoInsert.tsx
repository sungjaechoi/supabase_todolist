'use client'
import { MdAdd } from 'react-icons/md'
import Input from './Input'
import { useForm, UseFormReturn } from 'react-hook-form'
import { FormValues } from '@/model/formValues'
import InputErrorMessage from './InputErrorMessage'
import { userCategory } from '@prisma/client'

type Props = {
  createTodo: (text: string, category: string) => void
  categories: userCategory[]
}

export default function TodoInsert({ createTodo, categories }: Props) {
  const {
    register,
    handleSubmit,
    formState,
    watch,
    reset,
  }: UseFormReturn<FormValues> = useForm<FormValues>({
    mode: 'onChange',
  })

  const inputValue = watch('todoInsert')
  const categoryValue = watch('category')

  const onSubmit = () => {
    createTodo(inputValue, categoryValue)
    reset({ todoInsert: '' })
  }

  return (
    <div className="flex-initial w-full py-[12px] px-[20px] border-b-4 border-[#f2f3f7] border-solid max-md:border-none">
      <form
        className="flex justify-center items-center h-[50px] gap-[8px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <select
          className="w-[180px] h-[40px] px-2 bg-[#f2f3f7] rounded-lg text-gray-400 max-md:w-[92px]"
          {...register('category', {
            required: '카테고리를 선택하세요',
            validate: (value) =>
              value === 'default' ? '카테고리를 선택해주세요' : undefined,
          })}
          defaultValue="default"
        >
          <option value="default" disabled>
            카테고리를 선택하세요
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <Input
          style="flex-auto h-[40px] border-[2px] border-solid border-[#f2f3f7] bg-[#f2f3f7] rounded-[8px]"
          inputName="todoInsert"
          inputType="text"
          register={register}
          inputValue={inputValue}
          placeholder="할 일을 입력하세요 "
          fieldoptions={{
            required: '할 일을 입력 하세요',
          }}
        />
        <button type="submit" className="flex-shrink">
          <MdAdd className="w-[30px] h-[30px]" />
        </button>
      </form>
      <InputErrorMessage inputName="todoInsert" formState={formState} />
      <InputErrorMessage inputName="category" formState={formState} />
    </div>
  )
}
