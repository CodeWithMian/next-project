"use client";
import { GlobalContext } from "@/context";
import { adminNavOptions, navOptions } from "@/utils";
import React, { Fragment, useContext, useEffect } from "react";
import CommonModal from "./CommonModal";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
const Navbar = () => {

 const router = useRouter()
  // const isAdminView = false;
  
  const { showNavModal, setShowNavModal } = useContext(GlobalContext);
  const {user,isAuthUser,setIsAuthUser,setUser,currentUpdatedProduct, setCurrentUpdatedProduct}=useContext(GlobalContext)
// console.log(user,isAuthUser,'navbar')
const PathName = usePathname()

useEffect(() => {// when ever user come back the form will be empty
  if (
    PathName !== "/admin-view/add-product" &&
    currentUpdatedProduct !== null
  )
    setCurrentUpdatedProduct(null);
}, [PathName]);


function handleLogout(){
  setIsAuthUser(false)
  setUser(null)
  Cookies.remove('token')
  localStorage.clear()
  router.push('/')
}
const isAdminView = PathName.includes('admin-view')

  function NavItems({ isModalView = false, isAdminView,router}) {
    return (
      <div
        className={`items-center justify-between w-full md:flex md:w-auto ${
          isModalView ? "" : "hidden"
        }`}
        id="nav-items"
      >
        <ul
          className={`flex flex-col p-4 md:p-0 mt-4 font-medium border rounder-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white ${
            isModalView ? "border-none" : "border-gray-100"
          }`}
        >
          {isAdminView
            ? adminNavOptions.map((item) => (
                <li
                  className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0"
                  key={item.id}
                  onClick={()=>router.push(item.path)}
                >
                  {item.label}
                </li>
              ))
            : navOptions.map((item) => (
                <li
                  className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0"
                  key={item.id}
                  onClick={()=>router.push(item.path)}
                >
                  {item.label}
                </li>
              ))}
        </ul>
      </div>
    );
  }
  return (
    <div>
      <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
        <div className="max-w-screenx-l flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center cursor-pointer" onClick={()=>router.push('/')}>
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              E-Commerce
            </span>
          </div>
          <div className=" flex md:order-2 gap-2 ">
            {!isAdminView && isAuthUser ? (
              <Fragment>
                <button
                  className={
                    "mt-1.5 bg-black text-white inline-block px-5 py-3 uppercase text-xs tracking-wide font-medium"
                  }
                >
                  Account
                </button>
                <button
                  className={
                    "mt-1.5 bg-black text-white inline-block px-5 py-3 uppercase text-xs tracking-wide font-medium"
                  }
                >
                  Cart
                </button>
              </Fragment>
            ) : null}
            {user?.role === "admin" ? (
              isAdminView ? (
                <button
                  className={
                    "mt-1.5 bg-black text-white inline-block px-5 py-3 uppercase text-xs tracking-wide font-medium"
                  }
                onClick={()=>router.push('/')}
                >
                  Client View
                </button>
              ) : (
                <button
                  className={
                    "mt-1.5 bg-black text-white inline-block px-5 py-3 uppercase text-xs tracking-wide font-medium"
                  }
                onClick={()=>router.push('/admin-view')}
                >
                  Admin View
                </button>
              )
            ) : null}
            {isAuthUser ? (
              <button
                className={
                  "mt-1.5 bg-black text-white inline-block px-5 py-3 uppercase text-xs tracking-wide font-medium"
                }
              onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <button
                className={
                  "mt-1.5 bg-black text-white inline-block px-5 py-3 uppercase text-xs tracking-wide font-medium"
                }
              onClick={()=>router.push('/login')}>
                Login
              </button>
            )}
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={() => setShowNavModal(true)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <NavItems isAdminView={isAdminView} router={router}/>
        </div>
      </nav>
      <CommonModal
        showModalTitle={false}
        mainContent={<NavItems router={router} isModalView={true} isAdminView={isAdminView}/>}
        show={showNavModal}
        setshow={setShowNavModal}
      />
    </div>
  );
};

export default Navbar;
