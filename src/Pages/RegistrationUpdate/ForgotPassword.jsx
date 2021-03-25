import React, {useState} from 'react'
import './RegisterCss.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import Axios from 'axios';
import { UrlAPI } from '../../Support/Constants/UrlAPI';
import ModalForgot from './ModalForgot';
import BeatLoader from "react-spinners/BeatLoader";
import { css } from "@emotion/core";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const ForgotPassword = ({onClick}) => {

    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [modalOpen, setModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const validationEmail = (e) => {
        const re = /\S+@\S+\.\S+/;
        let email = e.target.value

        if(re.test(email.toLowerCase())){
            setError('nice')
        }else if(email.length === 0){
            setError('Email tidak boleh kosong')
        }else{
            setError('Email format salah!')
        }
        setEmail(e.target.value)
    }

    const onSubmitButton = () => {
        try {
            if(email === '') throw new Error('Email tidak boleh kosong')
            setLoading(true)
            Axios.post(UrlAPI + 'authBaru/forgotpassword', {email : email})
            .then((res) => {
                if(res.data.error){
                    setLoading(false)
                    toast.error(res.data.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                }else{
                    setModalOpen(true)
                    setLoading(false)
                }
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='right-side-container w-100'>
            <ToastContainer />
            <ModalForgot modalOpen={modalOpen} />
            <h6>Forgot Password </h6>
            <p>Don't worry your account be right back, please enter your valid email.</p>
            <div className='w-75 py-4'>
                <div className='d-flex'>
                    <span className='icon-in-form'>
                        <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                    <div className='input-box'>
                        <input className={email === '' ? 'input-norm' : error === 'nice' ? 'input-valid' : 'input-notvalid'} type='text' value={email} onChange={(e) => validationEmail(e)} />
                        <label 
                            className={email !== '' && error === '' ? 'input-filed' : 
                            email !== '' && error === 'nice' ? 'input-filed-valid' : 
                            email !== '' && error !== 'nice' && error !== '' ? 'input-filed-notvalid' : 
                            email === '' && error !== 'nice' && error !== '' ? 'input-filed-notvalid' : ''} >
                                Email
                        </label>
                        <p>{error !== 'nice' ? error : ''}</p>
                    </div>
                </div>
                <div className='align-self-end mt-3'>
                    <button 
                        onClick={onSubmitButton}
                        className='aa-btn' 
                        disabled=
                            {
                                error === '' || error !== 'nice' || email === '' ? true : false
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
                    <p onClick={onClick} style={{cursor : 'pointer'}}>Back to signin</p>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword