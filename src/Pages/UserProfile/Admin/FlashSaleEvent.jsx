import React, { Component } from 'react';
import { connect } from 'react-redux';
import Skeleton from 'react-loading-skeleton';

import { getAllDiscountProducts, createFlashSaleEvent } from './../../../Redux/Actions/UserProfile/flashSaleEventAction';

import { Alert } from 'reactstrap';

export class FlashSaleEvent extends Component{

    state = {
        eventDate: null,
        products_id: [],
        alert: false,
        inputError: false
    }

    componentDidMount(){
        this.props.getAllDiscountProducts()
    }

    mapDiscountProducts = () => {
        return this.props.flashSaleEvent.data.data.map((value, index) => {
            return(
                <tr>
                    <th scope="row">{value.id}</th>
                    <td>{value.name}</td>
                    <td>{value.discount}</td>
                    <td>
                        <div className="form-check">
                            <input type="checkbox" id={index} value={value.id} onChange={this.productSelected} className="form-check-input" />
                        </div>
                    </td>
                </tr>
            )
        })
    }

    productSelected = (element) => {
        if(element.target.checked === true){
            this.state.products_id.push(element.target.value)
        }else{
            for(var i = 0; i < this.state.products_id.length; i++){
                if(this.state.products_id[i] === element.target.value){
                    this.state.products_id.splice(i, 1)
                }
            }
        }
    }

    createFlashSaleEvent = () => {
        if(this.state.eventDate === null){
            this.setState({alert: true, inputError: 'Select Date To Create Your Event'})
        }else if(this.state.products_id.length < 6){
            this.setState({alert: true, inputError: 'Select Minimum 6 Products'})
        }else{
            this.setState({alert: false, inputError: false})
            
            const eventDate = this.state.eventDate
            const products_id = this.state.products_id
            const newData = {eventDate, products_id}

            this.props.createFlashSaleEvent(newData)
        }
    }

    render(){
        if(this.props.flashSaleEvent.data === null){
            return(
                <div>
                    <div className="font-weight-bold pa-font-size-18">
                        <Skeleton width={250} height={15} duration={1} />
                    </div>
                    <div className="mx-0 my-1 border-bottom">

                    </div>
                    <div className="px-0 py-4">
                        <div className="input-group mb-3">
                            <Skeleton width={825} height={30} duration={1} />
                        </div>
                    </div>
                    <div className="font-weight-bold pa-font-size-18">
                        <Skeleton width={150} height={15} duration={1} />
                    </div>
                    <div className="mx-0 my-1 border-bottom">

                    </div>
                    <div className="px-0 py-4">
                        <Skeleton width={450} height={150} duration={1} className="d-block d-md-none" />
                        <Skeleton width={825} height={150} duration={1} className="d-none d-md-block" />
                        <div className="btn mx-0 my-3 px-5 py-2 font-weight-bold pa-button-submit pa-main-light" style={{borderRadius: 10}}>
                            <Skeleton width={150} height={15} duration={1} />
                        </div>
                    </div>
                    
                    {
                        this.props.flashSaleEvent.error?
                            <Alert isOpen={alert} toggle="" className="border-0 text-center pa-bg-danger pa-light">
                                {this.props.flashSaleEvent.error}
                            </Alert>
                        :
                            null
                    }
                </div>
            )
        }

        return(
            // ADD FLASH SALE PRODUCTS
            <div>
                <div className="font-weight-bold pa-font-size-30">
                    Flah Sale Events
                </div>
                <div className="mx-0 my-1 border-bottom">

                </div>
                <div className="px-0 py-4">
                    <div className="input-group mb-3">
                        <input type="date" onChange={(e) => this.setState({eventDate: e.target.value}) } className="form-control" placeholder="Recipient's username" />
                        <div className="input-group-append">
                            <span className="input-group-text">Date</span>
                        </div>
                    </div>
                </div>
                <div className="font-weight-bold pa-font-size-30">
                    Products
                </div>
                <div className="mx-0 my-1 border-bottom">

                </div>
                <div className="px-0 py-4">
                    <table class="table border">
                        <thead class="thead-light">
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Discount (%)</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.mapDiscountProducts()
                            }
                        </tbody>
                    </table>
                    {
                        this.state.inputError?
                            <Alert isOpen={alert} toggle="" className="border-0 rounded-0 text-center pa-bg-danger pa-light">
                                {this.state.inputError}
                            </Alert>
                        :
                            null
                    }
                    <div onClick={() => this.createFlashSaleEvent()} className="btn mx-0 my-3 px-5 py-2 font-weight-bold pa-button-submit pa-main-light" style={{borderRadius: 10}}>
                        Create Event
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        flashSaleEvent: state.flashSaleEvent
    }
}

const mapDispatchToProps = { getAllDiscountProducts, createFlashSaleEvent }

export default connect(mapStateToProps, mapDispatchToProps)(FlashSaleEvent)