import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import useGetCurrentLocation from "hooks/useGetCurrentLocation";
import { ReactComponent as LocationIcon } from "../../../assets/images/location-dark.svg";
import { ReactComponent as VerifyIcon } from "../../../assets/images/verify.svg";
import hairChallenge from "../../../assets/images/hair-challenge-avatar.png";
import girl from "../../../assets/images/girl-2.png";

const K_SIZE = 40;

function AnyReactComponent({ text, $hover, ...rest }) {
  const style = $hover ? "flex" : "hidden";
  console.log({ text, $hover, ...rest });
  return (
    <div className="relative bg-red-600 ">
      {/* <LocationIcon /> */}
      <div className="bg-white border border-gray-600 shadow-s07 absolute rounded-2xl w-5 h-5" />
      <div
        className={`bg-white border border-gray-600 shadow-s07 absolute rounded-2xl -top-10 left-10  w-489 flex overflow-hidden ${style}`}
      >
        <div className="w-2/5 flex justify-center items-center">
          <img src={girl} alt="" className="object-cover w-4/5" />

          <img
            src={hairChallenge}
            alt=""
            className="w-16 h-16  rounded relative right-7 object-cover"
          />
        </div>
        <div className="m-3 w-3/5">
          <div className="flex  items-center mb-1">
            <p className="text-gray-350 font-semibold text-base mr-1">
              Sade’s Beauty Place
            </p>
            <VerifyIcon />
          </div>
          <p className="font-normal text-sm mb-2">
            Here’s a short version of a bio where one has been provided.
          </p>
          <p className="font-normal text-sm">
            (636) 763-9867 · 333, Fremont Str, SF, CA (12km) · Certified
          </p>
        </div>
      </div>
    </div>
  );
}

export default function StylistMap({ stylelist, selectedPlace }) {
  const { position, status: currentLocationStatus } = useGetCurrentLocation();
  const { lat, lng } = position;

  const [mapGeo, setMapGeo] = useState({
    longitude: null,
    latitute: null,
  });

  useEffect(() => {
    if (currentLocationStatus === "data") {
      setMapGeo({ longitude: lng, latitude: lat });
    }
  }, [currentLocationStatus]);

  useEffect(() => {
    if (selectedPlace) {
      setMapGeo({ longitude: selectedPlace.lng, latitude: selectedPlace.lat });
    }
  }, [selectedPlace]);

  const defaultProps = {
    center: { ...position },
    zoom: 11,
  };

  const createMapOptions = (maps) => {
    return {
      panControl: true,
      mapTypeControl: true,
      scrollwheel: true,
      styles: [
        {
          stylers: [
            { saturation: -50 },
            { gamma: 0.8 },
            { lightness: 20 },
            { visibility: "on" },
          ],
        },
      ],
    };
  };

  return (
    // Important! Always set the container height explicitly
    <div
      style={{
        height: "calc(100vh - 220px)",
        width: "100%",
        position: "sticky",
        top: 0,
        background: "rgb(229, 227, 223)",
      }}
    >
      {/* {currentLocationStatus !== "data" && currentLocationStatus} */}
      <div
        className={`${
          currentLocationStatus !== "data"
            ? "opacity-100 h-full flex justify-center item transition-opacity"
            : "opacity-0 h-0"
        }`}
      >
        {currentLocationStatus}
      </div>
      <div
        className={`${
          currentLocationStatus === "data"
            ? "opacity-100 h-full flex justify-center item transition-opacity  delay-300 duration-1000"
            : "opacity-0 h-0 transition-opacity"
        }`}
      >
        {currentLocationStatus === "data" && (
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            options={createMapOptions}
            //   onChildClick
            // hoverDistance={20}
            // yesIWantToUseGoogleMapApiInternals
            // onGoogleApiLoaded={({ map, maps }) =>
            //   apiIsLoaded(map, maps, places)
            // }
            center={{ lng: mapGeo.longitude, lat: mapGeo.latitude }}
            zoom={11}
          >
            <AnyReactComponent lat={lat} lng={lng} />
          </GoogleMapReact>
        )}
      </div>
    </div>
  );
}
