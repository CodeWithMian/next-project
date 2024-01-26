import CommonListing from '@/components/ComponentListing'
import { getAllAdminProducts } from '@/services/product'
import React from 'react'

async function AllProducts(){

    const getAllProducts = await  getAllAdminProducts()
  return (
    <div>
      <CommonListing data={getAllProducts && getAllProducts.data}/>
    </div>
  )
}

export default AllProducts
