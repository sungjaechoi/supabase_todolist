'use client'
import { FormValues } from '@/model/formValues'
import { FormState } from 'react-hook-form'

type Props = {
  inputName: string
  formState: FormState<FormValues>
}

export default function InputErrorMessage({ formState, inputName }: Props) {
  const name = inputName as keyof FormValues
  return (
    <>
      {formState.touchedFields[name] && formState.errors[name] && (
        <p className="flex justify-start w-full mt-[5px] text-sm text-red-500">
          {formState.errors[name].message}
        </p>
      )}
    </>
  )
}
