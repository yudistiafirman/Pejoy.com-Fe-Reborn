import React from 'react'
import { Modal, ModalBody, } from 'reactstrap';
import { Player, } from '@lottiefiles/react-lottie-player';
import { Link } from 'react-router-dom';


const ModalShipping = ({modalOpen}) => {

    return (
        <div>
        <Modal isOpen={modalOpen} centered>
            <ModalBody>
                <div className='p-5' style={{display : 'flex', flexDirection : 'column', justifyContent : 'center', alignItems : 'center'}}>
                <p style={{fontSize : 25, fontWeight : 800}}>Opps kamu belum memiliki alamat pengiriman!</p>
                <Player
                autoplay
                loop
                src="https://assets7.lottiefiles.com/packages/lf20_uhIxIg.json"
                style={{ height: '300px', width: '300px' }}
                >
                </Player>
                <p>Isi alamat pengiriman mu agar mengetahui estimasi ongkos kirim nya!</p>
                <Link to='/member/shipping-address'>
                    <p style={{fontSize : 14, textDecoration : 'underline'}}>Klik disini untuk menambah alamat pengiriman</p>
                </Link>
                </div>
            </ModalBody>
        </Modal>
        </div>
    )
}

export default ModalShipping