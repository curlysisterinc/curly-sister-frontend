/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
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
import OrangeBtn from "../../../../customButton/orangeBtn";
import { locationInitials } from "./helper";

function LocationAndContact({
  ariaHidden,
  idx,
  activeTab,
  isOpen,
  isLoading,
  detailsValues,
  setDetailsValues,
  stylistData,
  mode,
  handleEditStylist,
}) {
  const [stylistLocation, setStylistLocation] = useState(locationInitials);
  const { state } = useLocation();

  const autocompleteRef = useRef(null);
  const searchInput = useRef(null);

  useEffect(() => {
    const ac = new AbortController();
    if (stylistData) {
      // setStylistLocation({ ...detailsValues, ...stylistData });
      searchInput.current.value = stylistData?.address || "";
      const {
        facebook,
        instagram,
        website,
        address,
        phone_no,
        zipcode,
        email,
      } = stylistData;
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
        socialValues.filter((itm) => itm !== undefined && itm !== "").length > 0
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
    }
    return function cleanup() {
      ac.abort();
    };
  }, [stylistData]);

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

  const handleUpdateLocationAndContact = () => {
    const {
      facebook,
      instagram,
      website,
      address,
      phone_no,
      zipcode,
      latitude,
      longitude,
      email,
      country,
      state: userState,
      city,
      _id,
    } = stylistLocation;

    const newValue = {
      facebook,
      instagram,
      website,
      address,
      phone_no,
      zipcode,
      latitude,
      longitude,
      country,
      state: userState,
      city,
      email,
      _id,
    };
    handleEditStylist(newValue);
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

  const handleScriptLoad = () => {
    // Initialize Google Autocomplete
    /* global google */ // To disable any eslint 'google not defined' errors
    autocompleteRef.current = new google.maps.places.SearchBox(
      document.getElementById("searchInput")
    );

    autocompleteRef.current.addListener("places_changed", handlePlaceSelect);
  };

  const handlePlaceSelect = () => {
    const places = autocompleteRef.current.getPlaces();
    if (places.length === 0) {
      return;
    }

    const place = places[0];
    const geo = place.geometry.location;
    const address = place.address_components;
    const componentMap = {};

    address.map((item) => {
      const { types } = item;

      if (types.includes("country")) {
        componentMap.country = item.long_name;
      }
      if (types.includes("administrative_area_level_1")) {
        componentMap.state = item.long_name;
      }
      if (types.includes("administrative_area_level_2")) {
        componentMap.city = item.long_name;
      }
      return null;
    });

    setStylistLocation((prev) => ({
      ...prev,
      ...componentMap,
      address: searchInput?.current?.value,
      latitude: geo.lat(),
      longitude: geo.lng(),
    }));
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
          className="shadow-sm appearance-none mt-3 border border-gray-800 rounded-lg w-full h-46 px-3 text-gray-400 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            className="shadow-sm appearance-none mt-3 border border-gray-800 rounded-lg w-full h-46 px-3 text-gray-400 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              inputClass="relative shadow-sm col-span-8 appearance-none mt-3 border border-gray-800 rounded-lg w-full h-46 px-3 text-gray-400 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline "
              inputStyle={{ width: "100%", height: "unset" }}
              dropdownClass="bg-black-50"
              buttonClass=""
              placeholder="Enter phone number"
              country="us"
              disabled={buttonAction === "Edit"}
              inputProps={{
                name: "phone_no",
                // autoFocus: true,
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
          buttonAction="Save"
          disabled={isLoading}
          onClick={handleUpdateLocationAndContact}
          isloading={isLoading && activeTab === "Location and contact"}
        />
      </div>
    </div>
  );
}

export default LocationAndContact;
