import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { onGetDataUsers } from './../../Redux/Actions/UserProfile/userProfileAction';
import { getCartData } from './../../Redux/Actions/Products/CartActions';
import {GetAllProduct}from './../../Redux/Actions/Products/GetProductActions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,  faTimes } from '@fortawesome/free-solid-svg-icons';

import ScrollFunction from './../../Support/Functions/NavbarScroll.js';

import './../../Support/CSS-Utils/utils.css';
import './Navbar.css';
import Loader from 'react-loader-spinner';

import PejoyLogo from './../../Support/Images/Pejoy Logo.png';
import MenuIcon from './../../Support/Images/Menu.png';
import ShoppingBag from './../../Support/Images/Shopping Bag.png';
import TShirtIcon from './../../Support/Images/T-Shirt.png';
import PantsIcon from './../../Support/Images/Trousers.png';
import ShirtIcon from './../../Support/Images/Shirt.png';
import JacketIcon from './../../Support/Images/Jacket.png';
import ShoesIcon from './../../Support/Images/Shoes.png';
import HatIcon from './../../Support/Images/Hat.png';
import EmptyCart from './../../Support/Images/Empty Cart.webp';


export class Navbar extends Component {
    constructor(props) {
        super(props);
        this.sidebar = React.createRef();
    }

    state = {
        loginStatus: null,
        loginErrorMessage: '',
        openDropdown: false,
        openCart: false,
        openAccount: false,
        inputSearch: '',
        selectCategory: '',
        categoryName: ''
    }

    componentDidMount(){
        const token = localStorage.getItem('token')
      

        if(token){
            this.setState({loginStatus: true})
        }

        this.props.onGetDataUsers(token)
        this.props.getCartData(token)
        this.props.GetAllProduct()

        window.onscroll = function() { ScrollFunction() }
    }

      
    

    onOpenSidebar = () => {
        this.sidebar.current.style.width = "250px";
    }

    onCloseSidebar = () => {
        this.sidebar.current.style.width = "0px";
    }

    mapDataCart = () => {
        return this.props.cart.data.map((value, index) => {
            return(
                <div className="row justify-content-between px-2 pt-2 pb-2 mx-2 my-0 border-bottom">
                    <div className="col-2">
                        <img src={'http://localhost:2000/public/product/' + value.url} alt={'Best Seller Product Image ' + index + 1} width="100%" />
                    </div>
                    <div className="col-5 px-0 py-0">
                        <p className="text-left font-weight-bold">
                            {value.brands_name + ' ' + value.name}
                        </p>
                        <p className="text-left pa-font-size-15 pa-dark-grey" style={{marginTop: -5, marginBottom: 0}}>
                            Size : {value.size}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="pa-font-size-16">
                            Rp.{(value.price - (value.price * (value.discount / 100))).toLocaleString('id-ID')}
                        </p>
                        {
                            value.discount?
                                <>
                                    <p className="pa-font-size-12">
                                        <del>Rp.{Number(value.price).toLocaleString('id-ID')}</del>
                                    </p>
                                    <p className="pa-font-size-12 pa-secondary">
                                        {value.discount}% OFF
                                    </p>
                                </>
                            :
                                null
                        }
                    </div>
                </div>
            )
        })
    }

