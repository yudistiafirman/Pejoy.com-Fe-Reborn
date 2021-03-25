import React, { Component } from 'react';
import { connect } from 'react-redux';
import Skeleton from 'react-loading-skeleton';

import { getUsersTransactions, deliverProductsToCustomer } from './../../../Redux/Actions/UserProfile/usersTransactionsAction';

import NotFound from './../../../Support/Images/Not Found.webp';

import { Alert } from 'reactstrap';

export class SeeTransactions extends Component{

    state = {
        moreProducts: 1,
        activeLink: null,
        visible: true,
        successMessage: ''
    }

    componentDidMount(){
        const data = {
            status_name_id: 1
        }

        this.props.getUsersTransactions(data)
    }

    onGetTransactionsWaitingForPayment = () => {
        this.setState({activeLink: 'Waiting For Payment'})
        
        const data = {
            status_name_id: 1
        }

        this.props.getUsersTransactions(data)
    }

    onGetTransactionsPaid = () => {
        this.setState({activeLink: 'Paid'})

        const data = {
            status_name_id: 2
        }

        this.props.getUsersTransactions(data)
    }

    onGetTransactionsDeliver = () => {
        this.setState({activeLink: 'Deliver'})
        
        const data = {
            status_name_id: 3
        }

        this.props.getUsersTransactions(data)
    }

    onGetTransactionsComplete = () => {
        this.setState({activeLink: 'Complete'})
        
        const data = {
            status_name_id: 4
        }

        this.props.getUsersTransactions(data)
    }

    onSendProduct = (data1, data2) => {
        const data = [
            data1, 
            data2
        ]

        this.props.deliverProductsToCustomer(data)

        if(this.props.usersTransactions.data.error === false){
            window.scrollTo(0,0)
            this.setState({successMessage : 'Customer Products Delivered Successfully'})
        }
    }

    mapUsersTransactions = () => {
        return this.props.usersTransactions.data.data.map((value, index) => {
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
                                {
                                    value.status === 'Paid'?
                                        <div onClick={() => this.onSendProduct(value.id, value.detail_transaction_to_update)} className="btn mx-0 my-1 px-3 py-1 font-weight-bold pa-button-submit pa-font-size-12 pa-main-light" style={{borderRadius: 10}}>
                                            Send Products
                                        </div>
                                    :
                                        null
                                }
                            </div>
                            <div className="col-6 border-left text-center">
                                <p className="pa-font-size-15">
                                    Status :
                                </p>
                                <p className="font-weight-bold pa-font-size-16 pa-dark">
                                    Transaction {value.status}
                                </p>
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
                                                    {val.brand_name + ' ' + val.product_name}
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
                                <p className="font-weight-bold pa-font-size-16 pa-main-light">
                                    PJY/TRNSCTNS/000{value.id}
                                </p>
                                {
                                    value.status === 'Paid'?
                                        <div onClick={() => this.onSendProduct(value.id, value.detail_transaction_to_update)} className="btn mx-0 my-1 px-3 py-1 font-weight-bold pa-button-submit pa-font-size-12 pa-main-light" style={{borderRadius: 10}}>
                                            Send Products
                                        </div>
                                    :
                                        null
                                }
                            </div>
                            <div className="col-4 border-left text-center">
                                <p className="pa-font-size-15">
                                    Status :
                                </p>
                                <p className="font-weight-bold pa-font-size-16 pa-dark">
                                    Transaction {value.status}
                                </p>
                            </div>
                            <div className="col-4 border-left text-right">
                                <p className="pa-font-size-15">
                                    Total :
                                </p>
                                <p className="font-weight-bold pa-font-size-16 pa-secondary">
                                    Rp.{(value.total).toLocaleString('Id-ID')}
                                </p>
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
                                                    {val.brand_name + ' ' + val.product_name}
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
                </>
            )
        })
    }

    render(){
        if(this.props.usersTransactions.data === null){
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
            // SEE TRANSACTIONS
            <div>
                <div className="font-weight-bold pa-font-size-30">
                    Users Transactions
                </div>
                <div className="mx-0 my-3 border-bottom">

                </div>
                {
                    this.state.successMessage?
                        <Alert isOpen={this.state.visible} toggle={() => this.setState({visible: false})} className="border-primary text-center font-weight-bold pa-bg-light pa-secondary" style={{borderRadius: 5}}>
                            Customer Products Delivered Successfully
                        </Alert>
                    :
                        null
                }
                <div className="px-0 py-0">
                    <div className="row justify-content-start px-3 py-0">
                        <div>
                            <div onClick={() => this.onGetTransactionsWaitingForPayment()} className={this.state.activeLink === 'Waiting For Payment'? "px-3 py-1 pa-clickable-element pa-bg-main-light pa-light" : "px-3 py-1 pa-clickable-element pa-bg-light-grey pa-main-light"} style={{borderRadius: 100}}>
                                Waiting For Payment
                            </div>
                        </div>
                        <div className="px-2 py-0">
                            <div onClick={() => this.onGetTransactionsPaid()} className={this.state.activeLink === 'Paid'? "px-3 py-1 pa-clickable-element pa-bg-main-light pa-light" : "px-3 py-1 pa-clickable-element pa-bg-light-grey pa-main-light"} style={{borderRadius: 100}}>
                                Paid
                            </div>
                        </div>
                        <div>
                            <div onClick={() => this.onGetTransactionsDeliver()} className={this.state.activeLink === 'Deliver'? "px-3 py-1 pa-clickable-element pa-bg-main-light pa-light" : "px-3 py-1 pa-clickable-element pa-bg-light-grey pa-main-light"} style={{borderRadius: 100}}>
                                Deliver
                            </div>
                        </div>
                        <div className="px-2 py-2 px-md-2 py-md-0">
                            <div onClick={() => this.onGetTransactionsComplete()} className={this.state.activeLink === 'Complete'? "px-3 py-1 pa-clickable-element pa-bg-main-light pa-light" : "px-3 py-1 pa-clickable-element pa-bg-light-grey pa-main-light"} style={{borderRadius: 100}}>
                                Complete
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.props.usersTransactions.data.data.length > 0?
                        this.mapUsersTransactions()
                    :
                        <>
                            <div className="px-0 pt-5 pb-0 text-center">
                                <img alt="#" src={NotFound} width="40%" />
                            </div>
                            <div className="px-0 pt-0 pb-0 text-center pa-font-size-20 font-weight-bold">
                                Ciye, Nungguin Ya?
                            </div>
                            <div className="pt-0 pb-3 text-center pa-dark-grey">
                                Tunggu Update Selanjutnya Ya Min!
                            </div>
                        </>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        usersTransactions: state.usersTransactions
    }
}

const mapDispatchToProps = { getUsersTransactions, deliverProductsToCustomer }

export default connect(mapStateToProps, mapDispatchToProps)(SeeTransactions)