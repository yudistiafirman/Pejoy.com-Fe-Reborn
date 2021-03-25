import React from 'react'
import Skeleton from 'react-loading-skeleton'

const SkeletonDetailProduct = () => {
    return (
        <div className='container' style={{paddingTop : 120}}>
            <div className='row'>
                <div className='col-md-7'>
                    <div className='pb-4 border-bottom'>
                        <div style={{display : 'flex'}}>
                            <div>
                                <div className='my-3' >
                                    <Skeleton height={100} width={100} duration={1} />
                                </div>
                                <div className=' my-3' >
                                    <Skeleton height={100} width={100} duration={1} />
                                </div>
                                <div className=' my-3'>
                                    <Skeleton height={100} width={100} duration={1} />
                                </div>
                                <div className=' my-3'>
                                    <Skeleton height={100} width={100} duration={1} />
                                </div>
                            </div>
                                <div className='ml-5' style={{ width : '100%'}}>
                                    <Skeleton height={700} width={'100%'} duration={1} />
                                </div>
                                
                            

                        </div>
                    </div>
                    <div className='pt-3 pb-3 container-tabs' >
                        <span  style={{marginRight : 25, cursor : 'pointer'}} className={'border-bottom font-weight-bold'}>
                            <p>Review</p>
                        </span>
                        <span style={{marginRight : 25, cursor : 'pointer'}}>
                            <p>Shipping Informaton</p>
                        </span>
                        <span style={{marginRight : 25, cursor : 'pointer'}}>
                            <p>Refund Policy</p>
                        </span>
                    </div>
                    

                    <div >
                        
                    </div>

                </div>
                <div className='col-md-5 pl-5 pr-4'>
                    <div className='border-bottom pb-4'>
                        <p style={{fontSize : 30}}>
                            <Skeleton />
                        </p>
                        <p style={{fontSize : 18}}>
                            <Skeleton />
                        </p>
                        <div style={{display : 'flex', alignItems : 'center'}}>
                            <Skeleton />
                        </div>
                        <div style={{marginTop : 15}}>
                            <Skeleton />
                        </div> 
                    </div>
                    <div className='border-bottom pb-4'>
                        <div style={{marginTop : 15}}>
                            <p style={{fontSize : 18, marginBottom : 10}}>Description</p>
                            <p style={{fontSize : 12}}>
                                <Skeleton />
                            </p>
                        </div>  
                    </div>

                    <div className='pt-4 pb-4'>
                        <div className='border pt-2 pb-2 pl-3 pr-2' style={{display : 'flex', alignItems : 'center', justifyContent : 'space-between'}}>
                            <Skeleton />
                        </div>
                        <div className='border pt-2 pb-2 pl-3 pr-4 mt-1 choice-size' style={{backgroundColor : '#fff',width : '85%', opacity : 1, position : 'absolute'}}>
                            <Skeleton />
                        </div>
                        
                    </div>
                    <div style={{display : 'flex'}}>
                        <div className= 'border' style={{flex : 1,display : 'flex', alignItems : 'center', justifyContent : 'space-between'}}>
                            <Skeleton />
                        </div>
                        
                    </div>
                       
                    <div style={{marginTop : 10}}>
                        <p style={{fontSize : 12}}>Shipping rate information</p>

                    </div>

                </div>
                
            </div>
            
        </div>
    )
}

export default SkeletonDetailProduct