import React from 'react'
import './InputField.css'

export type IInputField = {
    label: string;
    placeholder?: string;
    name: string;
    value: string;
    maxLength?: number | undefined;
    labelType?: 'inline' | 'nested';
    onChange?: (e: ITarget) => void;
    type?: 'input' | 'textarea';
    containerStyle?: React.CSSProperties;
    inputStyle?: React.CSSProperties;
    formatValue?: "number" | "text"
}

type ITarget = {
    target: {
        name: string;
        value: string;
    }
}

const InputField = ({name, onChange, value, label, placeholder, labelType = 'inline', type = 'input', containerStyle, inputStyle, maxLength, formatValue}: IInputField) => {


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;

        if(formatValue && formatValue === "number") {
            if (/^\d*$/.test(value) || value === '') {
                onChange && onChange({target: {name, value: value}});
            }            
        } else {
            onChange && onChange({target: {name, value: value}});
        }

    }

  return (
    <div className='input-field' style={{...containerStyle}}>
        {labelType === 'nested' && (label || placeholder) && <div>{label || placeholder}</div>}
            {
                type === 'input' &&
            <input maxLength={maxLength} style={inputStyle} placeholder={placeholder || label} onChange={(e) => handleChange(e)} value={value}/>
            }
            {
                type === 'textarea' &&
            <textarea maxLength={maxLength} style={inputStyle} placeholder={placeholder || label} onChange={(e) => {
                onChange && onChange({target: {name, value: e.target.value}})
            }} value={value} />
            }
    </div>
  )
}

export default InputField