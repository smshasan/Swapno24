import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './conversations.css'

const ProductConversation = ({productId}) => {

    const [product, setProduct] = useState(null)

    useEffect(() => {
      
        // const friendId = conversation?.members?.find(member => member !== currentUser._id)
        
        const getUser = async (id) => {
            try {
                const {data} = await axios.get(`/api/v1/product/${id}`)
                setProduct(data.product)
                console.log('data', data)
            } catch (err) {
                console.log(err)
            }
            
        }

        getUser(productId)
      
    }, [productId])

    // console.log('conversations', conversation)
    console.log('productId', productId)
    console.log('product', product)
    

    return (
        <div className='conversation'>
           
                <div className='chat-sidebar-product'>
                {
                            product?.images?.map((image, index) => (
                                <img key={index} src={image.url}
                                    alt={product.name}
                                />
                            ))
                        }
                </div>
                        

            <span className='conversationName'>
                <p>{product?.name}</p>
                <p>{product?.district} / {product?.thana}</p>
            </span>
        </div>
    )
}

export default ProductConversation