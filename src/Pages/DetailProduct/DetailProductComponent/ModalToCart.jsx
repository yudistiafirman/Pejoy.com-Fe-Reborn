import React, { Component } from 'react';
import {Modal,ModalBody} from 'reactstrap';
import { Link } from 'react-router-dom';
import { ApiUrl } from '../../../Constant/ApiUrl';


class ModalCheckout extends Component {
    state={
        isOpen : true
    }

    
    handleModal = () =>{
        this.setState({isOpen : !this.state.isOpen})
    }
    render() {
            return (
                <div>
                    <Modal isOpen={this.props.isOpen} centered>
                        <ModalBody>
                            <div className=' p-4'>
                                <h5 className='text-center mb-3' style={{fontSize : 18}}>Thank you </h5>
                                <div className='d-flex'>
                                    <div className='w-25'>
                                        <img src={ApiUrl + 'public/product/' + this.props.imageModal} className='img-thumbnail' alt='gambar gagal'/>
                                    </div>
                                    <div className='ml-4 w-75 d-flex flex-column justify-content-center'>
                                        <span className='text-secondary mb-2 ' style={{fontSize : 14}}>{this.props.brands}</span>
                                        <h5 style={{fontSize : 14}}>{this.props.productName}</h5>
                                        <p className=' font-weight-light' style={{fontSize : 14}}>Rp. {this.props.price}</p>
                                        <p className=' font-weight-light' style={{fontSize : 14}}>Size : {this.props.size}</p>
                                    </div>
                                    {/* <div className='d-flex w-25 align-items-center'>
                                        <FontAwesomeIcon icon={faTimes}/>
                                        <h6 className='p-0 m-0 ml-5'>1</h6>
                                    </div> */}
                                </div>
                                <h5 className='text-center mb-2 mt-4 font-weight-light' style={{fontSize : 16}}>Has been added to your Cart!</h5>
                                <p className='text-center mt-3 ' style={{fontSize : 12}}>Check your <Link to='/cart' className='my-link font-weight-bold'>cart</Link> or <Link to='/products' className='font-weight-bold'>back shopping</Link></p>
                            </div>
                        </ModalBody>
                    </Modal>
                </div>
            );
    }
}

export default ModalCheckout;