import React, {useState, useEffect} from 'react'
import { ApiUrl } from '../../../Constant/ApiUrl'

export const ImageGroup = ({data}) => {
    const [imgParent, setImgParent] = useState('')

    useEffect(() => {
        if(data){
            setImgParent(data[0].url)
        }
    }, [data])

    return (
        <div style={{display : 'flex'}}>
            <div style={{display : 'flex', flexDirection : 'column', marginRight : 13}}>

                {
                    data && data.map((val, index) => {
                        return(
                            <span>
                                <img  alt="#"
                                className={val.url === imgParent ? 'child-image child-image-active' : 'child-image '}
                                src={ApiUrl + 'public/product/' + val.url}
                                onClick={() => setImgParent(val.url)}
                                 />
                            </span>
                        )
                    })
                }
            </div>
            <div style={{display : 'flex', flexDirection : 'column', alignItems : 'center'}} >
                <img alt="#"
                className='parent-image'
                src={ApiUrl + 'public/product/' + imgParent} />
            </div>
        </div>
    )
}