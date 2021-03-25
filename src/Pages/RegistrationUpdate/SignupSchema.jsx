import React, {useState} from 'react'
import './RegisterCss.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin } from 'react-google-login';
import Axios from 'axios';
import { UrlAPI } from '../../Support/Constants/UrlAPI';
import {loginSuccess} from './../../Redux/Actions/Auth/authAction'
import { connect } from 'react-redux';
import BeatLoader from "react-spinners/BeatLoader";
import { css } from "@emotion/core";
import Swal from 'sweetalert2';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const SignupSchema = ({onClick, history, loginSuccess}) => {
    const [input, setInput] = useState({
        email : '',
        password : '',
        confirmPassword : '',
        username : ''
    })
    const [error, setError] = useState({
        email : '',
        password : '',
        confirmPassword : '',
        username : ''
    })
    const [errorStatus, setErrorStatus] = useState(false)
    const [eye, setEye] = useState(false)
    const [loading, setLoading] = useState(false)



    const validationEmail = (e) => {
        const re = /\S+@\S+\.\S+/;
        let email = e.target.value

        if(re.test(email.toLowerCase())){
            setError({...error, email : 'nice'})
            setErrorStatus(false)
        }else if(email.length === 0){
            setError({...error, email : 'Email tidak boleh kosong'})
            setErrorStatus(true)
        }else{
            setError({...error, email : 'Email format salah!'})
            setErrorStatus(true)
        }
        setInput({...input, email : e.target.value})
    }

    const validationUsername = (e) => {
        let username = e.target.value

        if(username.length === 0){
            setError({...error, username : 'Username tidak boleh kosong'})
            setErrorStatus(true)
        }else if(username.length < 3 || username.length > 32 ){
            setError({...error, username : 'Username minimal 3 char dan maksimal 32 char'})
            setErrorStatus(true)
        }else{
            setError({...error, username : 'nice'})
            setErrorStatus(false)
        }
        setInput({...input, username : e.target.value})
    }

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

    // send google token
    const sendGoogleToken = tokenId => {
        Axios.post(UrlAPI + 'authBaru/googlelogin', {idToken : tokenId})
        .then((res) => {
            if(res.data.error){
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
                loginSuccess(res.data.message)
                localStorage.setItem('token', res.data.token)
                if(res.data.role === 0){
                    window.location = ('/')
                }else{
                    window.location = ('/member')
                }
            }
        })
        .catch((err) => {
            toast.error('Login with Google failed, try again', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        })
    }

    const responseGoogle = response => {
        console.log(response)
        sendGoogleToken(response.tokenId)
    }

    const sendFacebookToken = (userID, accessToken) => {
        Axios.post(UrlAPI + 'authBaru/facebooklogin', {userID, accessToken})
        .then((res) => {
            if(res.data.error){
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
                loginSuccess(res.data.message)
                localStorage.setItem('token', res.data.token)
                if(res.data.role === 0){
                    window.location = ('/')
                }else{
                    window.location = ('/member')
                }
            }
        })
        .catch((err) => {
            toast.error('Login with Facebook failed, try again', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        })
    }

    const responseFacebook = response => {
        sendFacebookToken(response.userID, response.accessToken)
    }

    const onButtonSubmit = () => {
        try {
            if(!input.email || !input.password || !input.confirmPassword || !input.username) throw new Error('Data tidak lengkap')
            if(input.password !== input.confirmPassword) throw new Error('Password tidak sama')
            
            setLoading(true)
            Axios.post(UrlAPI + 'authBaru/register', {email : input.email, password : input.password, username : input.username})
            .then((res) => {
                if(res.data.error){
                    toast.error(res.data.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                    setLoading(false)
              
                }else{
                    setLoading(false)
                    console.log(res.data.message)
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Register Success!',
                        text:res.data.message,
                        showConfirmButton: true,
                       
                    })
                    // localStorage.setItem('token', res.data.token)
                    // if(res.data.role === 0){
                    //     window.location = ('/')
                    // }else{
                    //     window.location = ('/member')
                    // }
                }
            })
            .catch((err) => {
                setLoading(false)
                toast.error('Signup failed, try again', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='right-side-container w-100'>
            <ToastContainer />
            <h6>Create accout here</h6>
            <div className='social-auth'>
                <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                render={renderProps => (
                    <div onClick={renderProps.onClick} className='icon-social'>
                        <FontAwesomeIcon icon={faGoogle} />
                    </div>
                )}
                >
                </GoogleLogin>

                <FacebookLogin
                appId={process.env.REACT_APP_FACEBOOK_CLIENT}
                autoLoad={false}
                callback={responseFacebook}
                render={renderProps => (
                    <div onClick={renderProps.onClick} className='icon-social'>
                        <FontAwesomeIcon icon={faFacebookSquare} style={{fontSize : 18}} />
                    </div>

                )}
                >
                </FacebookLogin>
                
                <div className='icon-social'>
                    <FontAwesomeIcon icon={faTwitter} />
                </div>
            </div>

            <p>or use email for registration</p>
            
            <div className='w-75 py-4'>
                <div className='d-flex'>
                    <span className='icon-in-form'>
                        <FontAwesomeIcon icon={faUser} />
                    </span>
                    <div className='input-box'>
                        <input className={error.username === '' ? 'input-norm' : error.username === 'nice' ? 'input-valid' : 'input-notvalid'} type='text' value={input.username} onChange={(e) => validationUsername(e)} />
                        <label 
                            className={input.username !== '' && error.username === '' ? 'input-filed' : 
                            input.username !== '' && error.username === 'nice' ? 'input-filed-valid' : 
                            input.username !== '' && error.username !== 'nice' && error.username !== '' ? 'input-filed-notvalid' : 
                            input.username === '' && error.username !== 'nice' && error.username !== '' ? 'input-filed-notvalid' : ''} >
                                Username
                        </label>
                        <p>{error.username !== 'nice' ? error.username : ''}</p>
                    </div>
                </div>
                <div className='d-flex'>
                    <span className='icon-in-form'>
                        <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                    <div className='input-box'>
                        <input className={error.email === '' ? 'input-norm' : error.email === 'nice' ? 'input-valid' : 'input-notvalid'} type='text' value={input.email} onChange={(e) => validationEmail(e)} />
                        <label 
                            className={input.email !== '' && error.email === '' ? 'input-filed' : 
                            input.email !== '' && error.email === 'nice' ? 'input-filed-valid' : 
                            input.email !== '' && error.email !== 'nice' && error.email !== '' ? 'input-filed-notvalid' : 
                            input.email === '' && error.email !== 'nice' && error.email !== '' ? 'input-filed-notvalid' : ''} >
                                Email
                        </label>
                        <p>{error.email !== 'nice' ? error.email : ''}</p>
                    </div>
                </div>
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
                                errorStatus || input.email === '' || input.password === '' || input.confirmPassword === '' || input.username === '' ? true : false
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
                    <p>Have an account ? <span onClick={onClick} style={{cursor : 'pointer'}}>Sign in</span></p>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        login : state.login
    }
}

const mapDispatchToProps = {
    loginSuccess
}

export default connect(mapStateToProps, mapDispatchToProps) (SignupSchema)