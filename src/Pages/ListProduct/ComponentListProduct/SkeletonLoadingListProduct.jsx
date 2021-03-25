import React from 'react'

import Skeleton from 'react-loading-skeleton';


const SkeletonLoadingListProduct = ({name, price, image1, image2, brands, discount, flashSale, starCount, id}) => {

    return (
        <div className='col-md-12 row'>
            <div className='col-6 col-md-4 mb-4' >
                <Skeleton height={350} duration={1}  style={{borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}/>
                <div style={{display : 'flex', flexDirection : 'column', marginTop : 20}}>
                    <Skeleton width={60} heigh />
                    <Skeleton style={{marginTop : 10}} />
                    <Skeleton />
                    <Skeleton style={{marginTop : 15}} />
                </div>
            </div>
            <div className='col-6 col-md-4 mb-4' >
                <Skeleton height={350} duration={1}  style={{borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}/>
                <div style={{display : 'flex', flexDirection : 'column', marginTop : 20}}>
                    <Skeleton width={60} heigh />
                    <Skeleton style={{marginTop : 10}} />
                    <Skeleton />
                    <Skeleton style={{marginTop : 15}} />
                </div>
            </div>
            <div className='col-6 col-md-4 mb-4' >
                <Skeleton height={350} duration={1}  style={{borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}/>
                <div style={{display : 'flex', flexDirection : 'column', marginTop : 20}}>
                    <Skeleton width={60} heigh />
                    <Skeleton style={{marginTop : 10}} />
                    <Skeleton />
                    <Skeleton style={{marginTop : 15}} />
                </div>
            </div>
            <div className='col-6 col-md-4 mb-4' >
                <Skeleton height={350} duration={1}  style={{borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}/>
                <div style={{display : 'flex', flexDirection : 'column', marginTop : 20}}>
                    <Skeleton width={60} heigh />
                    <Skeleton style={{marginTop : 10}} />
                    <Skeleton />
                    <Skeleton style={{marginTop : 15}} />
                </div>
            </div>
            <div className='col-6 col-md-4 mb-4' >
                <Skeleton height={350} duration={1}  style={{borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}/>
                <div style={{display : 'flex', flexDirection : 'column', marginTop : 20}}>
                    <Skeleton width={60} heigh />
                    <Skeleton style={{marginTop : 10}} />
                    <Skeleton />
                    <Skeleton style={{marginTop : 15}} />
                </div>
            </div>
            <div className='col-6 col-md-4 mb-4' >
                <Skeleton height={350} duration={1}  style={{borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}/>
                <div style={{display : 'flex', flexDirection : 'column', marginTop : 20}}>
                    <Skeleton width={60} heigh />
                    <Skeleton style={{marginTop : 10}} />
                    <Skeleton />
                    <Skeleton style={{marginTop : 15}} />
                </div>
            </div>
            
        </div>
    )
}

export default SkeletonLoadingListProduct