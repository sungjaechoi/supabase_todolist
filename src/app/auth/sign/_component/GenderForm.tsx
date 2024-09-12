'use client'

type Props = {
  selectedGender: string
  selectGenderHandler: (gender: string) => void
}

export default function GenderForm({
  selectedGender,
  selectGenderHandler,
}: Props) {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    selectGenderHandler(event.target.value)
  }

  return (
    <div className="flex justify-center h-[40px] border border-gray-300 rounded-lg">
      <div className="w-full relative">
        <input
          className="peer absolute left-0 top-0 w-full h-full"
          placeholder="gender"
          id="male"
          name="gender"
          type="radio"
          value="male"
          checked={selectedGender === 'male'}
          onChange={onChange}
          required
        />
        <label
          className="w-full h-[40px] flex justify-center items-center rounded-lg cursor-pointer transition-colors duration-300 peer-checked:bg-gray-400"
          htmlFor="male"
        >
          <span className="">남성</span>
        </label>
      </div>
      <div className="w-full relative">
        <input
          className="peer absolute left-0 top-0 w-full h-full"
          placeholder="gender"
          id="female"
          name="gender"
          type="radio"
          value="female"
          checked={selectedGender === 'female'}
          onChange={onChange}
          required
        />
        <label
          className="w-full h-[40px] flex justify-center items-center rounded-lg cursor-pointer transition-colors duration-300 peer-checked:bg-gray-400"
          htmlFor="female"
        >
          <span className="">여성</span>
        </label>
      </div>
    </div>
  )
}
