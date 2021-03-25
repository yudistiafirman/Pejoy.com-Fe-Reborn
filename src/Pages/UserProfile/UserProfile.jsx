import React, { Component } from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { connect } from 'react-redux';
import Skeleton from 'react-loading-skeleton';

import Profile from './Profile';
import Transactions from './Transactions';
import ShippingAddress from './ShippingAddress';
import AdminDashboard from './Admin/Admin';

import DefaultUserProfile from './../../Support/Images/Default User Profile.png';


export class UserProfile extends Component{

    state = {
        routes: [
            {
                path: "/member",
                exact: true,
                page: () => <Profile />
            },
            {
                path: "/member/transactions",
                page: () => <Transactions />
            },
            {
                path: "/member/shipping-address",
                page: () => <ShippingAddress />
            },
            {
                path: "/member/admin-dashboard",
                page: () => <AdminDashboard />
            }
        ],
        activeLink: null
    }

    onLogout = () => {
        if(window.confirm('Are you sure want to logout?')){
            localStorage.removeItem('token')
            window.location = '/'
        }
    }

    render(){
        if(this.props.user.data === null){
            return(
                <div>
                    <div className="container px-0 py-5 px-md-0 py-md-5">
                        <div className="px-0 py-4 px-md-0 py-md-5">
                            <div className="px-3 py-0 px-md-3 py-md-3">
                                <Router>
                                    <div className="row px-0 py-0 px-md-0 py-md-4">
                                        <div className="d-none d-md-block col-3">
                                            <div>
                                                <Skeleton width={150} height={150} duration={1} />
                                            </div>
                                            <div>
                                                <h3 className="font-weight-bold">
                                                    <Skeleton width={250} height={20} duration={1} />
                                                </h3>
                                            </div>
                                            <div className="pa-font-size-15 pa-dark-grey" style={{marginTop: -10, marginBottom: 25}}>
                                                <Skeleton width={150} height={10} duration={1} />
                                            </div>
                                            <div className="mx-0 my-3 px-3 pt-0 pb-3 border-bottom">
                                                <Link to="/member" onClick={() => this.setState({activeLink: 'Profile'})} className="pa-link">
                                                    <span className={this.state.activeLink === 'Profile'? "font-weight-bold pa-font-size-18 pa-secondary" : "pa-font-size-18 pa-main-light"}>
                                                        <Skeleton width={150} height={10} duration={1} />
                                                    </span>
                                                </Link>
                                            </div>
                                            <div className="mx-0 my-3 px-3 pt-0 pb-3 border-bottom">
                                                <Link to="/member/transactions" onClick={() => this.setState({activeLink: 'Transaction'})} className="pa-link">
                                                    <span className={this.state.activeLink === 'Transaction'? "font-weight-bold pa-font-size-18 pa-secondary" : "pa-font-size-18 pa-main-light"}>
                                                        <Skeleton width={150} height={10} duration={1} />
                                                    </span>
                                                </Link>
                                            </div>
                                            <div className="mx-0 my-3 px-3 pt-0 pb-3 border-bottom">
                                                <Link to="/member/shipping-address" onClick={() => this.setState({activeLink: 'Shipping Address'})} className="pa-link">
                                                    <span className={this.state.activeLink === 'Shipping Address'? "font-weight-bold pa-font-size-18 pa-secondary" : "pa-font-size-18 pa-main-light"}>
                                                        <Skeleton width={150} height={10} duration={1} />
                                                    </span>
                                                </Link>
                                            </div>
                                            <div className="mx-0 my-3 px-3 pt-0 pb-3 border-bottom">
                                                <Link to="/member/admin-dashboard" onClick={() => this.setState({activeLink: 'Dashboard'})} className="pa-link">
                                                    <span className={this.state.activeLink === 'Dashboard'? "font-weight-bold pa-font-size-18 pa-secondary" : "pa-font-size-18 pa-main-light"}>
                                                        <Skeleton width={150} height={10} duration={1} />
                                                    </span>
                                                </Link>
                                            </div>
                                            <div className="mx-0 my-3 px-3 pt-0 pb-3 border-bottom">
                                                <Link to="/" onClick={() => this.setState({activeLink: 'Logout'})} className="pa-link">
                                                    <span className={this.state.activeLink === 'Logout'? "font-weight-bold pa-font-size-18 pa-secondary" : "pa-font-size-18 pa-main-light"}>
                                                        <Skeleton width={150} height={10} duration={1} />
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-9">
                                            <Switch>
                                                {this.state.routes.map((route, index) => (
                                                    <Route
                                                        key={index}
                                                        path={route.path}
                                                        exact={route.exact}
                                                        children={<route.page />}
                                                    />
                                                ))}
                                            </Switch>
                                        </div>
                                    </div>
                                </Router>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        return(
            // USER PROFILE
            <div>
                <div className="container px-0 py-5 px-md-0 py-md-5">
                    <div className="px-0 py-4 px-md-0 py-md-5">
                        <div className="px-3 py-0 px-md-3 py-md-3">
                            <Router>
                                <div className="row px-0 py-0 px-md-0 py-md-4">
                                    <div className="d-none d-md-block col-3">
                                        <div>
                                            <img alt="#" src={DefaultUserProfile} width="100px" />
                                        </div>
                                        <div>
                                            <h3 className="font-weight-bold">
                                                {this.props.user.data.data[0].email.slice(0, 10)}
                                            </h3>
                                        </div>
                                        <div style={{marginTop: -10}}>
                                            <h3 className="font-weight-bold">
                                                {this.props.user.data.data[0].email.slice(10, 100)}
                                            </h3>
                                        </div>
                                        <div className="pa-font-size-15 pa-dark-grey" style={{marginTop: -10, marginBottom: 25}}>
                                            Member Sejak {String(this.props.user.data.data[0].created_at).split('T')[0]}
                                        </div>
                                        <div className="mx-0 my-3 px-3 pt-0 pb-3 border-bottom">
                                            <Link to="/member" onClick={() => this.setState({activeLink: 'Profile'})} className="pa-link">
                                                <span className={this.state.activeLink === 'Profile'? "font-weight-bold pa-font-size-18 pa-secondary" : "pa-font-size-18 pa-main-light"}>
                                                    Profile
                                                </span>
                                            </Link>
                                        </div>
                                        <div className="mx-0 my-3 px-3 pt-0 pb-3 border-bottom">
                                            <Link to="/member/transactions" onClick={() => this.setState({activeLink: 'Transaction'})} className="pa-link">
                                                <span className={this.state.activeLink === 'Transaction'? "font-weight-bold pa-font-size-18 pa-secondary" : "pa-font-size-18 pa-main-light"}>
                                                    Transaction
                                                </span>
                                            </Link>
                                        </div>
                                        <div className="mx-0 my-3 px-3 pt-0 pb-3 border-bottom">
                                            <Link to="/member/shipping-address" onClick={() => this.setState({activeLink: 'Shipping Address'})} className="pa-link">
                                                <span className={this.state.activeLink === 'Shipping Address'? "font-weight-bold pa-font-size-18 pa-secondary" : "pa-font-size-18 pa-main-light"}>
                                                    Shipping Address
                                                </span>
                                            </Link>
                                        </div>
                                        {   
                                            this.props.user.data === null?
                                                null
                                            :
                                                this.props.user.data.data[0].user_role === 1?
                                                    <div className="mx-0 my-3 px-3 pt-0 pb-3 border-bottom">
                                                        <Link to="/member/admin-dashboard" onClick={() => this.setState({activeLink: 'Dashboard'})} className="pa-link">
                                                            <span className={this.state.activeLink === 'Dashboard'? "font-weight-bold pa-font-size-18 pa-secondary" : "pa-font-size-18 pa-main-light"}>
                                                                Dashboard
                                                            </span>
                                                        </Link>
                                                    </div>
                                                :
                                                    null
                                        }
                                        <div className="mx-0 my-3 px-3 pt-0 pb-3 border-bottom">
                                            <Link to="/" onClick={() => this.onLogout()} className="pa-link">
                                                <span className={this.state.activeLink === 'Logout'? "font-weight-bold pa-font-size-18 pa-secondary" : "pa-font-size-18 pa-main-light"}>
                                                    Logout
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <Switch>
                                            {this.state.routes.map((route, index) => (
                                                <Route
                                                    key={index}
                                                    path={route.path}
                                                    exact={route.exact}
                                                    children={<route.page />}
                                                />
                                            ))}
                                        </Switch>
                                    </div>
                                </div>
                            </Router>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps, null)(UserProfile)