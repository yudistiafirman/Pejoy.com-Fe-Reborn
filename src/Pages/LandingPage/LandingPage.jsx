import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

import { getFlashSaleProducts } from './../../Redux/Actions/LandingPage/flashSaleAction';
import { getBestSellerProducts } from './../../Redux/Actions/LandingPage/bestSellerProductsAction';

import FlashSaleProductLoadingDesktop from './FlashSaleProductLoadingDesktop';
import FlashSaleProductLoadingMobile from './FlashSaleProductLoadingMobile';
import RecomendedProductLoading from './RecomendedProductLoading';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './LandingPage.css';

import TShirtIcon from './../../Support/Images/T-Shirt.png';
import PantsIcon from './../../Support/Images/Trousers.png';
import ShirtIcon from './../../Support/Images/Shirt.png';
import JacketIcon from './../../Support/Images/Jacket.png';
import ShoesIcon from './../../Support/Images/Shoes.png';
import Newsletter from './../../Support/Images/Newsletter.jpg';
import FlashIcon from './../../Support/Images/Flash.png';

export class LandingPage extends Component {
  
    componentDidMount(){
      this.props.getFlashSaleProducts()
      this.props.getBestSellerProducts()
    }

    mapFlashSaleProduct = () => {
      return this.props.flashSale.data.data.map((value, index) => {
        return(
          <div key={index + 1} className="px-1 py-0">
            <div>
              <Link to={'/detail-product/' + value.id}>
                <img src={'http://localhost:2000/public/product/' + String(value.url).split(',')[0]} alt={'Flash Sale Product Image ' + index + 1} width="100%" style={{borderTopLeftRadius: 5, borderTopRightRadius: 5}} />
              </Link>
              <div className="px-3 py-4 pa-bg-light" style={{width: "100%", borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}>
                <p className="pa-font-size-16">
                  {value.name}
                </p>
                <p className="font-weight-bold pa-font-size-16 pa-secondary">
                  Rp.{(value.price - (value.price * (value.discount / 100))).toLocaleString('id-ID')}
                    <span className="mx-1 my-0 font-weight-light pa-font-size-14 pa-light-grey">  
                      <del>
                        Rp.{value.price.toLocaleString('id-ID')}
                      </del>
                    </span>
                </p>
                <p>
                  <span className="mx-0 my-0 font-weight-light pa-font-size-14 pa-secondary">
                      {value.discount}% OFF
                    </span>
                </p>
                <div className="progress mx-0 my-2" style={{height: 5}}>
                  <div className="progress-bar bg-success" role="progressbar" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p className="pa-font-size-12 pa-dark-grey" style={{marginTop: -6}}>
                  Stock Tersedia
                </p>
              </div>
            </div>
          </div>
        )
    })
    }

    mapRecomendedProduct = () => {
 
      return this.props.bestSellerProducts.data.map((value, index) => {
          return(
            <div key={index} className="col-6 col-md-3 px-3 py-3">
              <div className="pa-recomended-card">
                <Link to={'/detail-product/' + value.id}>
                  <img src={'http://localhost:2000/public/product/' + value.url} alt={'Best Seller Product ' + index + 1} width="100%" style={{borderTopLeftRadius: 5, borderTopRightRadius: 5}} />
                </Link>
                <div className="px-3 pt-2 pb-2 pa-bg-light-grey" style={{height: 100, borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}>
                  {value.name}
                  <p className="font-weight-bold pa-font-size-16 pa-secondary">
                    Rp.{(value.price - (value.price * (value.discount / 100))).toLocaleString('id-ID')}
                  </p>
                  {
                    value.discount?
                      <p className="pa-font-size-14 pa-dark-grey">
                        <del>
                          Rp.{(value.price).toLocaleString('id-ID')}
                        </del>
                        <span className="mx-1 my-0 pa-secondary">
                          {value.discount}% OFF
                        </span>
                      </p>
                    :
                      null
                  }
                </div>
              </div>
            </div>
          )
      })
    }

    showMoreProducts = () => {
      // this.setState({visible: this.state.visible + 4})
    }

    render(){
      console.log(this.props.bestSellerProducts.data)
      const mobileSettings = {
        autoplay: true,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: true
      }

      const desktopSettings = {
        autoplay: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        dots: false
      }
      
      return(
        // LANDING PAGE
        <div>
          {/* JUMBOTRON SECTION */}
          <div>
            <div className="px-0 py-5 pa-jumbotron">
              <div className="container w-100 h-100">
                <div className="row justify-content-center align-items-end align-items-md-center h-100">
                  <div className="col-12 pa-light">
                      <h1 className="text-center text-md-right font-weight-bold pa-font-size-50 pa-light">
                          Flash Sale : <br />
                          <span className="text-center text-md-right font-weight-light pa-font-size-50 pa-light">
                              25 - 50%
                          </span>
                      </h1>
                      <h1 className="text-center text-md-right pa-font-size-18 pa-light">
                          * Only On December!
                      </h1>
                      <div className="text-center text-md-right mt-0 mb-0 mt-md-4 mb-md-0">
                          <input type="button" value="Shop Now" className="btn btn-light rounded-0 px-5 py-2 px-md-5 py-md-2" />
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>



          {/* FAVOURITE SECTION */}
          <div>
            <div className="container px-0 pt-0 pb-3 pa-favourite-card-desktop-display">
              <div className="px-0 pt-1 pb-0">
                <h3>
                  Favorit Kamu
                </h3>
              </div>

              {/* Desktop Section */}
              <div className="pa-favourite-card-desktop-display">
                <div className="row justify-content-between mx-0 my-3">
                  <Link to='/products?category=1' className="col-2 row justify-content-center ml-0 mr-0 my-0 px-3 py-3 pa-favourite-card pa-link">
                    <div>
                      <img src={TShirtIcon} alt="#" width="30" />
                    </div>
                    <div className="align-self-center mx-3 my-0">
                      T-Shirt
                    </div>
                  </Link>
                  <Link to='/products?category=2' className="col-2 row justify-content-center ml-0 mr-0 my-0 px-3 py-3 pa-favourite-card pa-link">
                    <div>
                      <img alt="#" src={ShirtIcon} width="30" />
                    </div>
                    <div className="align-self-center mx-3 my-0">
                      Shirt
                    </div>
                  </Link>
                  <Link to='/products?category=4' className="col-2 row justify-content-center ml-0 mr-0 my-0 px-3 py-3 pa-favourite-card pa-link">
                    <div>
                      <img alt="#" src={JacketIcon} width="30" />
                    </div>
                    <div className="align-self-center mx-3 my-0">
                      Jacket
                    </div>
                  </Link>
                  <Link to='/products?category=3' className="col-2 row justify-content-center ml-0 mr-0 my-0 px-3 py-3 pa-favourite-card pa-link">
                    <div>
                      <img alt="#" src={PantsIcon} width="30" />
                    </div>
                    <div className="align-self-center mx-3 my-0">
                      Pants
                    </div>
                  </Link>
                  <Link to='/products?category=6' className="col-2 row justify-content-center ml-0 mr-0 my-0 px-3 py-3 pa-favourite-card pa-link">
                    <div>
                      <img alt="#" src={ShoesIcon} width="30" />
                    </div>
                    <div className="align-self-center mx-3 my-0">
                      Shoes
                    </div>
                  </Link>
                </div>
              </div>
              <div className="d-none d-md-block px-3 pt-3 pb-1 px-md-0 pt-md-4 pb-md-2">
                <img alt="#" src={Newsletter} width="100%"  style={{borderRadius: 5}} />
              </div>
            </div>
          </div>


          
          {/* FLASH SALE SECTION */}
          {
            this.props.flashSale.data === null?
              <FlashSaleProductLoadingMobile />
            :
              this.props.flashSale.data.data.length > 0?
                // Mobile Section
                <div className="d-block d-md-none">
                  <div className="px-0 py-0 pa-bg-main-light">
                    <div className="container px-3 py-3">
                      <div>
                        <span>
                          <img alt="#" src={FlashIcon} width="35" style={{marginTop: -14, marginBottom: 0}} />
                        </span>
                        <span className="mx-3 my-0 pa-font-size-30 pa-light">
                          Flash Sale
                        </span>
                      </div>
                      <div className="pt-3 pb-3">
                        <Slider {...mobileSettings}>
                          {
                            this.mapFlashSaleProduct()
                          }
                        </Slider>
                      </div>
                    </div>
                  </div>
                </div>
              :
                null
          }


          {
            this.props.flashSale.data === null?
              <FlashSaleProductLoadingDesktop />
            :
              this.props.flashSale.data.data.length > 0?
                // Desktop Section
                <div className="d-none d-md-block">
                  <div className="px-0 pa-bg-main-light">
                    <div className="container px-0 py-3">
                      <div>
                        <span>
                          <img alt="#" src={FlashIcon} width="35" style={{marginTop: -14, marginBottom: 0}} />
                        </span>
                        <span className="mx-3 my-0 pa-font-size-30 pa-light">
                          Flash Sale
                        </span>
                      </div>
                      <div className="pt-3 pb-3">
                        <Slider {...desktopSettings}>
                          {
                            this.mapFlashSaleProduct()
                          }
                        </Slider>
                      </div>
                    </div>
                  </div>
                </div>
              :
                null
          }



          {/* BEST SELLER SECTION */}
          <div>
            <div className="container px-3 pt-0 pb-5 px-md-0 pt-md-0 pb-md-5">
              <div className="px-0 pt-3 pb-0">
                <h3>
                  Rekomendasi Untuk Kamu
                </h3>
              </div>
              {
                this.props.bestSellerProducts.data || this.props.bestSellerProducts.length>0?
                  <div className="row">
                    {this.mapRecomendedProduct()}
                  </div>
                :
                  <RecomendedProductLoading />
              }
            </div>
          </div>



          {/* LOAD MORE SECTION */}
          {/* <div>
            <div className="container px-3 pt-0 pb-5 px-md-0 pt-md-0 pb-md-5">
              <div className="row justify-content-center">
                <div onClick={() => this.showMoreProducts()} className="btn px-5 py-2 font-weight-bold pa-button-load-more pa-main-light" style={{borderRadius: 10}}>
                  Load More
                </div>
              </div>
            </div>
          </div> */}
        </div>
      )
    }
}

const mapStateToProps = (state) => {
  
  return{
    flashSale: state.flashSale,
    bestSellerProducts: state.bestSellerProducts
  }
}

const mapDispatchToProps = { getFlashSaleProducts, getBestSellerProducts }

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)