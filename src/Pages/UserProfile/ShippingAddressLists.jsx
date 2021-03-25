import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import Skeleton from 'react-loading-skeleton';

import { getUsersShippingAddress, onDeleteShippingAddress } from '../../Redux/Actions/UserProfile/ShippingAddressAction';

import './UserProfile.css';

import NotFound from './../../Support/Images/Not Found.webp';
import Axios from 'axios';

import { ApiUrl } from '../../Constant/ApiUrl';

export class ShippingAddressLists extends Component{

    state={
        active : false
    }

    componentDidMount(){
        const token = localStorage.getItem('token')

        this.props.getUsersShippingAddress(token)
    }

    updateMainAddress = (id) => {
        const token = localStorage.getItem('token')
        Axios.post(ApiUrl + 'member/shipping-address/edit-main-address', {id : id, token : token})
        .then((res) => {
            if(res.data.error){
                console.log('update gagal')
            }else{
                this.props.getUsersShippingAddress(token)
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    mapUsersShippingAddress = () => {
        return this.props.shippingAddress.data.data.map((value, index) => {
            return(
                <div key={index} className="mx-0 my-3 px-5 pt-3 pb-3 border rounded">
                    <div className="row justify-content-between align-items-center px-3 py-0">
                        <div className="font-weight-bold pa-font-size-18">
                            {value.receiver_name}
                        </div>
                        <div>
                            {
                                value.is_main_address === 1?
                                    <span className="px-2 py-1 rounded pa-bg-secondary pa-light">
                                        Main Address
                                    </span>
                                :
                                    null
                            }
                            {
                                value.is_main_address === 1?
                                    null
                                    :
                                <div onClick={() => this.updateMainAddress(value.id)} style={{cursor : 'pointer'}} className="px-2 py-1 rounded pa-bg-info pa-light">
                                    Set main Address
                                </div>
                            }
                        </div>
                    </div>
                    <div>
                        {value.address_detail}, {value.city}, {value.province}
                    </div>
                    <div>
                        Phone : {value.phone_number}
                    </div>
                    <div className="px-0 pt-3 pb-0">
                        <span className="font-weight-bold pa-main-light">
                            <Link to={'/member/shipping-address/edit-address/' + value.id} className="pa-link">
                                Edit
                            </Link>
                        </span>
                        <span onClick={() => this.deleteShippingAddress(value.id, value.users_id)} className="px-2 py-0 font-weight-bold pa-clickable-element pa-danger">
                            Delete
                        </span>
                    </div>
                </div>
            )
        })
    }

    deleteShippingAddress = (address_id) => {
        const token = localStorage.getItem('token')

        if(window.confirm('Are you sure want to delete this address?')){
            const data = {
                token, 
                address_id
            }
            this.props.onDeleteShippingAddress(data)
        }
    }

    render(){
        if(this.props.shippingAddress.data === null){
            return(
                <div>
                    <div className="row justify-content-between align-items-center px-3 py-0">
                        <div>
                            <div className="font-weight-bold pa-font-size-30" style={{marginTop: -5, marginBottom: 0}}>
                                Shipping Address
                            </div>
                        </div>
                        <div>
                            <Link to="/member/shipping-address/add-address" className="pa-link">
                                <div className="btn mx-0 my-2 px-3 py-1 font-weight-bold pa-button-submit pa-main-light" style={{borderRadius: 10}}>
                                    Add Address
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="mx-0 my-3 px-5 pt-3 pb-3 border rounded">
                        <div className="row justify-content-between align-items-center px-3 py-0">
                            <div className="font-weight-bold pa-font-size-18">
                                <Skeleton width={250} height={20} duration={1} />
                            </div>
                            <div>
                                <span className="px-3 py-1">
                                    <Skeleton width={100} height={10} duration={1} className="d-none d-md-block" />
                                    <Skeleton width={30} height={10} duration={1} className="d-block d-md-none" />
                                </span>
                            </div>
                        </div>
                        <div className="pt-2 pb-1">
                            <Skeleton width={375} height={10} duration={1} />
                        </div>
                        <div>
                            <Skeleton width={150} height={10} duration={1} />
                        </div>
                        <div className="px-0 pt-3 pb-0">
                            <span className="font-weight-bold pa-main-light">
                                <Skeleton width={50} height={10} duration={1} />
                            </span>
                            <span className="px-2 py-0 font-weight-bold pa-danger">
                                <Skeleton width={50} height={10} duration={1} />
                            </span>
                        </div>
                    </div>
                </div>
            )
        }

        return(
            // SHIPPING ADDRESS LISTS
            <div>
                <div className="row justify-content-between align-items-center px-3 py-0">
                    <div>
                        <div className="font-weight-bold pa-font-size-30" style={{marginTop: -5, marginBottom: 0}}>
                            Shipping Address
                        </div>
                    </div>
                    <div>
                        <Link to="/member/shipping-address/add-address" className="pa-link">
                            <div className="btn mx-0 my-2 px-3 py-1 font-weight-bold pa-button-submit pa-main-light" style={{borderRadius: 10}}>
                                Add Address
                            </div>
                        </Link>
                    </div>
                </div>
                {
                    this.props.shippingAddress.data.data.length > 0?
                        this.mapUsersShippingAddress()
                    :
                        <>
                            <div className="px-0 pt-5 pb-0 text-center">
                                <img alt="#" src={NotFound} width="40%" />
                            </div>
                            <div className="px-0 pt-0 pb-0 text-center pa-font-size-20 font-weight-bold">
                                Belum Ada Alamat Pengiriman
                            </div>
                            <div className="pt-0 pb-3 text-center pa-dark-grey">
                                Isi alamat pengirimanmu sekarang lalu berbelanja ya!
                            </div>
                        </>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        shippingAddress: state.shippingAddress
    }
}

const mapDispatchToProps = { getUsersShippingAddress, onDeleteShippingAddress }

export default connect(mapStateToProps, mapDispatchToProps)(ShippingAddressLists)