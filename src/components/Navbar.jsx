'useclient'
import React, { Fragment } from 'react'
const Navbar = () => {
  const isAdminView=false
  const isAuthUser = false;
  return (
    <div>
        <nav className='bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200'>
            <div className='max-w-screenx-l flex flex-wrap items-center justify-between mx-auto p-4'>
              <div className='flex items-center cursor-pointer'>
                <span className='self-center text-2xl font-semibold whitespace-nowrap'>E-Commerce</span>
              </div>
              <div className=' flex md:order-2 gap-2'>
                  <Fragment>
                    <button>Account</button>
                    <button>Cart</button>
                  </Fragment>
              </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar
