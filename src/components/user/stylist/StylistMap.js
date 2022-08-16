import React, { useEffect, useMemo, useState } from "react";
import GoogleMapReact from "google-map-react";
import { ReactComponent as LocationIcon } from "../../../assets/images/location-dark.svg";
import { ReactComponent as VerifyIcon } from "../../../assets/images/verify.svg";
import hairChallenge from "../../../assets/images/hair-challenge-avatar.png";
import girl from "../../../assets/images/girl-2.png";

const K_SIZE = 40;

function MapMaker({ text, $hover, stylist, ...rest }) {
  const style = $hover ? "flex" : "hidden";
  return (
    <div className="relative">
      <LocationIcon />
      <div
        className={`bg-white border border-gray-600 shadow-s07 absolute rounded-2xl -top-10 left-10  w-489 flex overflow-hidden ${style} z-10`}
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
              {text.business_name}
            </p>
            <VerifyIcon />
          </div>
          <p className="font-normal text-sm mb-2">
            Here’s a short version of a bio where one has been provided.
          </p>
          <p className="font-normal text-sm">
            {text?.phone_no} · {text?.address} ·{" "}
            {text?.certifications.length > 0 && "Certified"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function StylistMap({ stylelist, selectedPlace, positionData }) {
  const { position, status: currentLocationStatus } = positionData;
  const { lat, lng } = position;

  console.log({ stylelist, selectedPlace, positionData });

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

  const defaultProps = currentLocationStatus === "data" && {
    center: { lat, lng },
    zoom: 11,
  };

  const createMapOptions = (maps) => {
    return {
      panControl: false,
      mapTypeControl: false,
      scrollwheel: true,
      fullscreenControl: false,
      scaleControl: true,
      // disableDefaultUI: true,
      // fullscreenControl: false,
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
  const stylistsWithGeoInfo = useMemo(() => {
    return [...stylelist].filter((item) => item.latitude && item.longitude);
  });

  return (
    // Important! Always set the container height explicitly
    <div
      style={{
        height: "calc(100vh - 220px)",
        width: "100%",
        position: "sticky",
        top: 0,
        // background: "rgb(229, 227, 223)",
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
            : "opacity-0 h-0 transition-opacity relative"
        }`}
      >
        {/* <button
          type="button"
          className="absolute left-0 top-0 text-gray-200 text-sm cursor-pointer z-50"
        >
          toggle map
        </button> */}
        {currentLocationStatus === "data" && (
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            options={createMapOptions}
            //   onChildClick
            // hoverDistance={20}

            center={{ lng: mapGeo.longitude, lat: mapGeo.latitude }}
          >
            {[...stylistsWithGeoInfo].map((item) => (
              <MapMaker
                lat={item.latitude}
                lng={item.longitude}
                key={item._id}
                text={item}
              />
            ))}
          </GoogleMapReact>
        )}
      </div>
    </div>
  );
}