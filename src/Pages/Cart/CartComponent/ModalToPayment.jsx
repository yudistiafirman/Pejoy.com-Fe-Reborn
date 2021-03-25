import React from 'react'
import {  Modal, ModalBody } from 'reactstrap';
import { Player } from '@lottiefiles/react-lottie-player';

import {getCartData} from '../../../Redux/Actions/Products/CartActions'
import { connect } from 'react-redux';

const ModalToPayment = ({modalOpen}) => {

   


    const onGotoTrans=()=>{
        const token = localStorage.getItem('token')
        getCartData(token)
        window.location='member/transactions'
    }
    return (
        <div>
        <Modal  isOpen={modalOpen} centered>
            <ModalBody>
                <div className='p-5' style={{display : 'flex', flexDirection : 'column', justifyContent : 'center', alignItems : 'center'}}>
                <p style={{fontSize : 25, fontWeight : 800}}>Thankyou for purchasing!</p>
                <Player
                autoplay
                loop
                src="https://assets3.lottiefiles.com/packages/lf20_g3ki3g0v.json"
                style={{ height: '300px', width: '300px' }}
                >
                </Player>
                <p>Make a Payment for complete your order</p>
                    <div onClick={onGotoTrans} style={{cursor:'pointer'}}>
                       <p  style={{fontSize : 14, textDecoration : 'underline',color:'blue'}}>see all transaction</p>
             
                    </div>
   
                </div>
            </ModalBody>
        </Modal>
        </div>
    )
}

const mapDispatchToProps={
    getCartData,
}

export default connect(null,mapDispatchToProps)( ModalToPayment)