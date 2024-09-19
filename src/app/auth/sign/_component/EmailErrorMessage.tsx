import { FieldErrors } from 'react-hook-form'
import { FormValues } from '../page'

type Props = {
  touchedFields: Partial<
    Readonly<{
      email?: boolean | undefined
      password?: boolean | undefined
      passwordReType?: boolean | undefined
      name?: boolean | undefined
      gender?: boolean | undefined
    }>
  >
  errors: FieldErrors<FormValues>
}

export default function EmailErrorMessage({ touchedFields, errors }: Props) {
  const isShow = touchedFields.email && errors.email
  return (
    <>
      {isShow && (
        <span className="flex justify-start w-full mt-[5px] text-sm text-red-500">
          {/* {errors.email === undefined ? null : errors.email.message} */}
          {errors.email && errors.email.message}
        </span>
      )}
    </>
  )
}
