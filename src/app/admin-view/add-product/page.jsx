"use client";
import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import TileComponent from "@/components/FormElements/TileComponent";
import { AvailableSizes, adminAddProductformControls } from "@/utils";
import React from "react";

const AdminAddNewProduct = () => {
  function handleImage() {}
  return (
    <div className="w-full mt-5 mr-0 mb-0 ml-0 relative">
      <div className="flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative">
        <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
          <input
            accept="image/*"
            max="1000000"
            type="file"
            onChange={handleImage}
          />
          <div className="flex gap-2 flex-col">
            <label>Available sizes</label>
            <TileComponent
              //   selected={formData.sizes}
              //   onClick={handleTileClick}
              data={AvailableSizes}
            />
          </div>
         {
            adminAddProductformControls.map(controlItems=>
                controlItems.componentType==='input'?
                <InputComponent type={controlItems.type} placeholder={controlItems.placeholder} label={controlItems.label}/>:
                controlItems.componentType==='select'?<SelectComponent label={controlItems.label} options={controlItems.options}/>:null
                )
         }
          <button className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracking-wide">
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAddNewProduct;