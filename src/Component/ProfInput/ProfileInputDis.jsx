import React from 'react'
import './ProfInputDis.css'



const ProfInputDis=({defaultValue,label,isPhone,onClick,sideLabel})=>{
    return   <div className="p-input-field disabled">
                   
    <input defaultValue={defaultValue} type="text" disabled/>
  <label htmlFor={label}>{label}</label>
   <span className="side-label" onClick={onClick}>{sideLabel}</span>
   {isPhone? <p className="verified-phone">verified phone number</p>:null}
   </div>
}


export default ProfInputDis