import React, { useContext } from 'react'
import { IoCartOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'

const ProductCard = ({product}) => {
  const navigate = useNavigate()
  const {addToCart, cartItem} = useContext(CartContext)
  // console.log(cartItem)
  
  return (
    <div className='border relative border-gray-100 rounded-2xl cursor-pointer hover:scale-105 hover:shadow-2xl transition-all p-2 h-max' >
      <img src={product.image} alt="" className='bg-gray-100 aspect-square cursor-pointer' onClick={()=> navigate(`/products/${product.id}`)} />
      <h1 className='font-semibold p-1 line-clamp-2' >{product.title}</h1>
      <p className='my-1 font-bold text-gray-800 text-lg' >₹ {product.price*80}</p>
      <button className='bg-red-500 px-3 py-2 text-white md:text-lg text-[16px] rounded-md w-full flex justify-center items-center cursor-pointer gap-2 font-semibold' onClick={()=>addToCart(product)} > <IoCartOutline className='md:h-6 md:w-6 h-5 w-5' /> Add to Cart</button>
    </div>
  )
}

export default ProductCard