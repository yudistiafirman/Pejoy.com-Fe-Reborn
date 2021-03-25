import React, {useState} from 'react'
import './RegisterCss.css'
import  Gambar1 from './../../Support/Images/undraw_Designer_girl_s028.svg'
import Gambar2 from './../../Support/Images/svg_1.svg'
import Gambar3 from './../../Support/Images/svg_2.svg'
import Gambar4 from './../../Support/Images/svg_3.svg'
import Gambar5 from  './../../Support/Images/svg_4.svg'



import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SignupSchema from './SignupSchema';
import SigninSchema from './SigninSchema';
import ForgotPassword from './ForgotPassword'



const RegistrationBaru = (props) => {
    const [loginActive, setLoginActive] = useState(false)
    const [signupActive, setSignupActive] = useState(false)
    const [forgotPass, setForgotPass] = useState(false)
    
    const desktopSettings = {
        dots: false,
        autoplay: true,
        fade: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1
    }

    return (
        <div className='container' style={{paddingTop : 190, paddingBottom : 110}}>
            <div className='row' style={{position : 'relative'}}>
                <div className='col-md-7 p-5 container-carousel-left'>
                    <Slider {...desktopSettings}>
                        <div className='banner-left-side'>
                            <img alt="#" style={{width:'100%',height:'100%'}} src={Gambar1}/>
                        </div>
                        <div className='banner-left-side'>
                            <img alt="#" style={{width:'100%',height:'100%'}} src={Gambar2}/>
                        </div>
                        <div className='banner-left-side'>
                            <img alt="#" style={{width:'100%',height:'100%'}} src={Gambar3}/>
                        </div>
                        <div className='banner-left-side'>
                            <img alt="#" style={{width:'100%',height:'100%'}} src={Gambar4}/>
                        </div>
                        <div className='banner-left-side'>
                            <img alt="#" style={{width:'100%',height:'100%'}} src={Gambar5}/>
                        </div>
                      
                    </Slider>
                </div>
                <div className={signupActive ? 'col-md-5 py-5 signup-schema signup-schema-active' : 'col-md-5 py-5 signup-schema' }>
                    <SignupSchema history={props.history} onClick={() => {setSignupActive(!signupActive); setLoginActive(!loginActive)}} />
                </div>
                <div  className={loginActive ? forgotPass ? 'col-md-5 py-5 login-schema login-schema-active login-forgot-active': 'col-md-5 py-5 login-schema login-schema-active'  : 'col-md-5 py-5 login-schema'}>
                    <SigninSchema onClickForgot={() => {setForgotPass(!forgotPass)}} history={props.history} onClick={() => {setLoginActive(!loginActive);setSignupActive(!signupActive)}} />
                </div>
                <div className={forgotPass ? 'col-md-5 py-5 forgot-password forgot-password-active' : 'col-md-5 py-5 forgot-password'}>
                    <ForgotPassword onClick={() => {setForgotPass(!forgotPass)}} />
                </div>
            </div>
        </div>
    )
}

export default RegistrationBaru