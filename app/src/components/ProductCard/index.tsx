import React from 'react'
import Product from '../../types/Product'
import './productCard.scss'


const ProductCard:React.FC<Product> = ({description,currency,price})=>{
    
    
    return (
        <div className='productContainer'>
            <div>{description}</div>
            <div className='priceContainer'>
                <div>{`${currency}: `}</div>
                <div>${price}</div>
            </div>
        </div>
    )
}

export default ProductCard