    render(){

        return(
            // NAVBAR
            <div>
                {/* Mobile Section */}
                <div id="navbar" className="px-0 py-3 pa-navbar-mobile-display" style={{transition: '0.3s', zIndex: 9}}>
                    <div className="container">
                        <div  className="row justify-content-center align-items-center">
                            <div onClick={() => this.onOpenSidebar()} className="col-1 pa-clickable-element">
                                <img alt="#" src={MenuIcon} width="30" />
                            </div>
                            <div className="col-11">
                                <div className="input-group">
                                    <input type="text" placeholder="Kamu lagi cari apa?" className="form-control bg-light border border-light pa-input" style={{width: 0, height: 37, borderRadius: "5px 0px 0px 5px", zIndex: 1}} />
                                    <div className="input-group-prepend">
                                        <span className="bg-light" style={{width: 20, marginLeft: -1, marginRight: 0, borderRadius: "0px 5px 5px 0px", zIndex: 2}}>
                                            <div className="row">
                                                <div className="px-2 py-1 pa-bg-main-dark rounded pa-light pa-clickable-element" style={{marginLeft: 0, marginRight: 6, marginTop: 3, marginBottom: 0}}> 
                                                    <FontAwesomeIcon icon={faSearch} className="fa-md" />
                                                </div>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                {/* Desktop Section */}
                <div className="w-100 px-0 py-3 position-fixed pa-navbar-desktop-display pa-bg-main-light" style={{zIndex: 10}}>
                    <div className="container">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-2 align-self-center">
                                <Link to="/" className="pa-clickable-element pa-link">
                                    <img alt="#" src={PejoyLogo} width="150" />
                                </Link>
                            </div>
                            <div style={{position:'relative'}} className="col-7">
                                <div className="input-group">
                                    <input  onClick={() => this.setState({openDropdown: !this.state.openDropdown, openCart: false, openAccount: false})} type="text" onChange={(e) => this.setState({inputSearch: e.target.value,openDropdown: true, openCart: false, openAccount: false})} placeholder="Kamu lagi cari apa?" className="form-control bg-light border border-light pa-input" style={{width: 0, height: 44, borderRadius: "5px 0px 0px 5px", zIndex: 1}} />
                                    <div className="input-group-prepend">
                                        <span className="bg-light" style={{width: 155, marginLeft: -1, marginRight: 0, borderRadius: "0px 5px 5px 0px", zIndex: 2}}>
                                            <div className="row">
                                                <div className="px-3 py-1 border border-left-1 border-right-0 border-top-0 border-bottom-0 pa-dark-grey pa-clickable-element navbar-search-dropdown" style={{marginLeft: 0, marginRight: 6, marginTop: 6, marginBottom: 0}}> 
                                                 
                   
                                                    {
                                                        this.state.openDropdown?
                                                            <div className="navbar-search-dropdown-content">
                                                                     {
                                                                            this.state.inputSearch.length===0?
                                                                    <div>
                                                                      <div className="px-3 py-0">
                                                                            <p className="font-weight-bold pa-dark">Cari Kategori</p>
                                                                        </div>
                                                                   
                                                                        <div className="row justify-content-center ml-5 mr-0">
                                                                         
                                                                            <div className="col-4">
                                                                            <Link to='/products?category=1'>
                                                                                <div className="row align-items-center px-3 py-3 navbar-category-select">
                                                                                 
                                                                                    <div>
                                                                                        <img src={TShirtIcon} alt="#" width="30" />
                                                                                    </div>
                                                                                    <div onClick={() => this.setState({selectCategory: 1, categoryName: 'T-Shirt',openDropdown:false})} className="px-3 py-0">
                                                                                        T-Shirt
                                                                                    </div>
                                                                                </div>
                                                                            </Link>
                                                                            <Link to='/products?category=2'>
                                                                                <div className="row align-items-center px-3 py-3 navbar-category-select">
                                                                                    <div>
                                                                                        <img src={PantsIcon} alt="#" width="30" />
                                                                                    </div>
                                                                                    <div onClick={() => this.setState({selectCategory: 3, categoryName: 'Pants',openDropdown:false})} className="px-3 py-0">
                                                                                        Pants
                                                                                    </div>
                                                                                </div>
                                                                                </Link>
                                                                            </div>
                                                                         
                                                                            <div className="col-4">
                                                                            <Link to='/products?category=3'>
                                                                                <div className="row align-items-center px-3 py-3 navbar-category-select">
                                                                                    <div>
                                                                                        <img alt="#" src={ShirtIcon} width="30" />
                                                                                    </div>
                                                                                    <div onClick={() => this.setState({selectCategory: 2, categoryName: 'Shirt',openDropdown:false})} className="px-3 py-0">
                                                                                        Shirt
                                                                                    </div>
                                                                                </div>
                                                                            </Link>
                                                                            <Link to='/products?category=4'>
                                                                                <div className="row align-items-center px-3 py-3 navbar-category-select">
                                                                                    <div>
                                                                                        <img alt="#"  src={ShoesIcon} width="32" />
                                                                                    </div>
                                                                                    <div onClick={() => this.setState({selectCategory: 6, categoryName: 'Shoes',openDropdown:false})} className="px-3 py-0">
                                                                                        Shoes
                                                                                    </div>
                                                                                </div>
                                                                            </Link>
                                                                            </div>
                                                                            <div className="col-4">
                                                                            <Link to='/products?category=5'>
                                                                                <div className="row align-items-center px-3 py-3 navbar-category-select">
                                                                                    <div>
                                                                                        <img alt="#"  src={JacketIcon} width="30" />
                                                                                    </div>
                                                                                    <div onClick={() => this.setState({selectCategory: 4, categoryName: 'Jacket',openDropdown:false})} className="px-3 py-0">
                                                                                        Jacket
                                                                                    </div>
                                                                                </div>
                                                                                </Link>
                                                                                <Link to='/products?category=6'>
                                                                                <div className="row align-items-center px-3 py-3 navbar-category-select">
                                                                                    <div>
                                                                                        <img alt="#"  src={HatIcon} width="30" />
                                                                                    </div>
                                                                                    <div onClick={() => this.setState({selectCategory: 5, categoryName: 'Acceco...',openDropdown:false
                                                                                })} className="px-3 py-0">
                                                                                        Accecories
                                                                                    </div>
                                                                                </div>
                                                                                </Link>
                                                                            </div>
                                                                        </div>
                                                                        <div className="w-100 text-center font-weight-bold pa-secondary">
                                                                            <Link to='/list-product' className="pa-link">
                                                                                <span className="font-weight-bold pa-secondary">
                                                                                    See All Products
                                                                                </span>
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                        :
                                                                     this.state.inputSearch.length>0&&  this.props.products.data?
                                                                       this.props.products.data.filter((el,idx)=> el.brands_name.concat(el.name).toLowerCase().includes(this.state.inputSearch.toLowerCase())).map((v,i)=>{
                                                                           
                                                                            return<Link to={`/detail-product/${v.id}`} className="pa-link" > 
                                                                            <div onClick={()=>this.setState({openDropdown:false,inputSearch:''})} className="input-search-card">
                                                                                    
                                                                                     <img alt="#"  src={`${process.env.REACT_APP_API_URL}public/product/${v.url.split(',')[0]}`}/>

                                                                                     <div className="input-search-card-text">
                                                                                         <p>{v.name}</p>
                                                                                         <p style={{fontWeight:'bold'}}>{v.brands_name}</p>
                                                                                         <div style={{display:'flex'}} >
                                                                                         <p style={{display:'flex',marginRight:'10px'}} className="font-weight-bold pa-font-size-16 pa-secondary">
                                                                                            Rp.{(v.price - (v.price * (v.discount / 100))).toLocaleString('id-ID')}
                                                                                        </p>
                                                                                         {
                                                                                            v.discount?
                                                                                            <p className="pa-font-size-14 pa-dark-grey">
                                                                                                <del>
                                                                                                Rp.{(v.price).toLocaleString('id-ID')}
                                                                                                </del>
                                                                                                <span className="mx-1 my-0 pa-secondary">
                                                                                                {v.discount}% OFF
                                                                                                </span>
                                                                                            </p>
                                                                                            :
                                                                                            null
                                                                                        }
                                                                                        </div>
                                                                                     </div>
                                                                                </div>
                                                                                </Link>
                                                                       })
                                                                                :
                                                                    <Loader/>
                                                               
                                                                    }
                                                            
                                                            </div>
                                                        :
                                                            null
                                                    }
                                                </div>
                                            
                                                <div onClick={() => this.setState({openDropdown: !this.state.openDropdown, openCart: false, openAccount: false})} className="px-5 py-1 pa-bg-main-dark rounded pa-light " style={{marginLeft: '10px', marginRight: 2, marginTop: 6, marginBottom: 0,cursor:'pointer'}}> 
                                                    <FontAwesomeIcon icon={faSearch} className="fa-md" />
                                                </div>
                                    
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div onClick={() => this.setState({openCart: !this.state.openCart, openDropdown: false, openAccount: false})} className="col-1 px-0 py-3 text-center pa-clickable-element navbar-cart-dropdown">
                                <img alt="#"  src={ShoppingBag}  width="20" height="20" />
                                <span className="pa-bg-danger navbar-carts-badge pa-light" style={{borderRadius: 100}}>
                                    {
                                        this.props.cart.data === null?
                                            null
                                        :    
                                            this.props.cart.data.length
                                    }
                                </span>
                                {
                                    this.state.openCart?
                                        <div className="navbar-cart-dropdown-content">
                                            {   
                                                this.state.loginStatus?
                                                    this.props.cart.data === null?
                                                        <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
                                                    :
                                                        this.props.cart.data.length > 0?
                                                            <>
                                                                {this.mapDataCart()}
                                                                <div className="pt-2 pb-0 font-weight-bold pa-font-size-12 pa-secondary">
                                                                    <Link to='/cart' className="pa-link">
                                                                        See All
                                                                    </Link>
                                                                </div>
                                                            </>
                                                        :
                                                            <>
                                                            <img   src={EmptyCart} alt="#" width="300px" />
                                                            <div className="px-0 pt-3 pb-0 pa-font-size-20 font-weight-bold">
                                                                Lho, Kok Sepi?
                                                            </div>
                                                            <div className="pt-0 pb-3 pa-dark-grey">
                                                                Mau diisi apa ya Bag sebesar ini?
                                                            </div>
                                                            </>
                                                :
                                                    <>
                                                        <img  src={EmptyCart} alt="#" width="300px" />
                                                        <div className="px-0 pt-3 pb-0 pa-font-size-20 font-weight-bold">
                                                            Lho, Kok Sepi?
                                                        </div>
                                                        <div className="pt-0 pb-3 pa-dark-grey">
                                                            Mau diisi apa ya Bag sebesar ini?
                                                        </div>
                                                    </>
                                            }
                                        </div>
                                    :
                                        null
                                }
                            </div>
                            <div className="col-2">
                                {/* After & Before Login */}
                                {
                                    this.state.loginStatus?
                                        <div className="row justify-content-center">
                                            <div>
                                                <img alt="#"  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAS1BMVEUAAAB11P910//b9f951v911v/b9P/c9f/b9P/B7P910/921P910//a8//c9P921v/b9v/h///a9P/b8/900//a9P/Q8P+86f+U3f+okt7OAAAAFHRSTlMA8MBSRCWwd+bb2JqMhEQ9HBGfa4HeIjwAAABuSURBVBjTfc1bDoAgDETRARHf70Hd/0qNYqimxvt5Mmlxl/my9BlezeHKP60Id53YFFJjwl5Qzi6Cxc9S39TfJVdFq1yi3JL7tq7bTto82mD4yAzXLproubXkOws4qhwajQ1qjTWMRgN+hFZbewDUURSlNbYjfgAAAABJRU5ErkJggg==" width="15" />
                                            </div>
                                            {
                                                 
                                                    this.props.user.data === null?
                                                        null
                                                    :
                                                    <Link className="pa-link" to="/member">
                                                    <div onClick={()=>this.setState({openDropdown:false})} className="pl-2 pr-0 py-0 " style={{borderWidth: 2, color: "#fdfdfd",cursor:'pointer'}}>
                                                        {`Hai, ${this.props.user.data.data[0].user_name?this.props.user.data.data[0].user_name.slice(0,10):this.props.user.data.data[0].email.slice(0, 10)}...`}
                                                    </div>
                                                    </Link>
                                            }
                                           
                                         
                                        </div>
                                    :
                                        <div className="row justify-content-center">
                                            <div  className="btn px-3 py-0 ml-0 mr-2" style={{borderWidth: 2, borderColor: "#fdfdfd", color: "#fdfdfd"}}>
                                                <Link to='/register' className="pa-link">
                                                    Let's Get in
                                                </Link>
                                            </div>
                                          
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>



                {/* SIDEBAR SECTION */}
                <div ref={this.sidebar} className="pa-sidebar-display sidebar">
                    <div className="row">
                        <div className="text-align-center menu-title">
                            Menu
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faTimes} onClick={() => this.onCloseSidebar()} className="close-icon pa-clickable-element" />
                        </div>
                    </div>
                    <hr style={{marginTop: -25, marginBottom: 0, backgroundColor: "#f3f3f3"}} />
                    <div className="px-3 pt-4 pb-0 pa-clickable-element sidebar-menu">
                        <Link to='/' onClick={() => this.onCloseSidebar()} className="pa-link" >
                            Home
                        </Link>
                    </div>
                    <div className="px-3 pt-4 pb-0 sidebar-menu">
                        Kategori
                    </div>
                    <div className="px-5 py-3 pa-clickable-element sidebar-sub-menu">
                        <Link to='/products?category=1' onClick={() => this.onCloseSidebar()} className="pa-link" >
                            T-Shirt
                        </Link>
                    </div>
                    <hr style={{marginLeft: 49, marginTop: -15, marginBottom: 0, backgroundColor: "#f3f3f3"}} />
                    <div className="px-5 py-3 pa-clickable-element sidebar-sub-menu">
                        <Link to='/products?category=2' onClick={() => this.onCloseSidebar()} className="pa-link" >
                            Shirt
                        </Link>
                    </div>
                    <hr style={{marginLeft: 49, marginTop: -15, marginBottom: 0, backgroundColor: "#f3f3f3"}} />
                    <div className="px-5 py-3 pa-clickable-element sidebar-sub-menu">
                        <Link to='/products?category=4' onClick={() => this.onCloseSidebar()} className="pa-link" >
                            Jacket
                        </Link>
                    </div>
                    <hr style={{marginLeft: 49, marginTop: -15, marginBottom: 0, backgroundColor: "#f3f3f3"}} />
                    <div className="px-5 py-3 pa-clickable-element sidebar-sub-menu">
                        <Link to='/products?category=3' onClick={() => this.onCloseSidebar()} className="pa-link" >
                            Pants
                        </Link>
                    </div>
                    <hr style={{marginLeft: 49, marginTop: -15, marginBottom: 0, backgroundColor: "#f3f3f3"}} />
                    <div className="px-5 py-3 pa-clickable-element sidebar-sub-menu">
                        <Link to='/products?category=6' onClick={() => this.onCloseSidebar()} className="pa-link" >
                            Shoes
                        </Link>
                    </div>
                    <hr style={{marginLeft: 49, marginTop: -15, marginBottom: 0, backgroundColor: "#f3f3f3"}} />
                    <div className="px-5 py-3 pa-clickable-element sidebar-sub-menu">
                        <Link to='/products?category=5' onClick={() => this.onCloseSidebar()} className="pa-link" >
                            Accecories
                        </Link>
                    </div>
                    <hr style={{marginLeft: 49, marginTop: -15, marginBottom: 0, backgroundColor: "#f3f3f3"}} />
                    {/* <div className="px-3 pt-4 pb-2 sidebar-menu">
                        Payment Upload
                    </div> */}
                    {
                        this.state.loginStatus?
                            <>
                                <div className="row justify-content-between align-items-center px-3 py-0">
                                    <div className="px-3 pt-4 pa-clickable-element sidebar-menu">
                                        <div onClick={()=>{
                                            this.onCloseSidebar()
                                            window.location = '/Cart'
                                        }} className="pa-link">
                                            Cart
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mx-3 my-0 pa-bg-danger" style={{borderRadius: 100}}>
                                            <span className="px-3 py-1 pa-font-size-12 pa-light">
                                                {
                                                    this.props.cart.data === null?
                                                        null
                                                    :    
                                                        this.props.cart.data.length
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            
                              
                                <div className="px-3 pt-4 pb-0 pa-clickable-element sidebar-menu">
                                    <div onClick={() => 
                                        {this.onCloseSidebar()
                                         window.location = '/member'}} className="pa-link" >
                                        Profile
                                    </div>
                                </div>
                                {   
                                    this.props.user.data === null?
                                        null
                                    :
                                        this.props.user.data.data[0].user_role === 1?
                                            <div className="px-3 pt-4 pb-2 pa-clickable-element sidebar-menu">
                                                <div onClick={() =>   { 
                                                    this.onCloseSidebar()
                                                     window.location = '/member/admin-dashboard'}} className="pa-link" >
                                                    Admin
                                                </div>
                                            </div>
                                        :
                                            null
                                }
                            </>    
                        :
                            <div className="px-3 pt-4 pb-2 pa-clickable-element sidebar-menu">
                                <div onClick={() => {this.onCloseSidebar()
                                      window.location = '/register'}}  >
                                    Let's Get in
                                </div>
                            </div>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        user: state.user,
        cart: state.cart,
        login : state.login,
        products:state.getProducts
    }
}

const mapDispatchToProps = { onGetDataUsers, getCartData,GetAllProduct }

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)