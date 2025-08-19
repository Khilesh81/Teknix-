import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../assets/Loading4.webm'
import { ChevronLeft } from 'lucide-react'
import ProductListView from '../components/ProductListView'

const CategoryProduct = () => {
  const [searchData, setSearchData] = useState([])
  const params = useParams()
  const category = params.category
  console.log(category)

  const navigate = useNavigate()
  
  const getFilterData = async () =>{
    try {
      const res = await axios.get(`https://fakestoreapi.in/api/products/category?type=${category}`)
      const data = res.data.products;
      setSearchData(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getFilterData()
    window.scrollTo(0,0)
  },[])

  return (
    <div>
      {
        searchData.length > 0 ? (
          <div className='max-w-6xl mx-auto px-4 mb-10 mt-10' >
            <button onClick={()=>navigate('/')} className='bg-gray-800 text-white mb-5 px-3 py-1 rounded-md cursor-pointer flex gap-1 items-center' ><ChevronLeft />Back</button>
            {
              searchData.map((product, index)=>{
                return <ProductListView key={index} product={product} />
              })
            }
          </div>
        ) : (
          <div className='flex justify-center items-center h-[400px]' >
            <video muted autoPlay loop >
              <source src={Loading} type='video/webm' />
            </video>
          </div>
        )
      }
    </div>
  )
}

export default CategoryProduct