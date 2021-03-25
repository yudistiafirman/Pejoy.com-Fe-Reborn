import React from 'react';
import Axios from 'axios';
import { UrlAPI } from './../../Support/Constants/UrlAPI';

import { UncontrolledAlert } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Loader from 'react-loader-spinner';
import Swal from 'sweetalert2';

export class Checkout extends React.Component {

    state = {
        data: null,
        paymentMethods1Toggle: false,
        paymentMethods2Toggle: false,
        paymentMethods3Toggle: false,
        image: null,
        imagePreviewURL: '',
        imageErrorMessage: ''
    }

    componentDidMount(){
        this.getDataTransactionToCheckout()
    }

    getDataTransactionToCheckout = () => {
        var transaction_id = this.props.location.pathname.split('/')[2]
        
        Axios.post(UrlAPI + 'checkout/mytransaction', {transaction_id: transaction_id})
        .then((res) => {
            let mapDataTransactionToCheckout = []

            res.data.data.forEach((value, index1) => {
                let idTransactionExist =  null
               
            
                mapDataTransactionToCheckout.forEach((find, findIndex) => {
                    if(find.id === value.id){
                        idTransactionExist = findIndex
                    }
                })

                if(idTransactionExist !== null){
                 
                    mapDataTransactionToCheckout[idTransactionExist].detail_transaction.push({
                        product_name: value.product_name,
                        product_price: value.product_price,
                        qty: value.qty,
                        discount:value.discount===null?0:value.discount
                    })
                }else{
                
                    mapDataTransactionToCheckout.push({
                        id: value.id,
                        receiver_name:value.receiver_name,
                        phonenumber:value.phonenumber,
                        created_at: value.created_at,
                        expired_at: value.expired_at,
                        shipping_to: value.shipping_to,
                        shipping_rates: value.shipping_rates,
                        total_amount: value.total_amount,
                   
                        detail_transaction: [
                            {
                                product_name: value.product_name,
                                product_price: value.product_price,
                                qty: value.qty,
                                discount:value.discount===null?0:value.discount
                              
                            }
                        ]
                    })
                }
            })

            this.setState({data: mapDataTransactionToCheckout})
        })
        .catch((err) => {
            alert(err.message)
        })
    }

    onImagesValidation = (e) => {
        const file = e.target.files
        console.log(file)

        try {
            if(e.target.files.length > 1) throw new Error('Select 1 Image Only')

            if(file[0].size > 1000000) throw new Error('"' + file[0].name + '" Filesize Is Too Large')

            this.setState({image: file})
            const reader = new FileReader();
            reader.readAsDataURL(file[0])

            reader.onload = () => {
                if(reader.readyState === 2){
                    this.setState({imagePreviewURL: reader.result})
                }
            }
        } catch (error) {
            this.setState({imageErrorMessage : error.message})
        }
    }

    onPaymentTransaction = () => {
        try {
            if(this.state.image === null || this.state.image.length === 0) throw new Error('You Has Not Been Select Image Files')
            
            var transaction_id = this.props.location.pathname.split('/')[2]
            var data = {transaction_id: transaction_id}
            data = JSON.stringify(data)

            let fd = new FormData()
            fd.append('data', data)
            fd.append('image', this.state.image[0])

            Axios.post( UrlAPI + 'checkout/payment', fd)
            .then((res) => { 
                console.log(res)

                if(res.request.status === 200){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Success Pay Your Transaction!',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    setTimeout(function(){window.location = '/'}, 3000)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        } catch (error) {
            alert(error)
        }
    }

    render(){
           console.log(this.state.data&&this.state.data[0].detail_transaction[0].discount)
        return(
            <div>
                {/* CHECKOUT SECTION */}
                <div className="container-fluid px-5 py-5">
                    <div className="row justify-content-center px-0 py-5">
                        {/* Page Title */}
                        <div className="col-12 px-0 pt-4 pb-0">
                            <h2 className="mx-3 text-center text-md-left font-weight-bold">Checkout Page</h2>
                        </div>

                        {/* Shipping Address */}
                        <div className="col-12 col-md-6 px-3 py-3">
                            <div className="px-0 pt-0 pb-1">
                                <h4>Shipping Address</h4>
                            </div>
                            <div className="px-4 pt-1 pb-4 border">
                                <p className="mt-3 mb-0 font-weight-bold">
                                {
                                        this.state.data?
                                         `${this.state.data[0].receiver_name} (${this.state.data[0].phonenumber})` 
                                        :
                                            null
                                    }
                                </p>
                                <p className="mt-0 mb-0">
                                    {
                                        this.state.data?
                                            this.state.data[0].shipping_to
                                        :
                                            null
                                    }
                                </p>
                                <p className="mt-3 mb-0 font-weight-bold myfsid-secondary">
                                    Notes :
                                </p>

                                <textarea className="border form-control"  placeholder="Ex: Titipkan Ke Rumah Sebelah Apabila Tidak Ada Orang di Rumah" style={{width:'100%'}} type="text"/>
                               
                            </div>
                            <div className="px-0 pt-4 pb-1">
                                <h4 className="pa-secondary">Upload Evidence</h4>
                            </div>
                            <div className="px-4 pt-3 pb-3 border">
                                {
                                    this.state.imagePreviewURL?
                                        <img src={this.state.imagePreviewURL} alt=" Preview" width="100%" />
                                    :
                                        <>
                                            <div className="font-weight-bold pa-font-size-18">
                                                Preview
                                            </div>
                                            {
                                                this.state.imageErrorMessage?
                                                    this.state.imageErrorMessage
                                                :
                                                    'No Image'
                                            }
                                        </>
                                }
                            </div>
                            <div className="mx-0 my-3 px-4 pt-3 pb-3 border">
                                <input type="file" onChange={(e) => this.onImagesValidation(e)} accept="image/*" className="form-control-file" />
                            </div>
                        </div>

                        {/* My Orders & Payment Methods */}
                        <div className="col-12 col-md-6 px-3 py-3">
                            <div className="px-0 pt-0 pb-1">
                                <h4>My Orders</h4>
                                <div className="row pt-1">
                                    {
                                        this.state.alertMessage?
                                            <UncontrolledAlert className="w-100 border border-0 rounded-0 myfsid-bg-secondary myfsid-light">
                                                Your Payment Is Success! You Will Directed To Transaction History.
                                            </UncontrolledAlert>
                                        :
                                            null
                                    }
                                    <div className="col-8 py-2 border border-right-0 font-weight-bold">
                                        Items
                                    </div>
                                    <div className="col-4 py-2 border font-weight-bold">
                                        Sub-Total
                                    </div>
                                    {
                                        this.state.data? 
                                            this.state.data[0].detail_transaction.map((value, index) => {
                                                console.log(value)
                                                return(
                                                    
                                                    <div key={index} className="col-12 row mx-0 px-0">
                                                        <div className="col-8 py-2 border border-top-0 border-right-0">
                                                            <span>
                                                                <span>{value.product_name.length>17?value.product_name.slice(0,17)+' ...':value.product_name}</span>  
                                                                <span className="font-weight-bold"> (x{value.qty})</span>
                                                                <span>Rp. {value.product_price.toLocaleString('id-ID')}</span>
                                                            {  
                                                                value.discount!==0?<span className="font-weight-bold">{` - Rp.${(value.discount).toLocaleString()} Off`}</span>:null
                                                            }
                                                                
                                                                
                                                                
                                                                  

                                                                 </span>
                                                        </div>
                                                        <div className="col-4 ml-0 py-2 border border-top-0">
                                                            <span>Rp.{((value.product_price*value.qty-value.discount)).toLocaleString('id-ID')}</span>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        :
                                            <div className="col-12 row mx-0 px-0">
                                                <div className="col-8 py-2 border border-top-0 border-right-0">
                                                    <Loader type="ThreeDots" color="#005eb8" height={30} width={30} />
                                                </div>
                                                <div className="col-4 ml-0 py-2 border border-top-0">
                                                    <Loader type="ThreeDots" color="#005eb8" height={30} width={30} />
                                                </div>
                                            </div>
                                    }
                                
                             
                                    <div className="col-8 py-2 border border-top-0 border-right-0">
                                        <span className="font-weight-bold">Sub-Total</span>
                                    </div>
                                    
                                    
                                    <div className="col-4 py-2 border border-top-0">
                                        {this.state.data? 'Rp.' + (this.state.data[0].total_amount - this.state.data[0].shipping_rates).toLocaleString('id-ID') : <Loader type="ThreeDots" color="#005eb8" height={30} width={30} />}
                                    </div>
                                   
                                    <div className="col-8 py-2 border border-top-0 border-right-0">
                                        <span className="font-weight-bold">Shipping Rates</span>
                                    </div>
                                    <div className="col-4 py-2 border border-top-0">
                                        {this.state.data? 'Rp.' + (Number(this.state.data[0].shipping_rates)).toLocaleString('id-ID') : <Loader type="ThreeDots" color="#005eb8" height={30} width={30} />}
                                    </div>
                                    <div className="col-8 py-2 border border-top-0 border-right-0">
                                        <span className="font-weight-bold">Unique Digit</span>
                                    </div>
                                    <div className="col-4 py-2 border border-top-0">
                                        Rp.495
                                    </div>
                                    <div className="col-8 py-2 border border-top-0 border-right-0">
                                        <span className="myfsid-secondary font-weight-bold">Total</span>
                                    </div>
                                    <div className="col-4 py-2 border border-top-0">
                                        {this.state.data? 'Rp.' + (Number(this.state.data[0].total_amount) + 495).toLocaleString('id-ID') : <Loader type="ThreeDots" color="#005eb8" height={30} width={30} />}
                                    </div>
                                </div>
                            </div>
                            <div className="px-0 pt-5 pb-1">
                                <h4>Payment Methods</h4>
                                <div className="row px-0 pt-1 pb-0">
                                    <div className="col-2 py-2 border border-right-0 text-center font-weight-bold">
                                        <img src="https://3.bp.blogspot.com/-e1fOq9uUk8M/V15O0WHiIMI/AAAAAAAAAJA/IpxPlLevxLsjisy2I625Yvz-eNzgc6xfgCKgB/s640/Logo%2BBank%2BBNI%2BPNG.png" alt="Bank BNI" width="100%" />
                                    </div>
                                    <div className="col-8 py-2 border border-left-0 border-right-0 font-weight-bold">
                                        BNI Bank Transfer
                                    </div>
                                    <div onClick={() => this.setState({ paymentMethods1Toggle : !this.state.paymentMethods1Toggle })} className="col-2 py-2 border border-left-0 text-right myfsid-clickable-element">
                                        {
                                            this.state.paymentMethods1Toggle?
                                                <FontAwesomeIcon icon={faChevronDown} className="fa-xs" />
                                            :
                                                <FontAwesomeIcon icon={faChevronRight} className="fa-xs" />
                                        }
                                    </div>
                                    {
                                        this.state.paymentMethods1Toggle?
                                            <div className="col-12 py-2 border border-top-0">
                                                0306-0306-0306 ( A/N PT. Pejoy Indonesia Maju )
                                            </div>
                                        :
                                            null
                                    }
                                    <div className="col-2 py-2 border border-top-0 border-right-0 text-center font-weight-bold">
                                        <img src="https://1.bp.blogspot.com/-ftTB8bnkTPA/XUJbw4V3afI/AAAAAAAABto/F_-6eIBe7iMuS_5AJodNooYTtBuCaMZ6gCEwYBhgL/s1600/Logo%2BGopay%2BBaru.png" alt="Gopay" width="100%" />
                                    </div>
                                    <div className="col-8 py-2 border border-top-0 border-left-0 border-right-0 font-weight-bold">
                                        Gopay Account
                                    </div>
                                    <div onClick={() => this.setState({ paymentMethods2Toggle : !this.state.paymentMethods2Toggle })} className="col-2 py-2 border border-top-0 border-left-0 text-right myfsid-clickable-element">
                                        {
                                            this.state.paymentMethods2Toggle?
                                                <FontAwesomeIcon icon={faChevronDown} className="fa-xs" />
                                            :
                                                <FontAwesomeIcon icon={faChevronRight} className="fa-xs" />
                                        }
                                    </div>
                                    {
                                        this.state.paymentMethods2Toggle?
                                            <div className="col-12 py-2 border border-top-0">
                                                0812-1418-6000 ( A/N PT. Pejoy Indonesia Maju )
                                            </div>
                                        :
                                            null
                                    }
                                    <div className="col-2 py-2 border border-top-0 border-right-0 text-center font-weight-bold">
                                        <img src="https://1.bp.blogspot.com/-Le-OjhRx8lM/XmMnhn40y9I/AAAAAAAABr0/bOQ8PWjEjQ0QBuh3s4L_13jJHUj4O47qwCLcBGAsYHQ/s1600/Logo%2BIndomaret.png" alt="Indomaret" width="100%" />
                                    </div>
                                    <div className="col-8 py-2 border border-top-0 border-left-0 border-right-0 font-weight-bold">
                                        Indomaret
                                    </div>
                                    <div onClick={() => this.setState({ paymentMethods3Toggle : !this.state.paymentMethods3Toggle })} className="col-2 py-2 border border-top-0 border-left-0 text-right myfsid-clickable-element">
                                        {
                                            this.state.paymentMethods3Toggle?
                                                <FontAwesomeIcon icon={faChevronDown} className="fa-xs" />
                                            :
                                                <FontAwesomeIcon icon={faChevronRight} className="fa-xs" />
                                        }
                                    </div>
                                    {
                                        this.state.paymentMethods3Toggle?
                                            <div className="col-12 py-2 border border-top-0">
                                                "0306" + 0812-1418-6000
                                            </div>
                                        :
                                            null
                                    }
                                    <div className="col-12 px-0 py-0 mx-0 my-3">
                                        {
                                            this.state.data && this.state.imagePreviewURL?
                                                <input type="button" value="Pay My Orders" onClick={() => this.onPaymentTransaction()} className="btn rounded w-100 py-2 pa-bg-secondary pa-light"/>
                                            :
                                                <input type="button" disabled value="Pay My Orders" className="btn rounded w-100 py-2 pa-bg-secondary pa-light"/>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Checkout