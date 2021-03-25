import React from 'react';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './Redux/Reducer';
import {BrowserRouter,Route,Switch} from 'react-router-dom';

import './Support/CSS-Utils/utils.css';

import Navbar from './Component/Navbar/Navbar';
import LandingPage from './Pages/LandingPage/LandingPage';
import ListProduct from './Pages/ListProduct/ListProduct';
import DetailProduct from './Pages/DetailProduct/DetailProduct';
import Checkout from './Pages/Checkout/Checkout';
import UserProfile from './Pages/UserProfile/UserProfile';
import Footer from './Component/Footer/Footer';
import Cart from './Pages/Cart/Cart'
import SkeletonDetailProduct from './Pages/DetailProduct/DetailProductComponent/SkeletonDetailProduct';
import RegistrationBaru from './Pages/RegistrationUpdate/RegistrationBaru'
import UpdatePassword from './Pages/RegistrationUpdate/UpdatePassword';
import EmailVerification from './Pages/RegistrationUpdate/Verification';
import RegisterRoute from './Route/RegisterRoute/RegisterRoute';
import PrivateRoute from './Route/PrivateRoute/PrivateRoute';
import PageNotFound from './Component/PageNotFound';



const store = createStore(rootReducer, applyMiddleware(thunk))

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
   
        <Navbar />
          <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route path='/products' component={ListProduct} />
            <Route path='/detail-product/:id' component={DetailProduct} />

            <PrivateRoute path='/checkout' component={Checkout} />
            <PrivateRoute path='/member' component={UserProfile} />
            <Route path='/test' component={SkeletonDetailProduct} />
            <RegisterRoute path='/register' component={RegistrationBaru}/>
            <Route path='/cart' component={Cart}/>
            <Route path='/update-password/:id' component={UpdatePassword} />
            <PrivateRoute path='/email-verification/:token' component={EmailVerification} />
           
            <Route component={PageNotFound}/> {/* The Default not found component */}
          </Switch>
        <Footer />

     
      </BrowserRouter>
    </Provider>
  )
}

export default App