import CommonListing from '@/components/ComponentListing';
import { productByCategory } from '@/services/product';
import React from 'react'

async function MenAllProducts () {
    const getAllProducts = await productByCategory("men");
  return (
    <div>
       <CommonListing data={getAllProducts && getAllProducts.data} />;
    </div>
  )
}

export default MenAllProducts
