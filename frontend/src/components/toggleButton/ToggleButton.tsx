import { ToggleLeft, ToggleRight } from 'phosphor-react';
import React, { useState } from 'react'

type Props = {
    value?: boolean;
    name: string;
    onChange?: (arg: {name: string, value: boolean}) => void;
}

const ToggleButton = ({name, value, onChange}: Props) => {
  const [innerValue, setInnerValue] = useState(value)
  return (
    innerValue?
    <ToggleRight onClick={(e) => {
      e.stopPropagation();
      onChange && onChange({name, value: !innerValue}); setInnerValue(!innerValue)
    }} weight='fill' size={32} color='#7975B6' cursor={'pointer'}/>
    :
    <ToggleLeft onClick={(e) => {
      e.stopPropagation();
      onChange && onChange({name, value: !innerValue}); setInnerValue(!innerValue)
    }} weight='fill' size={32}  color='gray' cursor={'pointer'}  />
  )
}

export default ToggleButton