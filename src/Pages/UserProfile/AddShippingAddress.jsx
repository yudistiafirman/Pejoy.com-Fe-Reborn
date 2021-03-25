import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { connect } from 'react-redux';
import Skeleton from 'react-loading-skeleton';

import { onSaveShippingAddress } from './../../Redux/Actions/UserProfile/ShippingAddressAction';
import { onGetProvinceIdRajaOngkir } from '../../Redux/Actions/UserProfile/rajaOngkirProvinceAction';
import { onGetCityIdRajaOngkir } from '../../Redux/Actions/UserProfile/rajaOngkirCityAction';

import { Alert } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import Loader from 'react-loader-spinner';
import LatLang from '../../Support/Images/latlang.png'
import AfterCopy from '../../Support/Images/aftercopy.png'

import './UserProfile.css';

export class AddShippingAddress extends Component{

    state = {
        is_autoCompleteError:false,
        address: '',
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        mapCenter: {
          lat: 49.2827291,
          lng: -123.1207375
        },
        data: {
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
        errorInput: '',
        successMessage: '',
        dataRajaOngkirProvinceSuggestions: []
      }

      componentDidMount(){
        const token = localStorage.getItem('token')
        
        this.setState({data: {...this.state.data, token}})

        this.props.onGetProvinceIdRajaOngkir()
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

      saveShippingAddress = async () => {
          console.log(this.state.data)
        if(!this.state.data.receiver_name || !this.state.data.phone_number || !this.state.data.address_detail || !this.state.data.city || !this.state.data.longUser || !this.state.data.latUser){
            this.setState({errorInput: 'Please Fill Your Valid Data'})
        }
        else{
            this.props.onSaveShippingAddress(this.state.data)
            
            if(this.props.shippingAddress.data.error === false){
                window.scrollTo(0,0)
                this.setState({successMessage : 'Your Address Added Succesfully'})
                setTimeout(function(){window.location = '/member/shipping-address'}, 3000)
            }
        }
      }

    render(){
        if(this.props.rajaOngkirProvince.data === null){
            return(
                <div>
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
                            Shipping Address
                        </div>
                    </div>
                </div>
                <div className="px-0 pt-4 pb-2">
                    {
                        this.state.successMessage?
                            <Alert isOpen={alert} toggle="" className="border-primary text-center font-weight-bold pa-bg-light pa-main-light" style={{borderRadius: 5}}>
                                Your Address Added Successfully
                            </Alert>
                        :
                            null
                    }
                </div>
                <div className="px-0 pt-0 pb-4">
                    <div className="form-group">
                        <label  className="pa-main-light">Consignee</label>
                        <input type="text" onChange={(e) => this.setState({data: {...this.state.data, receiver_name: e.target.value}})} className="form-control" placeholder="Ex. Widodo C. Putro" />
                    </div>
                    <div className="form-group">
                        <label  className="pa-main-light">Phone Number</label>
                        <input type="text" onChange={(e) => this.setState({data: {...this.state.data, phone_number: e.target.value}})} className="form-control" placeholder="Ex. 081118140006" />
                    </div>
                    <div className="form-group">
                        <label  className="pa-main-light">Full Address</label>
                        <input type="text" onChange={(e) => this.setState({data: {...this.state.data, address_detail: e.target.value}})} className="form-control" placeholder="Ex. Jalan Puri Asri Blok C5, Sukapada, Kec. Cibeunying Kidul" />
                    </div>
                    <div className="form-group">
                        <label className="pa-main-light">Province</label>
                        <select name="province" onChange={(e) => this.onGetCity(e.target.value)}  className="form-control">
                            <option>Select</option>
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
                    {
                        !this.state.is_autoCompleteError?
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
                                                console.log(suggestion)
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
                    </div>:null
                    }
             
                    {/* incase google api expired */}
                    <div style={{border:'1px solid red',borderRadius:'5px'}} className="form-group ">
                        <div style={{margin:10,fontSize:'12px'}}>
                        <p style={{fontSize:'12px',fontWeight:'bold'}} >Dear our valued customers,</p>
                        <p style={{fontSize:'12px'}} >in case the place autocomplete for detect your nearest location or your current location don't show up <b>due to javascript google maps api key expired</b> </p>
                        <p   style={{fontSize:'12px'}} >or still theres an warning show up even you fill up your form correctly</p>
                        <p  style={{fontSize:'12px'}} >kindly  press the button below and fill up the form that will show up below</p>
                        <button onClick={()=>this.setState({is_autoCompleteError:!this.state.is_autoCompleteError})} style={{height:'20px',fontSize:'12px',display:'flex',justifyContent:'center',alignItems:'center'}} className="btn btn-success">click me</button>
                    
                        </div>
                    </div>
                    
                        {
                            this.state.is_autoCompleteError?
                            <div>
                            <div style={{border:'1px solid red',borderRadius:'5px'}} className="form-group ">
                                    <div style={{margin:'10px'}}>
                                    <p style={{fontWeight:'bold',fontSize:'12px'}}>Instructions:</p>
                                    <p style={{fontWeight:'bold',fontSize:'12px'}}>1. to fill up the nearest place just submit nearest landmark place by your location</p>
                                     <p style={{fontWeight:'bold',fontSize:'12px'}}>2. to fill up the your latitude and longitude go to google maps mark your places  after its marked </p>
                                  
                                    <p style={{fontWeight:'bold',fontSize:'12px'}}>clicked the right mouse your latitude value is the first group of number before the comma and your longitude is after the comma on the first column. </p>
                                    <img alt="#" style={{width:'50%',height:'50%'}} src={LatLang}/>
                                    <p style={{fontWeight:'bold',fontSize:'12px'}}>3.clicked those values and it will be copied automatically once you clicked its just paste it to any text editor on your pc to get full info of your latitude and longitude</p>
                                    <img alt="#" style={{width:'50%',height:'50%'}} src={AfterCopy}/>
                                    <p style={{fontWeight:'bold',fontSize:'12px'}}>4.kindly submit the correct  latitude and longitude values so we can estimate your shipping rates </p>
                                    <br/>
                                    <p style={{fontWeight:'bold',fontSize:'12px'}}>we are extremely sorry for the incovenience</p>
                                    <p style={{fontWeight:'bold',fontSize:'12px'}}>Warmest Regards,</p>
                                    <br/>
                                    <br/>
                                    <p style={{fontWeight:'bold',fontSize:'12px'}}>Firman Hadi</p>
                                    <p style={{fontWeight:'bold',fontSize:'12px'}}>Director of Financial and Business Asia and Australia Region  </p>
                           
                                 </div>
                            </div>
                                 <div className="form-group">
                                 <label  className="pa-main-light">Find Your Nearest Location in case google api expired</label>
                                 <input onChange={(e)=>this.setState({data:{...this.state.data,nearest_place:e.target.value}})} placeholder= "Ex. Universitas Widyatama" className= "form-control" type="text"/>
            
                                </div>
                                <div className="form-group">
                                 <label  className="pa-main-light">your latitude</label>
                                 <input onChange={(e)=>this.setState({data:{...this.state.data,latUser:e.target.value}})} className= "form-control" type="text"/>
            
                                </div>
                                <div className="form-group">
                                 <label  className="pa-main-light">your longitude</label>
                                 <input onChange={(e)=>this.setState({data:{...this.state.data,longUser:e.target.value}})}  className= "form-control" type="text"/>
            
                                </div>
                                </div>
                                :null
                        }

               
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
                            <input type="checkbox" onChange={(e) => e.target.checked === true? this.setState({data: {...this.state.data, is_main_address: 1}}) : this.setState({data: {...this.state.data, is_main_address: 0}})} className="form-check-input" />
                            <label className="form-check-label font-weight-bold pa-secondary">
                                Use For Main Address
                            </label>
                            <label className="form-check-label ml-1 mr-0 my-0 pa-secondary">
                                 (Your Main Address Will Be Change With This)
                            </label>
                        </div>
                    </div>
                    <div>
                        <div onClick={() => this.saveShippingAddress()} className="btn w-100 mx-0 my-2 px-5 py-2 font-weight-bold pa-button-submit pa-main-light" style={{borderRadius: 10}}>
                            Add Address
                        </div>
                    </div>
                    <div className="px-0 py-3">
                        {
                            this.state.errorInput?
                                <Alert isOpen={alert} toggle="" className="border-danger text-center font-weight-bold pa-bg-light pa-danger" style={{borderRadius: 10}}>
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

const mapDispatchToProps = { onSaveShippingAddress, onGetProvinceIdRajaOngkir, onGetCityIdRajaOngkir }

export default GoogleApiWrapper({ apiKey: (process.env.REACT_APP_GOOGLE_MAPS_ID) })(connect(mapStateToProps, mapDispatchToProps)(AddShippingAddress))