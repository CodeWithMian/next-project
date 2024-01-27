'use client'

import Notification from '@/components/Notification'
import { GlobalContext } from '@/context'
import { fetchAllAddresses } from '@/services/address'
import { callStripeSession } from '@/services/stripe'
import { loadStripe } from '@stripe/stripe-js'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

const Checkout = () => {
    const router = useRouter()
    const {checkoutFormData,setCheckoutFormData,cartItems,user,addresses,setAddresses}= useContext(GlobalContext)
    const [selectedAddress, setSelectedAddress] = useState(null);
    // console.log(cartItems)

    const [isOrderProcessing, setIsOrderProcessing] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
  
    
    const params = useSearchParams();
  
    const publishableKey =
      "pk_test_51OdJ8gJCt4TuEQYMEcBl2N4t0YhtecrxTP6gKlNfZc130FQqhxdA7OWcFpvE48B5F1OPkQZ3KMdQQ7S78BFGLdQX00qRUKTW41";
    const stripePromise = loadStripe(publishableKey);

    async function getAllAddresses() {
        const res = await fetchAllAddresses(user?._id);
    
        if (res.success) {
          setAddresses(res.data);
        }
      }
      useEffect(() => {
        if (user !== null) getAllAddresses();
      }, [user]); 
    //   console.log(addresses)

    function handleSelectedAddress(getAddress) {
        if (getAddress._id === selectedAddress) {
          setSelectedAddress(null);
          setCheckoutFormData({
            ...checkoutFormData,
            shippingAddress: {},
          });
    
          return;
        }
    
        setSelectedAddress(getAddress._id);
        setCheckoutFormData({
          ...checkoutFormData,
          shippingAddress: {
            ...checkoutFormData.shippingAddress,
            fullName: getAddress.fullName,
            city: getAddress.city,
            country: getAddress.country,
            postalCode: getAddress.postalCode,
            address: getAddress.address,
          },
        });
      }
      async function handleCheckout() {
        const stripe = await stripePromise;
    
        const createLineItems = cartItems.map((item) => ({
          price_data: {
            currency: "usd",
            product_data: {
              images: [item.productID.imageUrl],
              name: item.productID.name,
            },
            unit_amount: item.productID.price * 100,
          },
          quantity: 1,
        }));
    
        const res = await callStripeSession(createLineItems);
        setIsOrderProcessing(true);
        localStorage.setItem("stripe", true);
        localStorage.setItem("checkoutFormData", JSON.stringify(checkoutFormData));
    
        const { error } = await stripe.redirectToCheckout({
          sessionId: res.id,
        });
    
        console.log(error);
      }
    
      console.log(checkoutFormData);
  return (
    <div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="font-medium text-xl">Cart Summary</p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-5">
            {cartItems && cartItems.length ? (
              cartItems.map((item) => (
                <div
                  className="flex flex-col rounded-lg bg-white sm:flex-row"
                  key={item._id}
                >
                  <img
                    src={item && item.productID && item.productID.imageUrl}
                    alt="Cart Item"
                    className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                  />
                  <div className="flex w-full flex-col px-4 py-4">
                    <span className="font-bold">
                      {item && item.productID && item.productID.name}
                    </span>
                    <span className="font-semibold">
                      {item && item.productID && item.productID.price}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div>Your cart is empty</div>
            )}
          </div>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Shipping address details</p>
          <p className="text-gray-400 font-bold">
            Complete your order by selecting address below
          </p>
          <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-6">
            {addresses && addresses.length ? (
              addresses.map((item) => (
                <div
                  onClick={() => handleSelectedAddress(item)}
                  key={item._id}
                  className={`border p-6 ${
                    item._id === selectedAddress ? "border-red-900" : ""
                  }`}
                >
                  <p>Name : {item.fullName}</p>
                  <p>Address : {item.address}</p>
                  <p>City : {item.city}</p>
                  <p>Country : {item.country}</p>
                  <p>PostalCode : {item.postalCode}</p>
                  <button className="mt-5 mr-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide">
                    {item._id === selectedAddress
                      ? "Selected Address"
                      : "Select Address"}
                  </button>
                </div>
              ))
            ) : (
              <p>No addresses added</p>
            )}
          </div>
          <button
            onClick={() => router.push("/account")}
            className="mt-5 mr-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
          >
            Add new address
          </button>
          <div className="mt-6 border-t border-b py-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Subtotal</p>
              <p className="text-lg font-bold text-gray-900">
                $
                {cartItems && cartItems.length
                  ? cartItems.reduce(
                      (total, item) => item.productID.price + total,
                      0
                    )
                  : "0"}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Shipping</p>
              <p className="text-lg font-bold text-gray-900">Free</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-lg font-bold text-gray-900">
                $
                {cartItems && cartItems.length
                  ? cartItems.reduce(
                      (total, item) => item.productID.price + total,
                      0
                    )
                  : "0"}
              </p>
            </div>
            <div className="pb-10">
              <button
                disabled={
                  (cartItems && cartItems.length === 0) ||
                  Object.keys(checkoutFormData.shippingAddress).length === 0
                }
                onClick={handleCheckout}
                className="disabled:opacity-50 mt-5 mr-5 w-full  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <Notification/>
    </div>
  )
}

export default Checkout
