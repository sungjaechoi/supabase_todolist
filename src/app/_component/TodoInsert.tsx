'use client'
import { MdAdd } from 'react-icons/md'
import Input from './Input'
import { useForm, UseFormReturn } from 'react-hook-form'
import { FormValues } from '@/model/formValues'
import InputErrorMessage from './inputErrorMessage'

type Props = {
  createTodo: (text: string) => void
}

export default function TodoInsert({ createTodo }: Props) {
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

  const onSubmit = () => {
    createTodo(inputValue)
    reset({ todoInsert: '' })
  }

  return (
    <div className="px-3 py-2 mb-5 border border-gray-300 rounded-lg relative">
      <form className="flex w-[600px]" onSubmit={handleSubmit(onSubmit)}>
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
        <button type="submit" className="flex-shrink">
          <MdAdd className="w-[30px] h-[30px]" />
        </button>
      </form>
      <InputErrorMessage inputName="todoInsert" formState={formState} />
    </div>
  )
}
