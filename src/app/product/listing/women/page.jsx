import CommonListing from '@/components/ComponentListing';
import { productByCategory } from '@/services/product';
import React from 'react'

async function WomenAllProducts(){
    const getAllProducts = await productByCategory("women");
  return (
    <div>
      <CommonListing data={getAllProducts && getAllProducts.data} />;
    </div>
  )
}

export default WomenAllProducts
