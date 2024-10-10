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
    <div className="w-full px-3 py-2 border border-gray-300 rounded-lg">
      <form className="flex" onSubmit={handleSubmit(onSubmit)}>
        <Input
          inputName="todoInsert"
          inputType="text"
          register={register}
          inputValue={inputValue}
          placeholder="할 일을 입력하세요 "
          fieldoptions={{
            required: '할 일을 입력 하세요',
          }}
        />
        <select
          {...register('category', {
            required: '카테고리를 선택하세요',
            validate: (value) =>
              value === 'default' ? '카테고리를 선택해주세요' : undefined,
          })}
          defaultValue="default"
          className="mt-2 px-3 py-2 border border-gray-300 rounded-lg"
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
        <button type="submit" className="flex-shrink">
          <MdAdd className="w-[30px] h-[30px]" />
        </button>
      </form>
      <InputErrorMessage inputName="todoInsert" formState={formState} />
      <InputErrorMessage inputName="category" formState={formState} />
    </div>
  )
}
