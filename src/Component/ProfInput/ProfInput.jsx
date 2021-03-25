import React from 'react'
import './PropInput.css'



const ProfileInput =({blur,defaultValue,onChange,onBlur,required,value,disabled,label})=>{
    return   <div className={blur?'input-blur':'p-input-field'}>
                   
    <input  defaultValue={defaultValue} disabled={disabled} value={value} onChange={onChange} onBlur={onBlur} required={required} type="text"/>
    <label  htmlFor={label}>{label}</label>
  
   </div>
}

export default ProfileInput