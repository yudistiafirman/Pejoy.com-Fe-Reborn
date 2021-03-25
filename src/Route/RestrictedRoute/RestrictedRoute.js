import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


const RestrictedRoute = ({ component: Component,user_role ,...rest }) => (
    
    <Route
        {...rest}
        
        render={props =>{
            console.log(user_role)
           return user_role.data[0].user_role===0 ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/',
                        state: { from: props.location }
                    }}
                />
            )
        }
        }
            
           
    ></Route>
);
const mapStateToProps = (state) => {
    return{
        user_role: state.user
    }
}
export default connect(mapStateToProps,null)( RestrictedRoute);