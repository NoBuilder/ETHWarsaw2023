import { useState } from 'react'

export const useToggle = (
  initialState = false
): [boolean, VoidFunction, (isOn: boolean) => void] => {
  const [isOn, setIsOn] = useState(initialState)
  const onToggle = () => setIsOn(prevState => !prevState)

  return [isOn, onToggle, setIsOn]
}
