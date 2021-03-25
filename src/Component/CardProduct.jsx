import React, {useState } from 'react'

import flash from './../Support/Images/flash-without-border.png'

import MdStar from 'react-ionicons/lib/Star'

import { ApiUrl } from '../Constant/ApiUrl'
import {  useHistory } from 'react-router-dom'




const CardProduct = ({name, price, image1, image2, brands, discount, flashSale, starCount, id}) => {
    const [onHover, setOnhover] = useState(false)
    let history=useHistory()
 
 
    return (
        <div onClick={()=>history.push('/detail-product/'+id)} className='col-6 col-md-4 container-card-product'>
            <div className='card-container' onMouseEnter={() => {setOnhover(true)}} onMouseLeave={() => {setOnhover(false)}} >
                <div className=' container-image w-100' style={{padding : 10}} >
                    <img 
                    alt='img-card'
                    className='image-card'
                    src={onHover ? ApiUrl + 'public/product/' + image1 : ApiUrl + 'public/product/' + image2}
                    />
                </div>
                <span style={{position : 'absolute',top : 25, left : 18,}}>
                    <img
                    alt='flash' 
                    style={{height : 25, width : 25, display : flashSale === 1 ? 'block' : 'none'}}
                    src={flash} 
                    />
                </span>
            

                {/* <span onMouseEnter={() => setBagHover(true)} onMouseLeave={() => setBagHover(false)} style={{visibility : onHover ? 'visible' : 'hidden',position : 'absolute',bottom : 180, right : 25, backgroundColor : bagHover ? 'black' : 'white', paddingTop : 4, paddingBottom : 4, paddingLeft : 8, paddingRight : 8}}>
                    <span style={{display : 'flex', justifyContent : 'center'}}>
                        <p style={{color : bagHover ? 'white' : 'black', fontSize : 14, marginRight : 8}}>Add to Cart</p>
                        <img alt='bag' src={bagHover ? sbagWhite : sbag} style={{ height : 20, width : 20}}/>
                    </span>
                </span> */}

                {/* <div style={{marginTop : 5, padding : 10}}>
                    <div className='p-2'>
                        <div style={{display : 'flex', alignItems : 'center', justifyContent : 'space-between'}}>
                            <p style={{fontSize : 12}}>Pick a Size :</p>
                            <IosCloseCircleOutline 
                                style={{cursor : 'pointer',width : 20, height : 20,}}  
                                fontSize="60px" color='black' />
                        </div>
                        <div style={{display : 'flex', marginTop : 10, flexWrap : 'wrap',}}>
                            <div className='border' style={{marginBottom : 10, marginLeft : 5, marginRight : 5,width : 30, height : 30, display : 'flex', justifyContent : 'center', alignItems : 'center'}} >
                                <p style={{fontSize : 12}}>S</p>
                            </div>
                        </div>
                    </div>
                </div> */}

                <div style={{marginTop : 10, padding : 10}}>
                    <p style={{fontSize : 12, color : 'green'}}>{brands}</p>
                
                        <p style={{fontSize : 16}}>
                            {name}
                        </p>
            

                    <span>
                        <p style={{marginTop : 5}}>
                            {
                                discount === null ?
                                <span>Rp. {(parseInt(price)).toLocaleString('id-ID')}</span>
                                :
                                <s>Rp. {(parseInt(price)).toLocaleString('id-ID')}</s>
                            }
                        </p>
                        <p style={{color : "green", visibility : discount !== null ? 'visible' : 'hidden'}}>
                            Rp. {(price - (price * (discount/100))).toLocaleString('id-ID')}
                        </p>
                    </span>

                    <div style={{marginTop : 5}}>
                        {
                            starCount !== null ?
                                Array.apply(null, {length: starCount}).map(Number.call, Number).map((val) => {
                                   return(
                                       <MdStar style={{width : 20, height : 20}}  fontSize="60px" color='orange' />
                                   )
                               })
                            :
                            null
                        }    
                    </div>
                </div>
                    
                
            </div>
        </div>
    )
}

export default CardProduct