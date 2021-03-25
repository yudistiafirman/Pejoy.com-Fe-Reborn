import React, {useState} from 'react'
import { Button, Modal,  ModalBody, ModalFooter } from 'reactstrap';
import MdStarOutline from 'react-ionicons/lib/Star'
import Axios from 'axios';
import { ApiUrl } from '../../../Constant/ApiUrl';
import Swal from 'sweetalert2'


const star = [
    1,2,3,4,5
]

const ModalAddReview = (props) => {
    const {
       
        className,
        products_id,
        url,
        openModal,
        onCloseModal
      } = props;

      const [hasilStar, setHasilStar] = useState(0)
      const [hasilReview, setHasilReview] = useState('')
    
      



      
      const onButtonSubmit = () => {
          let data = {
              token : localStorage.getItem('token'),
              review : hasilReview,
              rating : hasilStar,
              products_id : products_id
          }
          console.log(data)
          if(data.token && data.review && data.rating && data.products_id){
              
              Axios.post(ApiUrl + 'products/review/add-review', data )
              .then((res) => {
                  if(res.data.error){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                        footer: '<a href>Why do I have this issue?</a>'
                      })
                      onCloseModal()
                      
                  }else{
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Add review Succes',
                        showConfirmButton: false,
                        timer: 1500
                      })
                      onCloseModal()
                  }
              })
              .catch((err) => {
                  console.log(err)
              })
          }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href>Why do I have this issue?</a>'
              })
              onCloseModal()
          }
      }



    return (
        <div>
            
            <Modal  centered isOpen={openModal} className={className}>
                <ModalBody>
                    <div style={{display : 'flex', alignItems : 'center'}}>
                        <img 
                        alt="#"
                        src={ApiUrl + 'public/product/' + url}
                        style={{height : 200, width : 'auto'}} 
                        />
                        <div>
                            <p>Write your review for this product</p>
                            <span className='d-flex align-items-center'>
                                    {
                                        star.map((val,idx) => {
                                            return(
                                                <MdStarOutline onClick={() => setHasilStar(val)} className='pa-clickable-element' fontSize="15px" color={hasilStar<=idx?'#dbf6e9':'orange'} />
                                            )
                                        })
                                        
                                    }
                                    <p>({hasilStar})</p>
                            </span>
                            <div>
                                <textarea onChange={(e) => setHasilReview(e.target.value)} style={{fontSize : 14,resize : 'none', height : 130,width : '100%', marginTop : 5}} maxLength={400} />
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={onButtonSubmit}>Create Review</Button>
                <Button color="secondary" onClick={onCloseModal} >Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default ModalAddReview