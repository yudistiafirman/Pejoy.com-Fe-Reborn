import React, { Component } from 'react';
import { Link, Switch, BrowserRouter as Router, Redirect } from "react-router-dom";

import Statistic from './Statistic';

import SeeTransactions from './SeeTransactions';
import WarehouseInventory from './WarehouseInventory';

import FlashSaleEvent from './FlashSaleEvent';
import RestrictedRoute from '../../../Route/RestrictedRoute/RestrictedRoute';

import { connect } from 'react-redux';

export class Admin extends Component{

    state = {
        routes: [
            {
                path: "/member/admin-dashboard",
                exact: true,
                page: () => <Statistic />
            },
            {
                path: "/member/admin-dashboard/see-transactions",
                exact: true,
                page: () => <SeeTransactions />
            },
            {
                path: "/member/admin-dashboard/warehouse-inventory",
                exact: true,
                page: () => <WarehouseInventory />
            },
          
            {
                path: "/member/admin-dashboard/flash-sale",
                exact: true,
                page: () => <FlashSaleEvent />
            }
        ],
        activeLink: null
    }

    render(){
        if(!localStorage.getItem('token')){
           return <Redirect to={{pathname:'/',state:{from :this.props.location}}}/>
        }

        if(this.props.user_role.data){
           if(this.props.user_role.data.data[0].user_role===0){
               return <Redirect to={{pathname:'/member',state:{from :this.props.location}}}/>
           }
        }
        
        return(
            // ADMIN
            <div>
                <div className="font-weight-bold pa-font-size-30 pa-secondary">
                    Admin Dashboard
                </div>
                <div className="mx-0 my-3 border-bottom">

                </div>
                <Router>
                    <div className="px-0 py-0">
                        <div className="row justify-content-start px-3 py-0">
                            <div>
                                <Link to="/member/admin-dashboard" onClick={() => this.setState({activeLink: 'Statistic'})} className="pa-link">
                                    <div className={this.state.activeLink === 'Statistic'? "px-3 py-1 pa-bg-main-light pa-light" : "px-3 py-1 pa-bg-light-grey pa-main-light"} style={{borderRadius: 100}}>
                                        Statistic
                                    </div>
                                </Link>
                            </div>
                            <div className="px-2 pt-0 pb-2">
                                <Link to="/member/admin-dashboard/see-transactions" onClick={() => this.setState({activeLink: 'Transactions'})} className="pa-link">
                                    <div className={this.state.activeLink === 'Transactions'? "px-3 py-1 pa-bg-main-light pa-light" : "px-3 py-1 pa-bg-light-grey pa-main-light"} style={{borderRadius: 100}}>
                                        Transactions
                                    </div>
                                </Link>
                            </div>
                            <div className="px-0 pt-0 pb-2">
                                <Link to="/member/admin-dashboard/warehouse-inventory" onClick={() => this.setState({activeLink: 'Warehouse Inventory'})} className="pa-link">
                                    <div className={this.state.activeLink === 'Warehouse Inventory'? "px-3 py-1 pa-bg-main-light pa-light" : "px-3 py-1 pa-bg-light-grey pa-main-light"} style={{borderRadius: 100}}>
                                        Warehouse Inventory
                                    </div>
                                </Link>
                            </div>
                       
                            <div className="px-2 py-0 px-md-0 py-md-0">
                                <Link to="/member/admin-dashboard/flash-sale" onClick={() => this.setState({activeLink: 'Add Flash Sale'})} className="pa-link">
                                    <div className={this.state.activeLink === 'Add Flash Sale'? "px-3 py-1 pa-bg-main-light pa-light" : "px-3 py-1 pa-bg-light-grey pa-main-light"} style={{borderRadius: 100}}>
                                        Flash Sale Event
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="px-0 py-5">
                        <Switch>
                            {this.state.routes.map((route, index) => (
                                <RestrictedRoute
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    children={<route.page />}
                                />
                            ))}
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return{
        user_role: state.user
    }
}
export default connect(mapStateToProps,null)(  Admin)