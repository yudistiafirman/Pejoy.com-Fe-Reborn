import React, {useState} from 'react'
import './RegisterCss.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
import BeatLoader from "react-spinners/BeatLoader";
import { css } from "@emotion/core";
import Axios from 'axios';
import { UrlAPI } from '../../Support/Constants/UrlAPI';
import ModalUpdatePass from './ModalUpdatePass'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const UpdatePassword = (props) => {

    
    const [input, setInput] = useState({
        password : '',
        confirmPassword : ''
    })
    const [error, setError] = useState({
        password : '',
        confirmPassword : ''
    })
    const [eye, setEye] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorStatus, setErrorStatus] = useState(false)
    const [openModal, setOpenModal] = useState(false)

    const validationPassword = (e) => {
        const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
        let password = e.target.value

        if(re.test(password)){
            setError({...error, password : 'nice'})
            setErrorStatus(false)
        }else if(password.length === 0){
            setError({...error, password : 'Password tidak boleh kosong'})
            setErrorStatus(true)
        }else if(password.length < 8){
            setError({...error, password : 'Password minimal 8 character'})
            setErrorStatus(true)
        }
        else{
            setError({...error, password : 'Password at least A-z & 0-9'})
        }
        setInput({...input, password : e.target.value})
    }

    const validationConfirmPassword = (e) => {
        let confirmPassword = e.target.value
        const password = input.password && input.password

        if(confirmPassword.length === 0){
            setError({...error, confirmPassword : 'Password tidak boleh kosong'})
            setErrorStatus(true)
        }else if(password !== confirmPassword){
            setError({...error, confirmPassword : 'Password not match'})
            setErrorStatus(true)
        }else{
            setError({...error, confirmPassword : 'nice'})
            setErrorStatus(false)
        }
        setInput({...input, confirmPassword : e.target.value})
    }
    
    const onButtonSubmit = () => {
        let email = props.match.params.id
        try {
            if(!input.password || !input.confirmPassword) throw new Error('Password tidak boleh kosong')
            if(input.password !== input.confirmPassword) throw new Error( 'Password not match')
            setLoading(true)
            Axios.post(UrlAPI + 'authBaru/update-password', {email : email, password : input.password})
            .then((res) => {
                if(res.data.error){
                    console.log(res.data)
                }else{
                    setOpenModal(true)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='container right-side-container' style={{maxWidth : 500, paddingTop : 200, paddingBottom : 150}}>
            <ModalUpdatePass modalOpen={openModal} />
            <h5>Reset Password</h5>
            <p style={{fontSize : 13}}>Enter for new password </p>

            <div className='w-75 py-4'>
                <div className='d-flex'>
                    <span className='icon-in-form'>
                        <FontAwesomeIcon icon={faLock} />
                    </span>
                    <div className='input-box'>
                        <input className={error.password === '' ? 'input-norm' : error.password === 'nice' ? 'input-valid' : 'input-notvalid'} type={eye === true ? 'text':'password' } value={input.password} onChange={(e) => validationPassword(e)}/>
                        <label 
                            className={input.password !== '' && error.password === '' ? 'input-filed' : 
                            input.password !== '' && error.password === 'nice' ? 'input-filed-valid' : 
                            input.password !== '' && error.password !== 'nice' && error.password !== '' ? 'input-filed-notvalid' : 
                            input.password === '' && error.password !== 'nice' && error.password !== '' ? 'input-filed-notvalid' : ''} >
                                Password
                        </label>
                        <p>{error.password !== 'nice' ? error.password : ''}</p>
                        <span onClick={() => setEye(!eye)} className='icon-eye' style={{display : input.password !== '' ? 'inline' : 'none'}}>
                            <FontAwesomeIcon icon={eye === true ? faEyeSlash : faEye} />
                        </span>
                    </div>
                </div>
                <div className='d-flex'>
                    <span className='icon-in-form' >
                        <FontAwesomeIcon icon={faLock} />
                    </span>
                    <div className='input-box'>
                        <input className={error.confirmPassword === '' ? 'input-norm' : error.confirmPassword === 'nice' ? 'input-valid' : 'input-notvalid'} type={eye === true ? 'text':'password' } value={input.confirmPassword} onChange={(e) => validationConfirmPassword(e)} />
                        <label 
                            className={input.confirmPassword !== '' && error.confirmPassword === '' ? 'input-filed' : 
                            input.confirmPassword !== '' && error.confirmPassword === 'nice' ? 'input-filed-valid' : 
                            input.confirmPassword !== '' && error.confirmPassword !== 'nice' && error.confirmPassword !== '' ? 'input-filed-notvalid' : 
                            input.confirmPassword === '' && error.confirmPassword !== 'nice' && error.confirmPassword !== '' ? 'input-filed-notvalid' : ''} >
                                Confirm Password
                        </label>
                        <p>{error.confirmPassword !== 'nice' ? error.confirmPassword : ''}</p>
                        <span onClick={() => setEye(!eye)} className='icon-eye' style={{display : input.confirmPassword !== '' ? 'inline' : 'none'}}>
                            <FontAwesomeIcon icon={eye === true ? faEyeSlash : faEye} />
                        </span>
                    </div>
                </div>
                <div className='align-self-end mt-3'>
                    <button 
                        onClick={onButtonSubmit}
                        className='aa-btn' 
                        disabled=
                            {
                                errorStatus || input.password === '' || input.confirmPassword === '' ? true : false
                            }
                    >
                        {
                            loading ?
                            <BeatLoader
                            css={override}
                            size={10}
                            color={"#000"}
                            loading={loading}
                            />
                            :
                            <p>Submit</p>
                        }
                    </button>
                </div>
                <div className='mt-4'>
                    <p>Have an account ? <span  style={{cursor : 'pointer'}}>Sign in</span></p>
                </div>
            </div>
            
        </div>
    )
}

export default UpdatePassword