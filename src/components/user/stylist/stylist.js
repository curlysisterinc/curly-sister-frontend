import React, { useState, useRef, useCallback, useEffect } from "react";
import useGetAllStylists from "hooks/data/admin/useGetAllStylists";
import useGetCurrentLocation from "hooks/useGetCurrentLocation";

import admin from "api/admin";
import SideBarComponent from "../../sidebar";
// import admin from "../../../api/admin";
import FilterPanel from "./filterPanel";
import StylistList from "./StylistList";
import StylistMap from "./StylistMap";

function Stylist() {
  const { position, status: currentLocationStatus } = useGetCurrentLocation();

  const [selectBookableStylist, setSelectBookableStylist] = useState(false);
  const [categories, setCategories] = useState("all-stylist");
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [certifications, setCertifications] = useState([
    {
      id: 1,
      checked: false,
      label: "Deva",
    },
    {
      id: 2,
      checked: false,
      label: "Quidad",
    },
    {
      id: 3,
      checked: false,
      label: "Ketch",
    },
  ]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [getServices, setGetServices] = useState([]);
  const [filteredArr, setFilteredArr] = useState([]);
  const [getStylist, setGetStylist] = React.useState([]);

  const handleSelectToggle = () => {
    // console.log("handleSelectToggle", selectBookableStylist);
    setSelectBookableStylist(!selectBookableStylist);
  };

  const handleSelectCategory = (e) => {
    setCategories(e.target.value);
  };

  const handleOnCheckboxChange = (id, value) => {
    const newArr = certifications;
    const getCheckedItems = newArr.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setCertifications(getCheckedItems);
  };

  const applyFilter = () => {
    let updatedList = filteredArr;
    // console.log(updatedList, "all");
    if (selectBookableStylist === true) {
      updatedList = updatedList.filter((item) => item.services.length > 0);
      // setGetStylist(updatedList);
      // console.log(updatedList, "services available");
    }

    if (categories !== "all-stylist") {
      updatedList = updatedList.filter(
        (item) => item.category_type === categories
      );
      // console.log(updatedList, "all stylist");
    }

    // const checkCertificates = certificationsAndTags
    //   .filter((item) => item.checked)
    //   .map((item) => item.label.toLocaleLowerCase());
    // if (checkCertificates.length) {
    //   updatedList = updatedList.filter((item) =>
    //     checkCertificates.includes(item.certifications)
    //   );
    // }
    setGetStylist(updatedList);
  };
  const { data: stylistData, loading, error } = useGetAllStylists();
  const stylists = stylistData?.data?.stylists;

  React.useEffect(() => {
    if (stylistData) {
      setFilteredArr(stylists);
    }
  }, [stylistData]);

  React.useEffect(() => {
    const fetchData = () => {
      admin.GetServices().then((response) => {
        setGetServices(response.data.data);
      });
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    applyFilter();
  }, [selectBookableStylist, categories]);

  // Store autocomplete object in a ref.
  // This is done because refs do not trigger a re-render when changed.
  const autocompleteRef = useRef(null);

  // const choi = useCallback(() => {
  //   if (isLoaded) {
  //     const container = document.querySelector(".pac-container");
  //     container.addEventListener("mousedown", (e) => {
  //       e.stopPropagation();
  //       console.log("target", e);
  //     });
  //   }
  // }, [isLoaded]);

  // useEffect(() => {
  //   const container = document.querySelector(".pac-container");
  //   const currentLocation = document.querySelector(".currentLocation");
  //   if (container && container?.style?.display !== "none") {
  //     container.innerHTML = test;
  //     setIsLoaded(true);
  //     choi();
  //   }
  // });

  const getLocation = () => {
    setLat(position.lat);
    setLng(position.lng);
  };

  const handlePlaceSelect = () => {
    const places = autocompleteRef.current.getPlaces();

    if (places.length === 0) {
      return;
    }

    const geo = places[0].geometry.location;
    setLat(geo.lat());
    setLng(geo.lng());
  };

  const handleScriptLoad = () => {
    // Initialize Google Autocomplete
    /* global google */ // To disable any eslint 'google not defined' errors
    autocompleteRef.current = new google.maps.places.SearchBox(
      document.getElementById("searchInput")
    );

    autocompleteRef.current.addListener("places_changed", handlePlaceSelect);
  };

  const handleClick = () => {
    getLocation();
    document.getElementById("searchInput").value = "";
    // const geocoder = new google.maps.Geocoder(
    //   document.getElementById("searchInput")
    // );
    // console.log({ position });
    // geocoder
    //   .geocode({ location: { lat: position.lat, lng: position.lng } })
    //   .then((response) => {
    //     console.log("response", response);
    //     document.getElementById("searchInput").value = "";
    //     // document.getElementById("searchInput").value =
    //     //   response.results[0].formatted_address;
    //   });
  };

  return (
    <div className="ml-80 bg-white px-10 pt-8 w-full min-h-screen">
      <FilterPanel
        selectToggle={handleSelectToggle}
        selectBookableStylist={selectBookableStylist}
        certifications={certifications}
        handleOnCheckboxChange={handleOnCheckboxChange}
        categories={categories}
        handleSelectCategory={handleSelectCategory}
        getServices={getServices}
        handleScriptLoad={handleScriptLoad}
        handleClick={handleClick}
      />
      <hr className="w-full border border-gray-600 mt-8" />
      {stylistData && (
        <StylistList list={stylists} selectedPlace={{ lat, lng }} />
      )}
    </div>
  );
}

export default Stylist;
