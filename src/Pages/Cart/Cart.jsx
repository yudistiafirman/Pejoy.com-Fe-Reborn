import Axios from 'axios'
import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { ApiUrl } from '../../Constant/ApiUrl'
import './Cart.css'
import CardCart from './CartComponent/CardCart'
import { getCartData, addTransactionSuccess, addTransactionGagal} from './../../Redux/Actions/Products/CartActions'
import { Link } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import { css } from "@emotion/core";
import ModalToPayment from './CartComponent/ModalToPayment'
import ModalShipping from './CartComponent/ModalShipping'


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Cart = ({stateAddTransaction,stateDeleteCart ,updateQty,dataCart, getCartData, stateAddCart}) => {

    const [mapData, setMapData] = useState({
        subtotal : null,
        total_discount : null,
        ongkir : null
    })
    const [dataOngkir, setDataOngkir] = useState({
        gudangAsal : null,
        addressUser : null,
        ongkirRate : null
    })

    const [loading, setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalShipping, setModalShipping] = useState(false)
   
    useEffect(() => {
        let token = localStorage.getItem('token')
        getCartData(token)
    },[updateQty.data, stateDeleteCart.data, stateAddCart.data])

    useEffect(() => {
        let weightTotal = 0
        dataCart.data && dataCart.data.forEach((val,i) => {
            weightTotal += val.total_weight
        })
        if(weightTotal !== 0){
            getEstOngkir(weightTotal)
        }
    }, [dataCart.data, updateQty.data, stateDeleteCart.data, stateAddCart.data ])

    useEffect(() => {
        mapDataToRender()
    },[dataCart.data])


    const mapDataToRender = () => {
        let subtotal = 0
        let total_discount = 0
        if(dataCart.data !== null){
            dataCart.data.forEach((val, i) => {
                subtotal += val.total_price
                total_discount += val.total_potongan
            })
        }
        setMapData({...mapData, subtotal : subtotal, total_discount : total_discount})
    }

    const getEstOngkir = (weightTotal) => {
        let data = {
            token : localStorage.getItem('token'),
            weight : weightTotal,
            courier : 'jne'
        }
       
        Axios.post(ApiUrl + 'products/estimated-ongkir/all', data)
        .then((res) => {
            try {
                if(res.data.error){
                    if(res.data.message === 'User belum memiliki alamat'){
                        setModalShipping(true)
                        console.log(res.data)
                    }
                }else{
                    let estTermurah = res.data.dataOngkir[0].costs.map((val, i) => {
                        return {ongkir : val.cost[0].value, est : val.cost[0].etd}
                    })
                    setDataOngkir({...dataOngkir, gudangAsal : res.data.dataGudang, addressUser : res.data.dataUser, ongkirRate : estTermurah.sort((a, b) => b.ongkir - a.ongkir)})
                }
                
            } catch (error) {
                console.log(error)
            }
            
        })
        .catch((err) => {
            console.log(err)
        })
    }
    // {"product_name" : "adidas", "product_price" : 20000, 
    // "qty" : 10,"variant_product_id" : 57, "url" : "AAAA"}

   

    const onSendBtnCheckOut = () => {
        let data = []
        dataCart.data.map((val) => {
            data.push({product_name : val.name, product_price : val.price, qty : val.qty, variant_product_id : val.variant_product_id, url : val.url })
        })
        let dataToInsert = {
            token : localStorage.getItem('token'),
            gudang_id : dataOngkir.gudangAsal.id,
            shipping_to : dataOngkir.addressUser.address_detail,
            total_amount : ((mapData.subtotal + dataOngkir.ongkirRate[0].ongkir) - mapData.total_discount) ,
            shipping_rates : dataOngkir.ongkirRate[0].ongkir ,
            data : data
        }
        console.log(dataToInsert)
        setLoading(true)
        Axios.post(ApiUrl + 'products/transaction/add-transaction',dataToInsert)
        .then((res) => {
            if(res.data.error){
                addTransactionGagal(res.data.message)
            }else{
                console.log(res)
                setLoading(false)
                setIsModalOpen(true)
                addTransactionSuccess(res.data.message)
            }
        })
        .catch((err) => {
            console.log(err)
            setLoading(false)
            addTransactionGagal(err.message)
        })
    }

    if(dataCart.data !== null && dataCart.data.length === 0){
        return(
            <div className='container' style={{paddingTop : 120}}>
                <div className='border-bottom py-3' >
                    <p>
                        You have ({dataCart.data.length}) items in your cart.
                    </p>
                </div>
                <div className='' style={{height : 500, width : '100%', display : 'flex', flexDirection : 'column', justifyContent : 'center', alignItems : 'center'}}>
                    <p style={{fontSize : 30, fontWeight : 'bold'}}>
                        Don't leave your cart empty
                    </p>
                    <p style={{fontSize : 14}}>
                        See your favorites, shop our latest and greatest, or take advantage of the discount offers that we provide.
                    </p>
                    <Link to='/products'>
                        <p style={{fontSize : 14, cursor : 'pointer', textDecoration : 'underline'}}>Come on, fill your cart</p>
                    </Link>
                </div>
            </div>
        )
    }else{
        return (
            <div className='container' style={{paddingTop : 120}}>
                <ModalToPayment modalOpen={isModalOpen} />
                <ModalShipping modalOpen={modalShipping} />
                <div className='row'>
                    <div className='col-md-8'>
                        <div className='border-bottom row pt-2 pb-2 pl-1'>
                            <p>Your Cart({dataCart.data && dataCart.data.length})</p>
                        </div>
                        <div style={{marginTop : 20}} className='pl-2 pr-2'>
                            {
                                dataCart.data && dataCart.data.map((val,i) => {
                                    return(
                                        <CardCart 
                                            key={i}
                                            price={val.price} 
                                            brand={val.brands_name}
                                            productName={val.name}
                                            discount={val.discount}
                                            qty={val.qty}
                                            size={val.size}
                                            url={val.url}
                                            stock={val.stock}
                                            est={dataOngkir.ongkirRate && dataOngkir.ongkirRate[0].est.split('-')[1]}
                                            cityGudang={dataOngkir.gudangAsal && dataOngkir.gudangAsal.city_gudang}
                                            id={val.id}
                                            variant_product_id={val.variant_product_id}
                                                /> 
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='col-md-4 p-3'>
                        <div style={{display : 'flex', justifyContent : 'center', alignItems : 'center', marginBottom : 20}}>
                            <p>Cart Summary</p>
                        </div>
                        <div className='pl-3 pr-3'>
                            <div className='row border pt-3 pb-3'>
                                <div className='col-md-6 ' style={{display : 'flex', flexDirection : 'column'}}>
                                    <p style={{fontSize : 14}}>Subtotal</p>
                                    <p style={{fontSize : 14}}>Est. Shipping</p>
                                    <p style={{fontSize : 14}}>Discount</p>
                                    <p style={{fontSize : 14, marginTop : 10}}>Total</p>
                                </div>
                                <div className='col-md-6 ' style={{display : 'flex', flexDirection : 'column', alignItems : 'flex-end'}}>
                                    <p style={{fontSize : 14}}>Rp. {mapData.subtotal && mapData.subtotal.toLocaleString('id-ID') }</p>
                                    <p style={{fontSize : 14}}>Rp. {dataOngkir.ongkirRate && (dataOngkir.ongkirRate[0].ongkir).toLocaleString('id-ID')}</p>
                                    <p style={{fontSize : 14}}>(Rp. {mapData.total_discount && mapData.total_discount.toLocaleString('id-ID')})</p>
                                    {
                                        mapData.total_discount ?
                                        <p style={{fontSize : 14, marginTop : 10}}>Rp. {mapData.subtotal && mapData.total_discount && dataOngkir.ongkirRate && ((mapData.subtotal + dataOngkir.ongkirRate[0].ongkir) - mapData.total_discount ).toLocaleString('id-ID')}</p>
                                        :
                                        <p style={{fontSize : 14, marginTop : 10}}>Rp. {mapData.subtotal && dataOngkir.ongkirRate && (mapData.subtotal + dataOngkir.ongkirRate[0].ongkir).toLocaleString('id-ID')}</p>
                                    }
                                    
                                </div>
                            </div>
                        </div>
                        <div style={{marginTop : 20}}>
                            <div className='border' style={{display : 'flex', alignItems : 'center', justifyContent : 'center', height : 50}}>
                                <button onClick={onSendBtnCheckOut} className="aa-my-button">
                                    {
                                        loading ?
                                        <BeatLoader
                                        css={override}
                                        size={10}
                                        color={"#000"}
                                        loading={loading}
                                        />
                                        :
                                        <p>Checkout</p>
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
    
                </div>
            </div>
        )

    }

}

const mapStateToProps = (state) => {
    return{
        dataCart : state.cart,
        updateQty : state.updateQty,
        stateDeleteCart : state.deleteCart,
        stateAddCart : state.addCart,
        stateAddTransaction : state.addTransaction
    }
}

const mapDispatchToProps = {
    getCartData,
    addTransactionSuccess,
    addTransactionGagal
}

export default connect(mapStateToProps, mapDispatchToProps) (Cart)