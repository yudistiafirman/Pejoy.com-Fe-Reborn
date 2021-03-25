import React, { useState } from 'react';
import { connect } from 'react-redux';
import ProfileInput from '../../Component/ProfInput/ProfInput'
import ProfileInputDis from '../../Component/ProfInput/ProfileInputDis'
import Check from 'react-ionicons/lib/CheckmarkCircleOutline'
import './UserProfile.css';
import UserProfileSkelaton from '../../Component/Skelaton/UserProfileSkelaton';
import Swal from 'sweetalert2'
import axios from 'axios';


const Profile =({user})=>{
    
        const [fullName,SetFullname]=useState({
            fullnameValue:'',
            fullnameError:'',
            fullNameDisable:true
        })
        const {fullnameValue,fullnameError,fullNameDisable}=fullName
   

      

    


       
        if(user.data === null){
            return(
               <UserProfileSkelaton/>
            )
        }
        const onInsertName=()=>{
            try {

                SetFullname({...fullName,fullNameDisable:true})
                if(!fullnameValue)throw new Error('input nama anda tidak boleh kosong')
                if(fullnameValue.length<4) throw new Error('input minimal harus mengandung 3 karakter')

                const token= localStorage.getItem('token')
                axios.patch(`${process.env.REACT_APP_API_URL}authBaru/changename/${token}`,{newName:fullnameValue}).then((response)=>{
                    if(response.data.success){
                        Swal.fire({
                            title:'Ganti username telah berhasil',
                            text:response.data.message,
                            icon:'success',
                            showConfirmButton: true,
                            
                        })
                        SetFullname({...fullName,fullNameDisable:true})
                    }else{
                        Swal.fire({
                            title:'Ooopsss!!',
                            text:response.data.message,
                            icon:'error',
                            showConfirmButton: true,
                            
                        })
                        SetFullname({...fullName,fullNameDisable:true})
                    }
                       
    
                }).catch((error)=>{
                    Swal.fire({
                        title:'Ooopsss!!',
                        text:error.message,
                        icon:'error',
                        showConfirmButton: true,
                        
                    })
                    SetFullname({...fullName,fullNameDisable:true})
                })
            } catch (error) {
                Swal.fire({
                    title:'Oooopsss',
                    text:error,
                    icon:'error',
                    showConfirmButton:true,
                })
                SetFullname({...fullName,fullNameDisable:true})
            }

         
            
        }
        return(
            // PROFILE
            <div>
                <div className="font-weight-bold pa-font-size-30">
                    Profile
                </div>
                <div  className="px-0 py-4 profile-form-container ">

                    <div className="form-group" style={{height:'80px',position:'relative'}}>
                            {
                                fullNameDisable? <ProfileInputDis label="username" defaultValue={fullnameValue?fullnameValue:user.data.data[0].user_name}/>
                                                        :
                                                  <ProfileInput label="username" defaultValue={user.data.data[0].user_name?user.data.data[0].user_name:user.data.data[0].email} onChange={(e)=>SetFullname({fullnameValue:e.target.value,fullnameError:e.target.value.length<4?"Nama lengkap minimal mengandung 3 karakter":''})}/>
                            }
                        
                          <p  className="profile-error-message">{fullnameError}</p>
                          <div className="profile-badge">
                              {
                                  fullnameValue.length>0&& fullnameError.length===0?<button onClick={onInsertName}  className="btn btn-primary  " >Simpan</button>
                                                                                :
                                                                                <button onClick={()=>SetFullname({...fullName,fullNameDisable:false})}  className="btn btn-primary  " >Ubah </button>
                              }
                      
  
                         
                         
                          </div>
                       
                     </div>
                    
                    <div style={{height:'80px',position:'relative'}} className="form-group">
                       <ProfileInputDis label="Email" defaultValue={user.data.data[0].email}/>
                                        
                        
                    
                    <div aria-disabled className="btn btn-success disable profile-badge" >
                        <Check color="#ffff" />
                        terverifikasi
                        </div>
                    </div>
                        
       
                   
                </div>
            </div>
                    
                 
                    
                      
                      
   
        )
    }


const mapStateToProps = (state) => {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps, null)(Profile)