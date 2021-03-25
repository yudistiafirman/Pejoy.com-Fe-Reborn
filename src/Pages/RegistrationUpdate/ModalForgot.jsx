import React from 'react'
import {  Modal, ModalBody } from 'reactstrap';
import { Player } from '@lottiefiles/react-lottie-player';
import { Link } from 'react-router-dom';


const ModalForgot = ({modalOpen}) => {

    return (
        <div>
        <Modal isOpen={modalOpen} centered>
            <ModalBody>
                <div className='p-5' style={{display : 'flex', flexDirection : 'column', justifyContent : 'center', alignItems : 'center'}}>
                <p style={{fontSize : 25, fontWeight : 800}}>Check your email!</p>
                <Player
                autoplay
                loop
                src="https://assets10.lottiefiles.com/packages/lf20_55VZJY.json"
                style={{ height: '300px', width: '300px' }}
                >
                </Player>
                <p>Link for reset password already send to your email</p>
                <Link to='/'>
                    <p style={{fontSize : 14, textDecoration : 'underline'}}>back to home</p>
                </Link>
                </div>
            </ModalBody>
        </Modal>
        </div>
    )
}

export default ModalForgot