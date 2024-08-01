import React from 'react'
import './Button.css'

type Props = {
    label: string;
    onClick?: (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    leftIcon?: JSX.Element;
    rightIcon?: JSX.Element;
    btnType?: 'outline' | 'fill';
    style?: React.CSSProperties;
}

const Button = ({label, onClick, leftIcon, rightIcon, btnType = 'fill', style}: Props) => {
  return (
    <div onClick={(e) => onClick && onClick(e)} className={`main-button ${btnType === 'outline'? 'main-button-outline': 'main-button-fill'}`} style={style}>
      {leftIcon}
      {label}
      {rightIcon}
    </div>
  )
}

export default Button