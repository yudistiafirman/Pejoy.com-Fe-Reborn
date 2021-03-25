import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Loader from 'react-spinners/BeatLoader'
import Swal from 'sweetalert2'
const Verification = () => {

    const [loading,SetLoading]=useState(false)
    let {token}=useParams()
    useEffect(()=>{
            if(token){
                onVerifiedEmail(token)
            }
    },[token])
    const onVerifiedEmail=(tokenParams)=>{
        SetLoading(true)
        axios.patch(`${process.env.REACT_APP_API_URL}authBaru/verified/${tokenParams}`).then((response)=>{
                  
                    if(response.data.success){
                        localStorage.setItem('token',response.data.token)
                        SetLoading(false)
                    }else{
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'Ooppss!!',
                            text:response.data.message,
                            showConfirmButton: true,
                           
                        })
                        SetLoading(false)
                    }
        }).catch((error)=>{
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Ooppss!!',
                text:error.message,
                showConfirmButton: true,
               
            })
            SetLoading(false)
        })

    }
    if(loading){
            <Loader/>
    }
    return (
        <div className='container' style={{paddingTop : 120}}>
                        <div class="jumbotron text-center">
                            <h1 class="display-3">Terima kasih!</h1>
                        <p class="lead"><strong>Selamat Bergabung Dengan Pejoy.com</strong> silahkan click tombol dibawah untuk pergi ke homepage</p>
                        <hr/>
                         
                        <p> Having trouble? <a href="">Contact us</a> </p>
                    
                    <p class="lead">
                         <a class="btn btn-primary btn-sm" href="http://localhost:3000" role="button">Continue to homepage</a>
                     </p>
                    </div>
            
        </div>
    )
}

export default Verification