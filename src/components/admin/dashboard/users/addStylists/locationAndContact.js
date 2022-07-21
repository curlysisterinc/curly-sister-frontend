/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */

import React, { useState, useEffect, useContext } from "react";
// import { PhoneInput } from "react-contact-number-input";
import { useLocation } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import useChangeBtnTitle from "../../../../../hooks/useChangeBtnTitle";
import admin from "../../../../../api/admin";
import ExtraLinks from "../extraLinks";
import "react-phone-input-2/lib/style.css";
import { PersistUserContext } from "./addStylist";

function LocationAndContact({
  ariaHidden,
  idx,
  setActiveTab,
  stylistValues,
  setStylistValues,
}) {
  const { state } = useLocation();
  const link = [
    { link: "website", id: 1 },
    { link: "facebook", id: 2 },
    { link: "instagram", id: 3 },
  ];

  const [links, setlinks] = useState(link);
  const template = {
    id: Math.floor(Math.random() * 10000),
    key: "website",
  };
  const [count, setCount] = useState([template]);
  const [buttonAction, setButtonAction] = useState("Save");
  const [isloading, setIsloading] = useState(false);

  // const stylistId = localStorage.getItem("createdStylist");
  useChangeBtnTitle(setButtonAction, setStylistValues);

  const add = (key, randomid) => {
    // if (key !== undefined) {
    //   template = {
    //     id: randomid,
    //     key,
    //   };
    // }

    setCount((prev) => [...prev, { key, id: randomid }]);
  };
  // active: true
  // availability: []
  // certifications: []
  // createdAt: "2022-07-17T13:02:10.920Z"
  // description: "tade"
  // gallery: []
  // license_board: "tafde"
  // license_number: "tade"
  // photo: ""
  // services: []
  // stylist_name: "tade"
  // tags: []
  const [userResponse, fetchUserResponse] = useContext(PersistUserContext);
  const stylistId = localStorage.getItem("stylistid");

  console.log(userResponse, stylistId, "stylistid");

  useEffect(() => {
    if (stylistId !== "" && stylistId !== null && stylistId !== undefined) {
      fetchUserResponse();
    }
  }, []);

  useEffect(() => {
    // setStylistValues((prev) => ({ ...prev, id: stylistId }));

    if (state?._id !== undefined) {
      // setButtonAction("Edit");
      const { facebook, instagram, website } = stylistValues;
      const socials = { facebook, instagram, website };
      const socialKeys = Object.keys(socials);
      const socialValues = Object.values(socials);
      if (
        socialValues.filter((itm) => itm !== undefined && itm !== "").length > 0
      ) {
        setCount([]);
      }
      socialValues.forEach((element, i, itm) => {
        const randomid = Math.floor(Math.random() * 10000);
        if (element !== undefined && element !== "") {
          add(socialKeys[i], randomid);
        }
      });
    }
  }, []);

  const disableBtn = () => {
    const isValid =
      stylistValues.email?.trim()?.length &&
      stylistValues.address?.trim()?.length &&
      stylistValues?.phone_no !== null;
    // if (stylistValues?.phone_no === undefined) {
    //   return false;
    // }
    if (isValid || buttonAction === "Edit") {
      return false;
    }
    return true;
  };

  // const deleteR = (id, selected) => {
  //   setCount((prev) => prev.filter((item) => item.id !== id));
  //   handleSelectChange({ name: selected, value: "" });
  // };

  const handleChange = (e, data) => {
    if (e.target) {
      setStylistValues((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
    if (!e.target) {
      const { dialCode } = data;
      setStylistValues((prev) => ({
        ...prev,
        phone_no: e,
        zipcode: dialCode,
      }));
    }
  };

  const handleCreateStylist = () => {
    setIsloading(true);
    if (
      stylistValues.email.trim() !== "" &&
      stylistValues.address.trim() !== ""
    ) {
      admin
        .UpdateStylist(stylistValues)
        .then((res) => {
          console.log(res.data.stylist, "data");
          setButtonAction("Edit");
          setIsloading(false);
          setActiveTab((prev) => ({ ...prev, certifificationTab: true }));
        })
        .catch((err) => console.log(err));
    }
  };

  const handleClick = () => {
    if (buttonAction === "Save" || buttonAction === "Update") {
      handleCreateStylist();
    }
    if (buttonAction === "Edit") {
      setButtonAction("Update");
    }
  };

  return (
    <div aria-hidden={ariaHidden} id={idx} className="relative">
      {isloading && (
        <div className="absolute inset-0 flex justify-center items-center z-10 bg-black-50">
          <div className="loader" />
        </div>
      )}
      <label
        className="block text-black text-sm font-bold mt-5"
        htmlFor="address"
      >
        Address
        <input
          disabled={buttonAction === "Edit"}
          className="shadow-sm appearance-none mt-3 border border-gray-800 rounded-lg w-full h-46 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Type and select address..."
          name="address"
          label="address"
          id="address"
          value={stylistValues.address}
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
            disabled={buttonAction === "Edit"}
            className="shadow-sm appearance-none mt-3 border border-gray-800 rounded-lg w-full h-46 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="Enter email address"
            name="email"
            label="email"
            id="email"
            value={stylistValues.email}
            onChange={handleChange}
          />
        </label>
        <label
          className="flex flex-col text-black text-sm font-bold mt-5 col"
          htmlFor="phone_no"
        >
          Phone Number
          <div className="phoneinput mt-3 relative flex flex-1 ">
            <PhoneInput
              inputClass="relative shadow-sm col-span-8 appearance-none mt-3 border border-gray-800 rounded-lg w-full h-46 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              inputStyle={{ width: "100%", height: "unset" }}
              dropdownClass="bg-black-50"
              buttonClass=""
              placeholder="Enter phone number"
              country="us"
              disabled={buttonAction === "Edit"}
              inputProps={{
                name: "phone_no",
                autoFocus: true,
              }}
              value={stylistValues.phone_no}
              onChange={handleChange}
            />
          </div>
        </label>
      </div>
      <div className="mt-5">
        Links
        <div>
          <div>
            {count.map(({ id, key }, i) => {
              return (
                <React.Fragment key={id}>
                  <ExtraLinks
                    buttonAction={buttonAction}
                    globalInput={stylistValues}
                    setGlobalInput={setStylistValues}
                    idx={id}
                    opt={key}
                    setCount={setCount}
                    links={links}
                    setlinks={setlinks}
                    // onDelete={deleteR}
                    count={count}
                  />
                  {count.length - 1 === i && count.length < 3 && (
                    <button
                      type="button"
                      disabled={buttonAction === "Edit"}
                      onClick={() =>
                        add("website", Math.floor(Math.random() * 10000))
                      }
                      className="text-purple-100 text-sm font-BeatriceRegular mt-5 cursor-pointer"
                    >
                      Add more links
                    </button>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleClick}
          disabled={disableBtn()}
          className="text-sm disabled:opacity-50 font-BeatriceSemiBold rounded-full bg-orange-200 py-2 px-8 text-white mt-5"
        >
          {buttonAction}
        </button>
      </div>
    </div>
  );
}

export default LocationAndContact;
