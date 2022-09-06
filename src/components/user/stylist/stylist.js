import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import useGetAllStylists from "hooks/data/admin/useGetAllStylists";
import useSearchStylist from "hooks/data/utility/useSearchStylist";
import useGetCurrentLocation from "hooks/useGetCurrentLocation";

import admin from "api/admin";
import Loader from "components/loader-component/loader";
import SideBarComponent from "../../sidebar";
// import admin from "../../../api/admin";
import FilterPanel from "./filterPanel";
import StylistList from "./StylistList";
import StylistMap from "./StylistMap";

function Stylist() {
  const positionData = useGetCurrentLocation();
  const { data: stylistData, isLoading, isError } = useGetAllStylists();
  const {
    data: stylistSearchData,
    isLoading: isSearchLoading,
    error: isSearchError,
    mutate: searchStylist,
  } = useSearchStylist();

  const stylists = stylistData?.data?.stylists;

  const [selectBookableStylist, setSelectBookableStylist] = useState(false);
  const [categories, setCategories] = useState("all-stylist");
  const [coord, setCoord] = useState({ lat: "", lng: "" });
  const [searchAddress, setSearchAddress] = useState(null);
  const [certifications, setCertifications] = useState([]);
  const [getServices, setGetServices] = useState([]);
  const [filteredArr, setFilteredArr] = useState([]);
  const [stylistList, setStylistList] = React.useState([]);

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
      // setStylistList(updatedList);
      // console.log(updatedList, "services available");
    }

    if (categories !== "all-stylist") {
      updatedList = updatedList.filter(
        (item) => item.category_type === categories
      );
      // console.log(updatedList, "all stylist");
    }

    setStylistList(updatedList);
  };

  React.useEffect(() => {
    if (stylistData) {
      setFilteredArr(stylistData.data.stylists);
      setStylistList(stylistData.data.stylists);
    }
  }, [stylistData]);

  React.useEffect(() => {
    const ac = new AbortController();
    const fetchData = () => {
      admin.GetServices().then((response) => {
        setGetServices(response.data.data);
      });
    };
    fetchData();
    return function cleanup() {
      ac.abort();
    };
  }, []);

  // React.useEffect(() => {
  //   applyFilter();
  // }, [selectBookableStylist, categories]);

  // Store autocomplete object in a ref.
  // This is done because refs do not trigger a re-render when changed.
  const autocompleteRef = useRef(null);

  const getLocation = useCallback(() => {
    setCoord({
      ...coord,
      lat: positionData?.position.lat,
      lng: positionData?.position.lng,
    });
  }, [positionData]);

  useEffect(() => {
    if (positionData.status === "data") {
      getLocation();
    }
  }, [positionData.status]);

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

    // console.log({
    //   ...componentMap,
    //   address: place.name,
    // });
    // console.log("places", places[0]);
    searchStylist({
      // ...componentMap,
      // address: place.name,
      address: document.getElementById("searchInput").value,
    });

    setCoord({
      ...coord,
      lat: geo.lat(),
      lng: geo.lng(),
    });
  };

  const handleScriptLoad = (map, maps) => {
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
  };

  return (
    <div className="bg-white px-10 pt-8 w-full min-h-screen mt-50 md:mt-0">
      {isLoading && <Loader />}
      {stylistData && (
        <>
          <FilterPanel
            selectToggle={handleSelectToggle}
            selectBookableStylist={selectBookableStylist}
            certifications={certifications}
            handleOnCheckboxChange={handleOnCheckboxChange}
            categories={categories}
            handleSelectCategory={handleSelectCategory}
            getServices={getServices}
            handleClick={handleClick}
          />
          <hr className="w-full border border-gray-600 mt-8" />
          <StylistList
            list={stylistList}
            selectedPlace={{ lat: coord.lat, lng: coord.lng }}
            positionData={positionData}
            handleScriptLoad={handleScriptLoad}
          />
        </>
      )}
      {isError && <p>Error </p>}
    </div>
  );
}

export default Stylist;
