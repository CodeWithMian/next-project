
import CommonListing from '@/components/ComponentListing'
import { getAllAdminProducts } from '@/services/product'
import React from 'react'

async function AdminAllProducts() {

  const allAdminProducts= await getAllAdminProducts()

  // console.log(allAdminProducts)
  return (
    <div>
      <CommonListing data={allAdminProducts && allAdminProducts.data}/>
    </div>
  )
}

export default AdminAllProducts
