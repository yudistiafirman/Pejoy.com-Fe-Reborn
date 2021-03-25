import React, { Component } from 'react';
import Axios from 'axios';
import { UrlAPI } from './../../Support/Constants/UrlAPI';
import { Link } from "react-router-dom";
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { connect } from 'react-redux';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Skeleton from 'react-loading-skeleton';

import { onUpdateShippingAddress } from './../../Redux/Actions/UserProfile/ShippingAddressAction';
import { onGetProvinceIdRajaOngkir } from '../../Redux/Actions/UserProfile/rajaOngkirProvinceAction';
import { onGetCityIdRajaOngkir } from '../../Redux/Actions/UserProfile/rajaOngkirCityAction';

import { Alert } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import Loader from 'react-loader-spinner'

import './UserProfile.css';

export class EditShippingAddress extends Component{

    state = {
        address: '',
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        mapCenter: {
          lat: '',
          lng: ''
        },
        data: {
            id: '',
            address_detail: '',
            city: '',
            province: '',
            phone_number: '',
            receiver_name: '',
            users_id: 1,
            longUser: '',
            latUser: '',
            is_main_address: 0,
            province_id: '',
            city_id: '',
            nearest_place: ''
        },
        errorInput: ''
      }

      componentDidMount(){
        this.getUsersShippingAddressToEdit()
        this.props.onGetProvinceIdRajaOngkir()
      }

      getUsersShippingAddressToEdit = () => {
        const data =  {
            id: Number(window.location.pathname.split('/')[4])
        }

        Axios.post(UrlAPI + 'member/shipping-address/edit-address', data)
        .then((res) => {
            this.setState({data: {
                id: res.data.data[0].id,
                address_detail: res.data.data[0].address_detail,
                city: res.data.data[0].city,
                province: res.data.data[0].province,
                phone_number: res.data.data[0].phone_number,
                receiver_name: res.data.data[0].receiver_name,
                users_id: 1,
                longUser: res.data.data[0].longUser,
                latUser: res.data.data[0].latUser,
                is_main_address: res.data.data[0].is_main_address,
                province_id: res.data.data[0].province_id,
                city_id: res.data.data[0].city_id, 
                nearest_place: res.data.data[0].nearest_place
            }})

            this.setState({mapCenter: {lat: res.data.data[0].latUser, lng: res.data.data[0].longUser}})

            this.setState({address: res.data.data[0].nearest_place})
        })
        .catch((err) => {
            console.log(err)
        })    
      }

      handleChange = address => {
        this.setState({ address })
      }
     
