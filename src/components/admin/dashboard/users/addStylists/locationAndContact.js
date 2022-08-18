/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */

import React, { useState, useEffect, useContext, useRef } from "react";
// import { PhoneInput } from "react-contact-number-input";
import { useLocation } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import Script from "react-load-script";
import useChangeBtnTitle from "../../../../../hooks/useChangeBtnTitle";
// import { Loadersmall } from "../../../../loader";
import admin from "../../../../../api/admin";
import ExtraLinks from "../extraLinks";
import "react-phone-input-2/lib/style.css";
import { PersistUserContext } from "./addStylist";
import OrangeBtn from "../../../../customButton/orangeBtn";
import { locationInitials } from "./helper";

function LocationAndContact({ ariaHidden, idx, setActiveTab }) {
  const [stylistLocation, setStylistLocation] = useState(locationInitials);
  const { state } = useLocation();
  // console.log(admin);

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
  const [coord, setCoord] = useState({ lat: "", lng: "" });

  // changes the title of the save button to update if user is from stylistrow
  // add id to the initialstate to be sent
  useChangeBtnTitle(
    "location",
    setButtonAction,
    setStylistLocation,
    stylistLocation
  );

  const add = (key, randomid) => {
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
  // const [userResponse, fetchUserResponse] = useContext(PersistUserContext);
  const stylistId = localStorage.getItem("createdStylist");

  // const [userResponse, fetchUserResponse] = useContext(PersistUserContext);

  useEffect(() => {
    if (state) {
      setIsloading(true);
      admin
        .GetStylistById(stylistId)
        .then((res) => {
          const {
            facebook,
            instagram,
            website,
            address,
            phone_no,
            zipcode,
            email,
          } = res.data.stylist;
          setStylistLocation((prev) => ({
            ...prev,
            address,
            phone_no,
            zipcode,
            email,
          }));
          const socials = { facebook, instagram, website };
          const socialKeys = Object.keys(socials);
          const socialValues = Object.values(socials);
          if (
            socialValues.filter((itm) => itm !== undefined && itm !== "")
              .length > 0
          ) {
            setCount([]);
          }
          socialValues.forEach((element, i, itm) => {
            const randomid = Math.floor(Math.random() * 10000);
            if (element !== undefined && element !== "") {
              setStylistLocation((prev) => ({
                ...prev,
                [socialKeys[i]]: element,
              }));
              add(socialKeys[i], randomid);
            }
          });
          setIsloading(false);
        })
        .catch((err) => {
          console.log(err, "error fetching existing stylist information");
          setIsloading(false);
        });
    }
  }, []);

  const disableBtn = () => {
    console.log({ stylistLocation });
    const isValid =
      stylistLocation?.email?.trim()?.length &&
      stylistLocation?.address?.trim()?.length &&
      stylistLocation?.phone_no !== null;

    if (isValid || buttonAction === "Edit") {
      return false;
    }
    return true;
  };

  const handleChange = (e, data) => {
    if (e.target) {
      setStylistLocation((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
    if (!e.target) {
      const { dialCode } = data;
      setStylistLocation((prev) => ({
        ...prev,
        phone_no: e,
        zipcode: dialCode,
      }));
    }
  };

  const handleCreateStylist = () => {
    setIsloading(true);
    if (
      stylistLocation?.email?.trim() !== "" &&
      stylistLocation?.address?.trim() !== ""
    ) {
      admin
        .UpdateStylist({
          ...stylistLocation,
          address: searchInput?.current?.value,
          id: localStorage.getItem("createdStylist"),
        })
        .then((res) => {
          console.log(res.data.stylist, "data");
          setButtonAction("Edit");
          console.log("changedbtn to edit");
          setIsloading(false);
          setActiveTab((prev) => ({ ...prev, certifificationTab: true }));
        })
        .catch((err) => {
          setIsloading(false);
          console.log(err);
        });
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

  const autocompleteRef = useRef(null);
  const searchInput = useRef(null);

  console.log("address", searchInput?.current?.value);

  const handleScriptLoad = () => {
    // Initialize Google Autocomplete
    /* global google */ // To disable any eslint 'google not defined' errors
    autocompleteRef.current = new google.maps.places.SearchBox(
      document.getElementById("searchInput")
    );

    autocompleteRef.current.addListener("places_changed", handlePlaceSelect);
  };

  const handlePlaceSelect = () => {
    console.log("whats happening");
    const places = autocompleteRef.current.getPlaces();
    console.log({ places });
    if (places.length === 0) {
      return;
    }

    const geo = places[0].geometry.location;

    setStylistLocation({
      ...stylistLocation,
      address: searchInput?.current?.value,
      latitude: geo.lat(),
      longitude: geo.lng(),
    });
  };

  return (
    <div aria-hidden={ariaHidden} id={idx} className="relative">
      <Script
        url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAP_API}&libraries=places`}
        onLoad={handleScriptLoad}
      />
      <label
        className="block text-black text-sm font-bold mt-5"
        htmlFor="address"
      >
        Address
        <input
          disabled={buttonAction === "Edit"}
          autoComplete="off"
          className="shadow-sm appearance-none mt-3 border border-gray-800 rounded-lg w-full h-46 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Type and select address..."
          name="address"
          label="address"
          id="searchInput"
          ref={searchInput}
          // value={stylistLocation.address}
          // onChange={handleChange}
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
            autoComplete="off"
            className="shadow-sm appearance-none mt-3 border border-gray-800 rounded-lg w-full h-46 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="Enter email address"
            name="email"
            label="email"
            id="email"
            value={stylistLocation.email}
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
              value={stylistLocation.phone_no}
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
                    globalInput={stylistLocation}
                    setGlobalInput={setStylistLocation}
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
        <OrangeBtn
          buttonAction={buttonAction}
          disabled={disableBtn()}
          onClick={handleClick}
          isloading={isloading}
        />
      </div>
    </div>
  );
}

export default LocationAndContact;
