import React, { Component }  from 'react';
import Slider from 'react-slick';
import Skeleton from 'react-loading-skeleton';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './LandingPage.css';

import FlashIcon from './../../Support/Images/Flash.png';

export class FlashSaleProductLoadingDesktop extends Component {
    render(){
        
        const mobileSettings = {
            autoplay: true,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: true
          }
    
        //   const desktopSettings = {
        //     autoplay: true,
        //     infinite: true,
        //     slidesToShow: 5,
        //     slidesToScroll: 1,
        //     dots: false
        //   }

      return( 
        <div className="d-block d-md-none">
            <div className="px-0 py-0 pa-bg-main-light">
                <div className="container px-3 py-3">
                    <div>
                    <span>
                        <img src={FlashIcon} alt="#" width="35" style={{marginTop: -14, marginBottom: 0}} />
                    </span>
                    <span className="mx-3 my-0 pa-font-size-30 pa-light">
                        Flash Sale
                    </span>
                    </div>
                    <div className="pt-3 pb-3">
                    <Slider {...mobileSettings}>
                        <div className="px-1 py-0">
                            <div>
                                <Skeleton width height={200} duration={1} style={{borderBottomLeftRadius: 0, borderBottomRightRadius: 0}} />
                                <div className="px-3 py-4 pa-bg-light" style={{width: "100%", borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}>
                                <p className="pa-font-size-16">
                                    <Skeleton width={110} height={10} duration={1} />
                                </p>
                                <p className="font-weight-bold pa-font-size-16 pa-secondary">
                                    <Skeleton width={75} height={10} duration={1} />
                                </p>
                                <div className="progress mx-0 my-2" style={{height: 5}}>
                                    <Skeleton width={185} height={10} duration={1} />
                                </div>
                                <p className="pa-font-size-12 pa-dark-grey" style={{marginTop: -6}}>
                                    <Skeleton width={30} height={5} duration={1} />
                                </p>
                                </div>
                            </div>
                        </div>
                        <div className="px-1 py-0">
                            <div>
                                <Skeleton width height={200} duration={1} style={{borderBottomLeftRadius: 0, borderBottomRightRadius: 0}} />
                                <div className="px-3 py-4 pa-bg-light" style={{width: "100%", borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}>
                                <p className="pa-font-size-16">
                                    <Skeleton width={110} height={10} duration={1} />
                                </p>
                                <p className="font-weight-bold pa-font-size-16 pa-secondary">
                                    <Skeleton width={75} height={10} duration={1} />
                                </p>
                                <div className="progress mx-0 my-2" style={{height: 5}}>
                                    <Skeleton width={185} height={10} duration={1} />
                                </div>
                                <p className="pa-font-size-12 pa-dark-grey" style={{marginTop: -6}}>
                                    <Skeleton width={30} height={5} duration={1} />
                                </p>
                                </div>
                            </div>
                        </div>
                        <div className="px-1 py-0">
                            <div>
                                <Skeleton width height={200} duration={1} style={{borderBottomLeftRadius: 0, borderBottomRightRadius: 0}} />
                                <div className="px-3 py-4 pa-bg-light" style={{width: "100%", borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}>
                                <p className="pa-font-size-16">
                                    <Skeleton width={110} height={10} duration={1} />
                                </p>
                                <p className="font-weight-bold pa-font-size-16 pa-secondary">
                                    <Skeleton width={75} height={10} duration={1} />
                                </p>
                                <div className="progress mx-0 my-2" style={{height: 5}}>
                                    <Skeleton width={185} height={10} duration={1} />
                                </div>
                                <p className="pa-font-size-12 pa-dark-grey" style={{marginTop: -6}}>
                                    <Skeleton width={30} height={5} duration={1} />
                                </p>
                                </div>
                            </div>
                        </div>
                    </Slider>
                    </div>
                </div>
            </div>
        </div>
      )
    }
}

export default FlashSaleProductLoadingDesktop