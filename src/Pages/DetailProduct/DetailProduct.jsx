import React, {useState, useEffect} from 'react'
import './DetailProduct.css'
import { ImageGroup } from './DetailProductComponent/ImageGroup'
import MdStar from 'react-ionicons/lib/Star'
import MdStarOutline from 'react-ionicons/lib/StarOutline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPlus } from '@fortawesome/free-solid-svg-icons';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Axios from 'axios';
import { ApiUrl } from '../../Constant/ApiUrl';
import CardReview from './DetailProductComponent/CardReview'
import {addCartGagal, addCartSucces} from './../../Redux/Actions/Products/CartActions'
import { connect } from 'react-redux'
import ModalCheckout from './DetailProductComponent/ModalToCart'
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";
import { Link } from 'react-router-dom'
import ModalAddReview from './DetailProductComponent/ModalAddReview'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


const DetailProduct = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [size, setSize] = useState({
        uk :'Pick a Size',
        price : 0,
        variant_product_id : 0,
        stock : 100
    })
    const [tabs, setTabs] = useState('review')
    const [dataApi, setDataApi] = useState({
        productInfo : null,
        image : null,
        size : null,
        avgRating : null
    })
    const [review, setReview] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [openModalReview, setOpenModalReview] = useState(false)

    const [dataSimilar, setDataSimilar] = useState(null)

    // const [dataGudangStock, setDataGudangStock] = useState(null)

    useEffect(() => {
        getDetailData()
        getSimilarProduct()
        window.scrollTo(0, 0)
    }, [props.match.params.id])

    
    // const settings = {
    //     dots: true,
    //     autoplay: true,
    //     infinite: true,
    //     slidesToShow: 3,
    //     slidesToScroll: 1
    // };



    const getDetailData = () => {
        let id = props.match.params.id
        Axios.get(ApiUrl + 'products/' + id)
        .then((res) => {
          
            try {
                if(res.data.error) throw new Error('something went wrong')
                if(res.data.productReview.length > 0){
                    setReview(res.data.productReview)
                }
                setDataApi({...dataApi, productInfo : res.data.productInformation[0], avgRating : res.data.avgRat , image : res.data.productImage, size : res.data.productSize})
                
            } catch (error) {
                console.log(error)
            }
        })
        .catch((err) => {
            console.log(err)
        })   
    }

    const onBtnAddToCart = () =>{
        let data = {
            token : localStorage.getItem('token'),
            variant_product_id : size.variant_product_id,
            qty : 1
        }
        if(!data.token){
            props.history.push('/register')
        }else{
            if(data.token && data.variant_product_id !== 0){
                setLoading(true)
                Axios.post(ApiUrl + 'products/cart/add-to-cart', data)
                .then((res) => {
                    if(res.data.error){
                        props.addCartGagal(res.data.message)
                        setLoading(false)
                    }else{
                        setModalOpen(true)
                        props.addCartSucces(res.data.message)
                        setLoading(false)
                    }
                })
                .catch((err) => {
                    console.log(err)
                    setLoading(false)
                })
            }
        }
    }

    const getSimilarProduct = () => {
        let id = props.match.params.id

        Axios.get(ApiUrl + 'products/similar-product/' + id)
        .then((res) => {
            if(res.data.similarProductData.length !== 0){
                setDataSimilar(res.data.similarProductData)
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    // const getStockGudang = () => {
    //     let id = size.variant_product_id

    //     if(size.variant_product_id){
    //         Axios.get(ApiUrl + 'products/stock/stock-setiap-gudang/' + id)
    //         .then((res) => {
    //             setDataGudangStock(res.data.dataStock)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    //     }
    // }
    // console.log(openModalReview)
    return (
        <div className='container' style={{paddingTop : 120}}>
            <ModalAddReview onCloseModal={()=>setOpenModalReview(false)} openModal={openModalReview} products_id={props.match.params.id} url={dataApi.image && dataApi.image[0].url} />
            <ModalCheckout 
            isOpen={modalOpen}
            imageModal={dataApi.image && dataApi.image[0].url}
            brands={dataApi.productInfo && dataApi.productInfo.brands_name}
            productName ={dataApi.productInfo && dataApi.productInfo.name}
            price={size.price}
            size={size.uk}
            />
            <div className='row'>
                <div className='col-md-7'>
                    <div className='pb-4 border-bottom'>
                        <ImageGroup data={dataApi.image} />
                    </div>
                    <div className='pt-3 pb-3 container-tabs' >
                        <span onClick={() => setTabs('review')} style={{marginRight : 25, cursor : 'pointer'}} className={tabs === 'review' ? 'border-bottom font-weight-bold' : ''}>
                            <p>Review</p>
                        </span>
                        <span style={{marginRight : 25, cursor : 'pointer'}}>
                            <p>Shipping Informaton</p>
                        </span>
                        <span style={{marginRight : 25, cursor : 'pointer'}}>
                            <p>Refund Policy</p>
                        </span>
                    </div>
                    

                    <div style={{display : tabs === 'review' ? 'block' : 'none'}}>
                        {
                            review ?
                            <p style={{fontSize : 13, marginTop : 5}}>Ratings and reviews from our Community</p>
                            :
                            <p style={{fontSize : 13, marginTop : 5}}>Add your review to the community. It's quick and easy.</p>
                        }
                        {
                            review ?
                            <CardReview onClick={() => setOpenModalReview(!openModalReview)} review={review} rating={dataApi.avgRating && dataApi.avgRating} />
                            :
                            <div onClick={() => setOpenModalReview(!openModalReview)} className="border pr-5 pl-5 pt-2 pb-2 mt-3 mb-3" style={{display : 'inline-block'}}>
                                <p>Add your Review</p>
                            </div>

                        }
                    </div>

                </div>
                <div className='col-md-5 pl-5 pr-4'>
                    <div className='border-bottom pb-4'>
                        <p style={{fontSize : 30}}>{dataApi.productInfo && dataApi.productInfo.brands_name}</p>
                        <p style={{fontSize : 18}}>{dataApi.productInfo && dataApi.productInfo.name}</p>
                        <div style={{display : 'flex', alignItems : 'center'}}>
                            {
                                review ?
                                <span className=''>
                                    {
                                        Array.apply(null, {length: dataApi.avgRating && dataApi.avgRating}).map(Number.call, Number).map((val) => {
                                            return(
                                                <MdStar fontSize="15px" color='orange' />
                                            )
                                        })
                                    }
                                    {
                                        Array.apply(null, {length: dataApi.avgRating && 5 - dataApi.avgRating}).map(Number.call, Number).map((val) => {
                                            return(
                                                <MdStarOutline fontSize="15px" color='orange' />
                                            )
                                        })
                                    }
                                </span>
                                :
                                Array.apply(null, {length: 5}).map(Number.call, Number).map((val) => {
                                    return(
                                        <MdStarOutline fontSize="15px" color='orange' />
                                    )
                                })
                            }

                            {
                                review ?
                                <p className='ml-1' style={{fontSize : 13, fontWeight : 'lighter'}}>({review.length}) review</p> 
                                :
                                <p className='ml-1' style={{fontSize : 13, fontWeight : 'lighter'}}>Write the first review</p> 
                            }
                        </div>
                        <div style={{marginTop : 15}}>
                            {
                                dataApi.productInfo && dataApi.size && dataApi.productInfo.discount === 0 ?
                                <p 
                                style={{fontSize : 18}}>
                                    Rp. {size.uk === 'Pick a Size' ? (parseInt(dataApi.size[0].price)).toLocaleString('id-ID'): size.price.toLocaleString('id-ID') }
                                </p>
                                :
                                <span>
                                    <p style={{fontSize : 16}}><s>Rp. {size.uk === 'Pick a Size' ? dataApi.size && (parseInt(dataApi.size[0].price)).toLocaleString('id-ID')  : size.price.toLocaleString('id-ID')  }</s>
                                    <span> ({dataApi.productInfo && dataApi.productInfo.discount}%)</span>
                                    </p>
                                    <p style={{fontSize : 18, color : 'red'}}>
                                        Rp. {' '}
                                        {
                                            size.uk === 'Pick a Size' ? 
                                            dataApi.size && dataApi.productInfo && (dataApi.size[0].price - (dataApi.size[0].price * (dataApi.productInfo.discount /100))).toLocaleString('id-ID')  
                                            : 
                                            dataApi.productInfo && (size.price - (size.price * (dataApi.productInfo.discount /100))).toLocaleString('id-ID') 
                                        }
                                    </p>
                                </span>
                            }
                        </div> 
                    </div>
                    <div className='border-bottom pb-4'>
                        <div style={{marginTop : 15}}>
                            <p style={{fontSize : 18, marginBottom : 10}}>Description</p>
                            <p style={{fontSize : 12}}>
                                {dataApi.productInfo && dataApi.productInfo.description}
                            </p>
                        </div>  
                    </div>

                    <div className='pt-4 pb-4'>
                        <div className='border pt-2 pb-2 pl-3 pr-2' style={{display : 'flex', alignItems : 'center', justifyContent : 'space-between'}}>
                            <p>{size.uk}</p>
                            <FontAwesomeIcon onClick={() => setDropdownOpen(!dropdownOpen)} icon={faPlus} />
                        </div>
                        <div className='border pt-2 pb-2 pl-3 pr-4 mt-1 choice-size' style={{backgroundColor : '#fff',width : '85%',display : dropdownOpen ? 'block' : 'none', opacity : 1, position : 'absolute'}}>
                            {dataApi.size && dataApi.size.map((val, index) => {
                                return(
                                    <div 
                                    onClick={() => {setSize({...size, uk : val.size, price : val.price, variant_product_id : val.variant_product_id, stock : val.stock_customer});setDropdownOpen(false)}} 
                                    style={{cursor : val.stock_customer > 0 ? 'pointer' : 'not-allowed'}}>{val.size}</div>
                                )
                            })}
                        </div>
                        {
                            size.stock === 0 ? 
                            <p style={{fontSize : 14, marginTop : 5, color : 'red'}}>Stock available : {size.stock} </p>
                            :
                            null
                        }
                    </div>
                    <div style={{display : 'flex'}}>
                        <div className= 'border' style={{flex : 1,display : 'flex', alignItems : 'center', justifyContent : 'space-between'}}>
                            <button onClick={onBtnAddToCart} className={size.uk !== 'Pick a Size' && size.stock > 0? "aa-my-button" : 'aa-my-button-disabled'} disabled={size.uk !== 'Pick a Size' && size.stock > 0? false : true}>
                                {
                                    loading ?
                                    <BeatLoader
                                    css={override}
                                    size={10}
                                    color={"#000"}
                                    loading={loading}
                                    />
                                    :
                                    <p>Add to Cart</p>
                                }
                            </button>
                        </div>
                        
                        <div className='border-top border-bottom border-right p-3' style={{display : 'flex', alignItems : 'center', justifyContent : 'space-between'}}>
                            <FontAwesomeIcon icon={faHeart} />
                        </div>
                    </div>
                       
                    <div style={{marginTop : 10, cursor : 'pointer'}}>
                        <p style={{fontSize : 12}}>Shipping rate information</p>

                    </div>
                </div>
                
            </div>
            <div className='pt-3 pb-5'>
                <p style={{fontSize : 20, fontWeight : 800, marginBottom : 30}}>Similar Product</p>
                <div className='row'>
                    {
                        dataSimilar && dataSimilar.map((val, i) => {
                            return(
                                <div key={i} className='col-6 col-md-3 '>
                                    <div className='border p-2 my-2' >
                                        <img
                                        alt="#"
                                        style={{maxWidth : '100%'}}
                                        src={ApiUrl + 'public/product/' + val.url} />   

                                        <div style={{marginTop : 10}}>
                                            <Link to={'/detail-product/' + val.id} >
                                                <p style={{fontSize : 14}}>{val.name}</p>
                                            </Link>
                                            <p style={{fontWeight : 800}}>{val.brands_name}</p>
                                            {
                                                val.discount !== 0 ?
                                                <span>
                                                    <p><s> Rp. {(parseInt(val.price)).toLocaleString('id-ID')}</s></p>
                                                    <p>Rp . {(val.price - (val.price * (val.discount / 100))).toLocaleString('id-ID')}</p>
                                                </span>
                                                :
                                                <span>
                                                    <p>Rp. {(parseInt(val.price)).toLocaleString('id-ID')}</p>
                                                    <p style={{visibility : 'hidden'}}>Batas</p>
                                                </span>

                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    
                    

                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        stateAddCart : state.addCart
    }
}

const mapDispatchToProps = {
    addCartSucces,
    addCartGagal
}

export default connect(mapStateToProps, mapDispatchToProps) (DetailProduct)