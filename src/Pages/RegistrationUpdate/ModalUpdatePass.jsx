import React from 'react'
import {  Modal, ModalBody } from 'reactstrap';
import { Player, } from '@lottiefiles/react-lottie-player';
import { Link } from 'react-router-dom';


const ModalUpdatePass = ({modalOpen}) => {

    return (
        <div>
        <Modal isOpen={modalOpen} centered>
            <ModalBody>
                <div className='p-5' style={{display : 'flex', flexDirection : 'column', justifyContent : 'center', alignItems : 'center'}}>
                <p style={{fontSize : 25, fontWeight : 800}}>Update password success!</p>
                <Player
                autoplay
                loop
                src="https://assets9.lottiefiles.com/temp/lf20_aYCCN4.json"
                style={{ height: '300px', width: '300px' }}
                >
                </Player>
                <p>Sekarang kamu sudah bisa bisa pakai akun mu lagi</p>
                <Link to='/register'>
                    <p style={{fontSize : 14, textDecoration : 'underline'}}>Login sekarang</p>
                </Link>
                </div>
            </ModalBody>
        </Modal>
        </div>
    )
}

export default ModalUpdatePass