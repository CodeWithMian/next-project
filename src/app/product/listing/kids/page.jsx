import CommonListing from '@/components/ComponentListing';
import { productByCategory } from '@/services/product';
import React from 'react'

async function KidsAllProducts (){
    const getAllProducts = await productByCategory("kids");
  return (
    <div>
        <CommonListing data={getAllProducts && getAllProducts.data} />;
    </div>
  )
}

export default KidsAllProducts
