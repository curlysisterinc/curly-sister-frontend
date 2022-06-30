/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from "react";
import ExtraLinks from "../extraLinks";

function LocationAndContact() {
  const template = { id: Math.random() };
  const [count, setCount] = useState([template]);
  const [locationAndContact, setLocationAndContact] = useState({
    address: "",
    email: "",
    phoneNumber: "",
    phoneCode: "US +1",
  });

  const [stylistValues, setStylistValues] = useState({
    stylist_name: "",
    email: "",
    business_name: "",
    address: "",
    certification: "",
    city: "",
    services: [""],
    certifications: [""],
    tags: [""],
    country: "",
    phone_no: "",
    facebook: "",
    instagram: "",
    latitude: "",
    longitude: "",
    state: "",
    website: "",
    zipcode: "",
    photo: "",
    description: "",
  });
  const handleSelectChange = (update) => {
    setStylistValues((prev) => ({ ...prev, [update.name]: update.value }));
  };
  const add = () => {
    setCount((prev) => [...prev, template]);
  };

  const deleteR = (id, selected) => {
    setCount((prev) => prev.filter((item) => item.id !== id));
    handleSelectChange({ name: selected, value: "" });
  };

  const handleChange = (e) => {
    setStylistValues({ ...stylistValues, [e.target.name]: e.target.value });
  };
  return (
    <div className="">
      <label
        className="block text-black text-sm font-bold mt-5"
        htmlFor="address"
      >
        Address
        <input
          className="shadow-sm appearance-none mt-3 border border-gray-800 rounded-lg w-full h-46 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Type and select address..."
          name="address"
          label="address"
          id="address"
          // value={stylistValues.address}
          onChange={handleChange}
        />
      </label>
      <div className="grid grid-cols-2 gap-6 items-center ">
        <label
          className="inline-block text-black text-sm font-bold mt-5 col"
          htmlFor="email"
        >
          Email address
          <input
            className="shadow-sm appearance-none mt-3 border border-gray-800 rounded-lg w-full h-46 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="Enter email address"
            name="email"
            label="email"
            id="email"
            // value={stylistValues.email}
            onChange={handleChange}
          />
        </label>
        <label
          className="inline-block text-black text-sm font-bold mt-5 col"
          htmlFor="phone_no"
        >
          Phone Number
          <div className="relative flex grid-cols-12 ">
            <input
              className="shadow-sm col-span-8 appearance-none mt-3 border border-gray-800 rounded-lg w-full h-46 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              // value={stylistValues.phone_no}
              placeholder="Enter phone number"
              name="phone_no"
              id="phone_no"
              onChange={handleChange}
            />
          </div>
        </label>
      </div>
      <div className="mt-5">
        Links
        <div>
          <div>
            {count.map((val, i) => (
              <>
                <ExtraLinks
                  key={val.id}
                  onChange={handleSelectChange}
                  globalInput={stylistValues}
                  val={val}
                  onDelete={deleteR}
                  count={count}
                />
                {count.length - 1 === i && count.length < 3 && (
                  <div
                    onClick={add}
                    className="text-purple-100 text-sm font-BeatriceRegular mt-5 cursor-pointer"
                  >
                    Add more links
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocationAndContact;
