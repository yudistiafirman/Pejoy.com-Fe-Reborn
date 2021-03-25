import React, {useState} from 'react'
import './RegisterCss.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { GoogleLogin } from 'react-google-login';
import Axios from 'axios';
import { UrlAPI } from '../../Support/Constants/UrlAPI';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { connect } from 'react-redux';
import {loginSuccess} from './../../Redux/Actions/Auth/authAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SigninSchema = ({onClick, history, onClickForgot}) => {
    const [input, setInput] = useState({
        email : '',
        password : ''
    })
    const [error, setError] = useState({
        email : '',
        password : ''
    })

    const [errorStatus, setErrorStatus] = useState(false)
    const [eye, setEye] = useState(false)

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
                loginSuccess(res.data.token)
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
            if(!input.email || !input.password) throw new Error('Data belum complete')
            Axios.post(UrlAPI + 'authBaru/login', {email : input.email, password : input.password})
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
                toast.error('Login failed. Try again', {
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
            <h6>Welcome Back</h6>
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

            <p>or use your account</p>
            
            <div className='w-75 py-4'>
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
                <div onClick={onClickForgot} style={{textAlign : 'end'}}>
                    <p style={{fontSize : 14, fontWeight : 'bolder', cursor : 'pointer'}}>Forgot password</p>
                </div>
                <div className='align-self-end mt-3'>
                    <button 
                        onClick={onButtonSubmit}
                        className='aa-btn' 
                        disabled=
                            {
                                errorStatus || input.email === '' || input.password === '' ? true : false
                            }
                    >
                        Submit
                    </button>
                </div>
                <div className='mt-4'>
                    <p>Don't have an account ? <span onClick={onClick} style={{cursor : 'pointer'}}>Sign up</span></p>
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

export default connect(mapStateToProps, mapDispatchToProps) (SigninSchema)