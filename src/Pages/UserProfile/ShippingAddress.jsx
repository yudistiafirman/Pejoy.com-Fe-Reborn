import React, { Component } from 'react';
import {  Route, Switch} from "react-router-dom";

import ShippingAddressLists from './ShippingAddressLists';
import AddShippingAddress from './AddShippingAddress';
import EditShippingAddress from './EditShippingAddress';

import './UserProfile.css';

export class ShippingAddress extends Component{

    state = {
        routes: [
            {
                path: "/member/shipping-address",
                exact: true,
                page: () => <ShippingAddressLists />
            },
            {
                path: "/member/shipping-address/add-address",
                page: () => <AddShippingAddress />
            },
            {
                path: "/member/shipping-address/edit-address",
                page: () => <EditShippingAddress />
            }
        ],
        activeLink: 'Profile'
    }

    render(){
        return(
            // SHIPPING ADDRESS
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
        )
    }
}

export default ShippingAddress