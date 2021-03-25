import React from 'react'
import MdStar from 'react-ionicons/lib/Star'
import MdStarOutline from 'react-ionicons/lib/StarOutline'
import {dateFormatter}from '../../../Support/Functions/dateFormatter'
function CardReview ({rating, review, onClick}){

    return (
        <div className='row'>
            <div className='col-md-6' style={{padding : 14}}>
                <div className='border' style={{height : 300 ,display : 'flex', flexDirection : 'column', justifyContent : 'space-around', alignItems : 'center'}}>
                    <p style={{fontSize : 80, fontWeight : 'bolder'}}>{rating && rating}</p>
                    
                    <span style={{marginTop : -40,display : 'flex', flexDirection : 'column', alignItems : 'center'}}>
                        
                        <span className=''>

                            {
                                Array.apply(null, {length: rating && rating}).map(Number.call, Number).map((val) => {
                                    return(
                                        <MdStar fontSize="22px" color='orange' />
                                    )
                                })
                            }
                            {
                                Array.apply(null, {length: rating && 5 - rating}).map(Number.call, Number).map((val) => {
                                    return(
                                        <MdStar fontSize="22px" color='#dbf6e9' />
                                    )
                                })
                            }
                            
                        </span>
                        <p style={{fontSize : 14, marginTop : 5}}>Overall rating based on {review && review.length} reviews</p>
                    </span>
                    <div onClick={onClick} style={{cursor:'pointer',pointerEvents:'all',border:'2px solid black'}} className='border pt-2 pb-2 pl-5 pr-5 '>
                        <p style={{fontSize : 14}}>Leave Your Own</p>
                    </div>

                </div>
            </div>
            <div className='col-md-6' style={{padding : 14}}>
                <div className='border pl-3 pr-3 pt-2 pb-2' style={{ height : 300 ,width : '100%',display : 'flex', flexDirection : 'column', justifyContent : 'space-between', flexWrap : 'wrap'}}>
                    {
                        review ?
                        <h2 style={{fontWeight : 'bolder', letterSpacing : 1, }}>"{review[0].review}"</h2>
                        :
                        <h2 style={{fontWeight : 'bolder', letterSpacing : 1, visibility : 'hidden'}}>""</h2>
                    }
                    <div>
                        {
                            review ?
                            <span className=''>
                                {
                                    Array.apply(null, {length: review[0].rating}).map(Number.call, Number).map((val) => {
                                        return(
                                            <MdStar fontSize="15px" color='orange' />
                                        )
                                    })
                                }
                                {
                                    Array.apply(null, {length: 5 - review[0].rating}).map(Number.call, Number).map((val) => {
                                        return(
                                            <MdStar fontSize="15px" color='#dbf6e9' />
                                        )
                                    })
                                }
                            </span>
                            :
                            Array.apply(null, {length: 5}).map(Number.call, Number).map((val) => {
                                return(
                                    <MdStarOutline fontSize="15px" color='#dbf6e9' />
                                )
                            })
                            
                        }
                        {
                            review ?
                            <div>
                            <p style={{fontSize : 14,fontWeight:'bold'}}>{review[0].full_name?review[0].full_name:'Anonymus'}</p>
                            <p style={{fontSize : 14,fontWeight:'bold',color:'#9ddfd3'}}>at {dateFormatter(review[0].created_at)}</p>
                            </div>
                            :
                            <p style={{fontSize : 14}}>No one has written a review yet</p>

                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardReview