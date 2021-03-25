import React, { Component } from 'react';
import { connect } from 'react-redux';

import moment from 'moment';
import Skeleton from 'react-loading-skeleton';
import Countdown from 'react-countdown';

import { getMyTransactions, onExpiredTransaction, confirmMyTransaction } from './../../Redux/Actions/UserProfile/myTransactionsAction';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown, faCreditCard, faCheckCircle, faCube, faTruck } from '@fortawesome/free-solid-svg-icons';

import './UserProfile.css';

import NotFound from './../../Support/Images/Not Found.webp';

import { Alert } from 'reactstrap';

export class Transactions extends Component{

    state = {
        moreProducts: 1,
        seeStatusTransactions: false,
        activeLink: null,
        visible: true,
        successMessage: ''
    }

    componentDidMount(){
        const token = localStorage.getItem('token')

        const data = {
            token,
            status_name_id: 1
        }

        this.props.getMyTransactions(data)
    }

    onGetMyTransactionsWaitingForPayment = () => {
        const token = localStorage.getItem('token')
        this.setState({activeLink: 'Waiting For Payment'})
        
        const data = {
            token,
            status_name_id: 1
        }

        this.props.getMyTransactions(data)
    }

    onGetMyTransactionsPaid = () => {
        const token = localStorage.getItem('token')
        this.setState({activeLink: 'Paid'})

        const data = {
            token,
            status_name_id: 2
        }

        this.props.getMyTransactions(data)
    }

    onGetMyTransactionsDeliver = () => {
        const token = localStorage.getItem('token')
        this.setState({activeLink: 'Deliver'})
        
        const data = {
            token,
            status_name_id: 3
        }

        this.props.getMyTransactions(data)
    }

    onGetMyTransactionsComplete = () => {
        const token = localStorage.getItem('token')
        this.setState({activeLink: 'Complete'})
        
        const data = {
            token,
            status_name_id: 4
        }

        this.props.getMyTransactions(data)
    }

    onCountDown = (hours, minutes, seconds, completed) => {
        if(completed){
            this.setState({expired: true})
        }else{
            return <span>{hours}:{minutes}:{seconds}</span>;
        }
    }  

    onExpired = (data1, data2) => {
        const token = localStorage.getItem('token')

        const dataUser = {
            token,
            status_name_id: 1
        }

        const dataTransaction = [
            data1, 
            data2
        ]

        this.props.onExpiredTransaction(dataUser, dataTransaction)
    }

    onCheckout = (transaction_id) => {
        window.location = ('/checkout/' + transaction_id)
    }

    openProduct = (product_id) => {
        window.location = ('/detail-product/' + product_id)
    }

    onConfirmTransaction = (transaction_id) => {
        const token = localStorage.getItem('token')

        if(window.confirm('Are you sure want to confirm this transaction?')){
            let data = {
                token,
                transaction_id,
                status_name_id: 4,
                is_done: 0
            }

            this.props.confirmMyTransaction(data)

            if(this.props.myTransactions.data.error === false){
                window.scrollTo(0,0)
                this.setState({successMessage : 'Your Transactions Complete'})
            }
        }
    }

    mapMyTransactions = () => {
  
        return this.props.myTransactions.data.mapDataTransactionsUsers.map((value, index) => {
            return(
                <>
                    <div className="d-block d-md-none mx-0 my-5 px-5 py-3 pa-transaction-card">
                        <div className="row justify-content-between align-items-center px-3 pt-2 pb-2">
                            <div className="col-6 px-0 py-0">
                                <p className="pa-font-size-15">
                                    Invoice :
                                </p>
                                <p className="font-weight-bold pa-font-size-16 pa-main-light">
                                    PJY/TRNSCTNS/000{value.id}
                                </p>
                            </div>
                            <div className="col-6 border-left text-center">
                                <p className="pa-font-size-15">
                                    Status :
                                </p>
                                {
                                    value.status === 'Waiting For Payment' && value.is_done === 3?
                                        <p className="font-weight-bold pa-font-size-16 pa-secondary">
                                            Transaction Expired
                                        </p>
                                    :
                                        <p className="font-weight-bold pa-font-size-16 pa-dark">
                                            {value.status}
                                        </p>
                                }
                            </div>
                        </div>
                        <div>
                            <p className="pa-font-size-15">
                                Total :
                            </p>
                            <p className="font-weight-bold pa-font-size-16 pa-secondary">
                                Rp.{(value.total).toLocaleString('Id-ID')}
                            </p>
                        </div>
                        <div className="mt-2 mb-3 border-bottom">

                        </div>
                        {
                            value.detail_transaction.slice(0, this.state.moreProducts).map((val, ind) => {
                                return(
                                    <>
                                        <div className="row px-3 py-3">
                                            <div className="col-2 px-0">
                                                <img src={'http://localhost:2000/public/product/' + val.image_product} alt={'Best Seller Product Image ' + index + 1} width="100%" />
                                            </div>
                                            <div className="px-4 py-0">
                                                <div className="font-weight-bold pa-font-size-18 pa-main-light">
                                                    {
                                                        val.product_name.length > 9?
                                                            val.brand_name + ' ' + val.product_name.slice(0, 8) + '...'
                                                        :
                                                            val.brand_name + ' ' + val.product_name
                                                    }
                                                </div>
                                                <div className="px-0 pt-0 pb-0 pa-secondary">
                                                    Rp.{(val.product_price).toLocaleString('Id-ID')}
                                                    <span className="ml-2 mr-0 pa-dark">
                                                        {val.qty} Product (900 Gram)
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-3 mb-3 border-bottom">

                                        </div>
                                    </>
                                )
                            })
                        }
                        <div className="text-center">
                            {
                                value.detail_transaction.length > 1 && value.detail_transaction.length !== this.state.moreProducts?
                                    <span onClick={() => this.setState({moreProducts: value.detail_transaction.length})} className="pa-clickable-element pa-font-size-12 pa-main-light">
                                        See More Products
                                    </span>
                                :
                                    null
                            }
                            {
                                value.detail_transaction.length > 1 && value.detail_transaction.length === this.state.moreProducts?
                                    <span onClick={() => this.setState({moreProducts: 1})} className="pa-clickable-element pa-font-size-12 pa-main-light">
                                        Hidden Products
                                    </span>
                                :
                                    null
                            }
                        </div>
                    </div>
                    <div className="d-none d-md-block mx-0 my-5 px-5 py-3 pa-transaction-card">
                        <div className="row justify-content-between align-items-center px-3 pt-2 pb-2">
                            <div className="col-4 px-0 py-0">
                                <p className="pa-font-size-15">
                                    Invoice :
                                </p>
                                {
                                    value.status === 'Waiting For Payment' && value.is_done === 0?
                                        <p className="font-weight-bold pa-font-size-16 pa-main-light">
                                            PJY/TRNSCTNS/000{value.id}
                                        </p>
                                    :
                                        <p className="font-weight-bold pa-font-size-16 pa-light-grey">
                                            <del>PJY/TRNSCTNS/000{value.id}</del>
                                        </p>
                                }
                                {
                                    value.status === 'Delivery'?
                                        <div onClick={() => this.onConfirmTransaction(value.id)} className="btn mx-0 my-1 px-3 py-1 font-weight-bold pa-button-submit pa-font-size-12 pa-main-light" style={{borderRadius: 10}}>
                                            Confirm Transaction
                                        </div>
                                    :
                                        null
                                }
                            </div>
                            <div className="col-4 border-left text-center">
                                <p className="pa-font-size-15">
                                    Status :
                                </p>
                                {
                                    value.status === 'Waiting For Payment' && value.is_done === 3?
                                        <p className="font-weight-bold pa-font-size-16 pa-secondary">
                                            Transaction Expired
                                        </p>
                                    :
                                        <p className="font-weight-bold pa-font-size-16 pa-dark">
                                            {value.status}
                                        </p>
                                }
                            </div>
                            <div className="col-4 border-left text-right">
                                <p className="pa-font-size-15">
                                    Total :
                                </p>
                                {
                                    value.status === 'Waiting For Payment' && value.is_done === 0?
                                        <p className="font-weight-bold pa-font-size-16 pa-secondary">
                                            Rp.{(value.total).toLocaleString('Id-ID')}
                                        </p>
                                    :
                                        <p className="font-weight-bold pa-font-size-16 pa-light-grey">
                                            Rp.{(value.total).toLocaleString('Id-ID')}
                                        </p>
                                }
                            </div>
                        </div>
                        <div className="row justify-content-between align-items-center px-0 pt-2 pb-2">
                            <div className="col-6">
                                {
                                    value.status === 'Waiting For Payment' && value.is_done === 0?
                                        <>
                                            <p className="pa-font-size-15">
                                                Shipping Address :
                                            </p>
                                            <p className="font-weight-bold pa-font-size-16 pa-main-light">
                                                {value.shipping_address}
                                            </p>
                                        </>
                                    :
                                        null
                                }
                            </div>
                            <div className="col-6 text-right">
                                {
                                    value.status === 'Waiting For Payment' && value.is_done === 0?
                                        <div onClick={() => this.onCheckout(value.id)} className="btn mx-0 my-1 px-5 py-2 font-weight-bold pa-bg-secondary pa-font-size-12 pa-light" style={{borderRadius: 10}}>
                                            Pay My Order
                                        </div>
                                    :
                                        null
                                }
                                <div>
                                    {
                                        value.status === 'Waiting For Payment' && value.is_done === 0?
                                            <>
                                                <span className="mx-1 my-0 font-weight-bold">
                                                    Pay Before : 
                                                </span>
                                                <span>
                                                    <Countdown
                                                        date={value.expired_at}
                                                        onCountDown={this.onCountDown()}
                                                        daysInHours={true}
                                                        onComplete={() => this.onExpired(value.id, value.detail_transaction_to_update)}
                                                        className="font-weight-bold pa-secondary"
                                                    />
                                                </span>
                                            </>
                                        :
                                            null
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 mb-3 border-bottom">

                        </div>
                        {
                            value.detail_transaction.slice(0, this.state.moreProducts).map((val, ind) => {
                                return(
                                    <>
                                        <div className="row px-3 py-3">
                                            <div className="col-1 px-0">
                                                <img src={'http://localhost:2000/public/product/' + val.image_product} alt={'Best Seller Product Image ' + index + 1} width="100%" />
                                            </div>
                                            <div className="px-4 py-0">
                                                <div className="font-weight-bold pa-font-size-18 pa-main-light">
                                                    {
                                                        val.product_name.length > 9?
                                                            val.brand_name + ' ' + val.product_name.slice(0, 8) + '...'
                                                        :
                                                            val.brand_name + ' ' + val.product_name
                                                    }
                                                </div>
                                                <div className="px-0 pt-1 pb-0 pa-secondary">
                                                    Rp.{(val.product_price).toLocaleString('Id-ID')}
                                                    <span className="ml-2 mr-0 pa-dark">
                                                        {val.qty} Product (900 Gram)
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="border-left px-4 py-0">
                                                <p className="pa-font-size-15">
                                                    Total Harga : 
                                                </p>
                                                <p className="font-weight-bold pa-secondary">
                                                    Rp.{(val.total_product).toLocaleString('Id-ID')}
                                                </p>
                                            </div>
                                            <div className="col-4 text-right">
                                                <div onClick={() => this.openProduct(val.product_id)} className="btn mx-0 my-1 px-3 py-1 font-weight-bold pa-button-buy-again pa-font-size-12 pa-main-light" style={{borderRadius: 10}}>
                                                    Buy Again
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-3 mb-3 border-bottom">

                                        </div>
                                    </>
                                )
                            })
                        }
                        <div className="text-center">
                            {
                                value.detail_transaction.length > 1 && value.detail_transaction.length !== this.state.moreProducts?
                                    <span onClick={() => this.setState({moreProducts: value.detail_transaction.length})} className="pa-clickable-element pa-font-size-12 pa-main-light">
                                        See More Products
                                    </span>
                                :
                                    null
                            }
                        </div>
                        <div className="text-center">
                            {
                                value.detail_transaction.length > 1 && value.detail_transaction.length === this.state.moreProducts?
                                    <span onClick={() => this.setState({moreProducts: 1})} className="pa-clickable-element pa-font-size-12 pa-main-light">
                                        Hidden Products
                                    </span>
                                :
                                    null
                            }
                        </div>
                        {
                            value.status === 'Waiting For Payment' && value.is_done === 0?
                                <div className="row justify-content-between px-3 pt-0 pb-2">
                                    <div className="font-weight-bold pa-dark">
                                        Status Transactions
                                    </div>
                                    <div>
                                        <FontAwesomeIcon onClick={() => this.setState({seeStatusTransactions: !this.state.seeStatusTransactions})} icon={faChevronCircleDown} className="fa-md pa-clickable-element pa-light-grey" />
                                    </div>
                                </div>
                            :
                                null
                        }
                        <div className="row align-items-center px-0 py-2">
                        {
                            this.state.seeStatusTransactions?
                                value.history_transaction.map((value1, index1) => {
                                    return(
                                        <>
                                            {
                                                value1.status_name !== 'Waiting For Payment'?
                                                    <div className="col-1">
                                                        <hr />
                                                    </div>
                                                :
                                                    null
                                            }
                                            <div className="col-2">
                                                <div className={value1.is_done === 0? "border border-primary" : "border" } style={{width: 40, height: 40, borderRadius: 100, marginLeft: 28}}>
                                                    {
                                                        value1.status_name === 'Waiting For Payment'?
                                                            <FontAwesomeIcon icon={faCreditCard} className={value1.is_done === 0? "pa-font-size-18 pa-main-light" : "pa-font-size-18 pa-light-grey"} style={{marginLeft: 9, marginRight: 0, marginTop: 10, marginBottom: 0}} />
                                                        :
                                                            null
                                                    }  
                                                    {
                                                        value1.status_name === 'Paid'?
                                                            <FontAwesomeIcon icon={faCheckCircle} className={value1.is_done === 0? "pa-font-size-18 pa-main-light" : "pa-font-size-18 pa-light-grey"} style={{marginLeft: 10, marginRight: 0, marginTop: 10, marginBottom: 0}} />
                                                        :
                                                            null
                                                    }
                                                    {
                                                        value1.status_name === 'Delivery'?
                                                            <FontAwesomeIcon icon={faTruck} className={value1.is_done === 0? "pa-font-size-18 pa-main-light" : "pa-font-size-18 pa-light-grey"} style={{marginLeft: 8, marginRight: 0, marginTop: 10, marginBottom: 0}} />
                                                        :
                                                            null
                                                    } 
                                                    {
                                                        value1.status_name === 'Completed'?
                                                            <FontAwesomeIcon icon={faCube} className={value1.is_done === 0? "pa-font-size-18 pa-main-light" : "pa-font-size-18 pa-light-grey"} style={{marginLeft: 10, marginRight: 0, marginTop: 10, marginBottom: 0}} />
                                                        :
                                                            null
                                                    }
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            :
                                null
                        }
                        </div>
                        <div className="row px-0 py-0">
                        {
                            this.state.seeStatusTransactions?
                                value.history_transaction.map((value1, index1) => {
                                    return(
                                        <>
                                            {
                                                value1.status_name !== 'Waiting For Payment'?
                                                    <div className="col-1">
                                                        
                                                    </div>
                                                :
                                                    null
                                            }
                                            <div className={value1.is_done === 0? "col-2 text-center font-weight-bold pa-font-size-12 pa-main-light" : "col-2 text-center pa-font-size-12 pa-light-grey" }>
                                                {value1.status_name}
                                            </div>
                                        </>
                                    )
                                })
                            :
                                null
                        }
                        </div>
                        <div className="row px-0 py-0">
                        {
                            this.state.seeStatusTransactions?
                                value.history_transaction.map((value1, index1) => {
                                    return(
                                        <>
                                            {
                                                value1.status_name !== 'Waiting For Payment'?
                                                    <div className="col-1">
                                                        
                                                    </div>
                                                :
                                                    null
                                            }
                                            <div className={value1.is_done === 0? "col-2 text-center font-weight-bold pa-font-size-10 pa-main-light" : "col-2 text-center pa-font-size-10 pa-light-grey" }>
                                                {moment(value1.transaction_date).format('YYYY-MM-DD HH:mm')}
                                            </div>
                                        </>
                                    )
                                })
                            :
                                null
                        }
                        </div>
                    </div>
                </>
            )
        })
    }
    
    onClick = () => {
        console.log(this.props.myTransactions)
    }

    render(){
        if(this.props.myTransactions.data === null){
            return(
                <>
                    <div className="font-weight-bold pa-font-size-18">
                        <Skeleton width={250} height={15} duration={1} />
                    </div>
                    <div className="mx-0 my-1 border-bottom">

                    </div>
                    <div className="px-0 pt-3 pb-0">
                        <div className="row justify-content-start px-3 py-0">
                        <div className="px-2 py-0">
                                <div className="px-3 py-1 pa-bg-light-grey pa-main-light" style={{borderRadius: 100}}>
                                    <Skeleton width={100} height={15} duration={1} style={{borderRadius: 100}} />
                                </div>
                            </div>
                            <div className="px-2 py-0">
                                <div className="px-3 py-1 pa-bg-light-grey pa-main-light" style={{borderRadius: 100}}>
                                    <Skeleton width={100} height={15} duration={1} style={{borderRadius: 100}} />
                                </div>
                            </div>
                            <div className="px-2 py-0">
                                <div className="px-3 py-1 pa-bg-light-grey pa-main-light" style={{borderRadius: 100}}>
                                    <Skeleton width={100} height={15} duration={1} style={{borderRadius: 100}} />
                                </div>
                            </div>
                            <div className="px-2 py-2 px-md-2 py-md-0">
                                <div className="px-3 py-1 pa-bg-light-grey pa-main-light" style={{borderRadius: 100}}>
                                    <Skeleton width={100} height={15} duration={1} style={{borderRadius: 100}} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-0 py-4">
                        <Skeleton width={450} height={150} duration={1} className="d-block d-md-none" />
                        <Skeleton width={825} height={150} duration={1} className="d-none d-md-block" />
                    </div>
                </>
            )
        }
        
        return(
            // TRANSACTIONS
            <div>
                <div className="font-weight-bold pa-font-size-30">
                    Transactions
                </div>
                <div className="mx-0 my-3 border-bottom">

                </div>
                {
                    this.state.successMessage?
                        <Alert isOpen={this.state.visible} toggle={() => this.setState({visible: false})} className="border-primary text-center font-weight-bold pa-bg-light pa-secondary" style={{borderRadius: 5}}>
                            Your Transaction Complete
                        </Alert>
                    :
                        null
                }
                <div className="px-0 py-0">
                    <div className="row justify-content-start px-3 py-0">
                        <div>
                            <div onClick={() => this.onGetMyTransactionsWaitingForPayment()} className={this.state.activeLink === 'Waiting For Payment'? "px-3 py-1 pa-clickable-element pa-bg-main-light pa-light" : "px-3 py-1 pa-clickable-element pa-bg-light-grey pa-main-light"} style={{borderRadius: 100}}>
                                Waiting For Payment
                            </div>
                        </div>
                        <div className="px-2 py-0">
                            <div onClick={() => this.onGetMyTransactionsPaid()} className={this.state.activeLink === 'Paid'? "px-3 py-1 pa-clickable-element pa-bg-main-light pa-light" : "px-3 py-1 pa-clickable-element pa-bg-light-grey pa-main-light"} style={{borderRadius: 100}}>
                                Paid
                            </div>
                        </div>
                        <div>
                            <div onClick={() => this.onGetMyTransactionsDeliver()} className={this.state.activeLink === 'Deliver'? "px-3 py-1 pa-clickable-element pa-bg-main-light pa-light" : "px-3 py-1 pa-clickable-element pa-bg-light-grey pa-main-light"} style={{borderRadius: 100}}>
                                Deliver
                            </div>
                        </div>
                        <div className="px-2 py-2 px-md-2 py-md-0">
                            <div onClick={() => this.onGetMyTransactionsComplete()} className={this.state.activeLink === 'Complete'? "px-3 py-1 pa-clickable-element pa-bg-main-light pa-light" : "px-3 py-1 pa-clickable-element pa-bg-light-grey pa-main-light"} style={{borderRadius: 100}}>
                                Complete
                            </div>
                        </div>
                    </div>
                </div>
                {   this.props.myTransactions.data.mapDataTransactionsUsers.length > 0?
                        this.mapMyTransactions()
                    :
                        <>
                            <div className="px-0 pt-5 pb-0 text-center">
                                <img alt="#" src={NotFound} width="40%" />
                            </div>
                            <div className="px-0 pt-0 pb-0 text-center pa-font-size-20 font-weight-bold">
                                Yah, Kosong . . .
                            </div>
                            <div className="pt-0 pb-3 text-center pa-dark-grey">
                                Yuk diisi sama produk punya kita.
                            </div>
                        </>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        myTransactions: state.myTransactions
    }
}

const mapDispatchToProps = { getMyTransactions, onExpiredTransaction, confirmMyTransaction }

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)