      handleSelect = address => {
        this.setState({ address })
        this.setState({data: {...this.state.data, nearest_place: address} })
        this.setState({errorInput: ''})

        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => {
            console.log('Success', latLng);
            console.log(latLng.lat, latLng.lng)
    
            // Update Center State Of Maps
            this.setState({ mapCenter: latLng });
            
            this.setState({data: {...this.state.data, longUser: latLng.lng, latUser: latLng.lat}})
          })
          .catch(error => console.error('Error', error));
        }

      onGetCity = (e) => {
        const data = {
            province_id: Number(String(e).split('/')[0])
        }

        this.setState({data: {...this.state.data, province: String(e).split('/')[1], province_id: Number(String(e).split('/')[0])}})

        this.props.onGetCityIdRajaOngkir(data)
      }

      updateShippingAddress = () => {
        if(!this.state.data.receiver_name || !this.state.data.phone_number || !this.state.data.address_detail || !this.state.data.city){
            this.setState({errorInput: 'Please Fill Your Valid Data!'})
        }else{
            this.props.onUpdateShippingAddress(this.state.data)

            if(this.props.shippingAddress.data.error === false){
                window.scrollTo(0,0)
                this.setState({successMessage : 'Your Address Saved'})
                setTimeout(function(){window.location = '/member/shipping-address'}, 3000)
            }
        }
      }

    render(){
        if(this.props.rajaOngkirProvince.data === null){
            return(
                <div>
                    <div className="row justify-content-start align-items-center px-3 py-0">
                        <div className="pl-0 pr-3 py-0" style={{marginTop: -5, marginBottom: 0}}>
                            <Link to="/member/shipping-address" className="pa-link pa-font-size-25">
                                <Skeleton width={35} height={35} duration={1} />
                            </Link>
                        </div>
                        <div>
                            <div className="font-weight-bold pa-font-size-30" style={{marginTop: -5, marginBottom: 0}}>
                                <Skeleton width={350} height={35} duration={1} />
                            </div>
                        </div>
                    </div>
                    <div className="px-0 py-4">
                        <div className="form-group">
                            <Skeleton width={150} height={15} duration={1} />
                            <Skeleton width="100%" height={35} duration={1} />
                        </div>
                        <div className="form-group">
                            <Skeleton width={150} height={15} duration={1} />
                            <Skeleton width="100%" height={35} duration={1} />
                        </div>
                        <div className="form-group">
                            <Skeleton width={150} height={15} duration={1} />
                            <Skeleton width="100%" height={35} duration={1} />
                        </div>
                        <Skeleton width={150} height={15} duration={1} />
                        <Skeleton width="100%" height={35} duration={1} />
                        <div className="form-group">
                            <Skeleton width={250} height={15} duration={1} />
                        </div>
                        <div>
                            <div className="btn mx-0 my-3 px-5 py-2 font-weight-bold pa-button-submit pa-main-light" style={{borderRadius: 10}}>
                                <Skeleton width={150} height={15} duration={1} />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        return(
            // ADD SHIPPING ADDRESS
            <div>
                <div className="row justify-content-start align-items-center px-3 py-0">
                    <div className="pl-0 pr-3 py-0" style={{marginTop: -5, marginBottom: 0}}>
                        <Link to="/member/shipping-address" className="pa-link pa-font-size-25">
                            <FontAwesomeIcon icon={faArrowCircleLeft} />
                        </Link>
                    </div>
                    <div>
                        <div className="font-weight-bold pa-font-size-30" style={{marginTop: -5, marginBottom: 0}}>
                            Edit Address
                        </div>
                    </div>
                </div>
                <div className="px-0 pt-4 pb-2">
                    {
                        this.state.successMessage?
                            <Alert isOpen={alert} toggle="" className="border-primary text-center font-weight-bold pa-bg-light pa-main-light" style={{borderRadius: 5}}>
                                Your Address Saved
                            </Alert>
                        :
                            null
                    }
                </div>
                <div className="px-0 pt-0 pb-4">
                    <div className="form-group">
                        <label  className="pa-main-light">Consignee</label>
                        <input type="text" value={this.state.data.receiver_name} onChange={(e) => this.setState({data: {...this.state.data, receiver_name: e.target.value}})} className="form-control" placeholder="Ex. Widodo C. Putro" />
                    </div>
                    <div className="form-group">
                        <label  className="pa-main-light">Phone Number</label>
                        <input type="text" value={this.state.data.phone_number} onChange={(e) => this.setState({data: {...this.state.data, phone_number: e.target.value}})} className="form-control" placeholder="Ex. 081118140006" />
                    </div>
                    <div className="form-group">
                        <label  className="pa-main-light">Full Address</label>
                        <input type="text" value={this.state.data.address_detail} onChange={(e) => this.setState({data: {...this.state.data, address_detail: e.target.value}})} className="form-control" placeholder="Ex. Jalan Puri Asri Blok C5, Sukapada, Kec. Cibeunying Kidul" />
                    </div>
                    <div className="form-group">
                        <label className="pa-main-light">Province</label>
                        <select name="province" onChange={(e) => this.onGetCity(e.target.value)}  className="form-control">
                            <option value={this.state.data.province_id + '/' + this.state.data.province}>{this.state.data.province}</option>
                            {
                                this.props.rajaOngkirProvince.data.data.rajaongkir.results.map((value, index) => {
                                    return(
                                        <option value={value.province_id + '/' + value.province}>{value.province}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    {
                        this.props.rajaOngkirCity.loading === true?
                            <div>
                                <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
                            </div>
                        :
                            this.props.rajaOngkirCity === null?
                                <div>
                                    <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
                                </div>
                            :
                                this.props.rajaOngkirCity.data !== null?
                                    <div className="form-group">
                                        <label className="pa-main-light">City</label>
                                        <select name="city" onChange={(e) => this.setState({data: {...this.state.data, city: String(e.target.value).split('/')[1], city_id: Number(String(e.target.value).split('/')[0])}})}  className="form-control">
                                            <option>Select</option>
                                            {
                                                this.props.rajaOngkirCity.data.map((value, index) => {
                                                    return(
                                                        <option value={value.city_id + '/' + value.city_name}>{value.city_type + ' ' + value.city_name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                :
                                            null
                    }
                    <div>
                        <PlacesAutocomplete
                            value={this.state.address}
                            onChange={this.handleChange}
                            onSelect={this.handleSelect}
                        >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div className="form-group">
                                    <label  className="pa-main-light">Find Your Nearest Location</label>
                                    <input
                                        {...getInputProps({
                                        placeholder: "Ex. Universitas Widyatama",
                                        className: "form-control",
                                        })}
                                    />
                                    <div>
                                        {
                                            loading && 
                                            <div>
                                                <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
                                            </div>
                                        }
                                        {
                                            suggestions.map(suggestion => {
                                                const className = suggestion.active
                                                    ? 'mx-0 my-3 pt-0 pb-3 border-bottom border-primary suggestion-item--active'
                                                    : 'mx-0 my-3 pt-0 pb-3 border-bottom suggestion-item'
                                            
                                                const style = suggestion.active
                                                    ? { backgroundColor: '#fff', cursor: 'pointer' }
                                                    : { backgroundColor: '#ffffff', cursor: 'pointer' }
                                                return (
                                                    <div
                                                        {...getSuggestionItemProps(suggestion, {
                                                            className,
                                                            style,
                                                        })}
                                                    >
                                                        <span className="pa-font-size-18">{suggestion.description}</span>
                                                    </div>
                                                )
                                            }
                                        )}
                                    </div>
                                </div>
                            )}
                        </PlacesAutocomplete>
                    </div>
                    <div className="position-relative">
                        <Map 
                            google={this.props.google}
                            initialCenter={{
                                lat: this.state.mapCenter.lat,
                                lng: this.state.mapCenter.lng
                            }}
                            center={{
                                lat: this.state.mapCenter.lat,
                                lng: this.state.mapCenter.lng
                            }}
                            style={{width: '100%', height: 200}}
                        >
                        <Marker 
                            position={{
                                lat: this.state.mapCenter.lat,
                                lng: this.state.mapCenter.lng
                            }} />
                        </Map>
                    </div>
                    <div className="form-group" style={{marginTop: 240, marginBottom: 15}}>
                        <div className="form-check">
                            <input type="checkbox" checked={this.state.data.is_main_address === 1? true : false} onChange={(e) => e.target.checked === true? this.setState({data: {...this.state.data, is_main_address: 1}}) : this.setState({data: {...this.state.data, is_main_address: 0}})} className="form-check-input" />
                            <label className="form-check-label font-weight-bold pa-secondary">
                                Use For Main Address
                            </label>
                            <label className="form-check-label ml-1 mr-0 my-0 pa-secondary">
                                 (Your Main Addrss Will Be Change With This)
                            </label>
                        </div>
                    </div>
                    <div>
                        <div onClick={() => this.updateShippingAddress()} className="btn mx-0 my-2 px-5 py-2 font-weight-bold pa-button-submit pa-main-light" style={{borderRadius: 10}}>
                            Save Address
                        </div>
                    </div>
                    <div className="px-0 py-3">
                        {
                            this.state.errorInput?
                                <Alert isOpen={alert} toggle="" className="border-0 text-center pa-bg-danger pa-light" style={{borderRadius: 10}}>
                                    {this.state.errorInput}
                                </Alert>
                            :
                                null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        shippingAddress: state.shippingAddress,
        rajaOngkirProvince: state.rajaOngkirProvince,
        rajaOngkirCity: state.rajaOngkirCity
    }
}

const mapDispatchToProps = { onUpdateShippingAddress, onGetProvinceIdRajaOngkir, onGetCityIdRajaOngkir }

export default GoogleApiWrapper({ apiKey: ('AIzaSyDRibTto-9-y2x18URkKqx3JruKW1Y7wE8') })(connect(mapStateToProps, mapDispatchToProps)(EditShippingAddress))