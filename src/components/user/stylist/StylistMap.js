import React, { useEffect, useMemo, useState } from "react";
import GoogleMapReact from "google-map-react";
import { ReactComponent as LocationIcon } from "../../../assets/images/location-dark.svg";
import { ReactComponent as VerifyIcon } from "../../../assets/images/verify.svg";
import hairChallenge from "../../../assets/images/hair-challenge-avatar.png";
import girl from "../../../assets/images/girl-2.png";

const K_SIZE = 40;

function LocationMaker({ text, $hover, stylist, ...rest }) {
  const display = text ? "visible" : "invisible";
  return (
    <div className={`${display}`}>
      <LocationIcon color="#590BA9" />
    </div>
  );
}

function MapMaker({ text, $hover, stylist, ...rest }) {
  const { data, isMapLoaded } = text;
  const style = $hover ? "flex" : "hidden";
  const display = isMapLoaded ? "visible" : "invisible";

  return (
    <div className={`relative ${display} z-10`}>
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
              {data.business_name}
            </p>
            <VerifyIcon />
          </div>
          <p className="font-normal text-sm mb-2">
            Here’s a short version of a bio where one has been provided.
          </p>
          <p className="font-normal text-sm">
            {data?.phone_no} · {data?.address} ·{" "}
            {data?.certifications.length > 0 && "Certified"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function StylistMap({ stylelist, selectedPlace, positionData }) {
  const { position, status: currentLocationStatus } = positionData;
  const { lat, lng } = position;

  const [mapGeo, setMapGeo] = useState({
    longitude: null,
    latitute: null,
  });
  const [isMapLoaded, setIsMapLoaded] = useState("false");

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
    zoom: 7,
  };

  const createMapOptions = (maps) => {
    return {
      mapTypeControl: false,
      scrollwheel: true,
      fullscreenControl: false,
      scaleControl: true,
      gestureHandling: "greedy",
      minZoom: 2,
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
        {defaultProps?.center?.lat && (
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            options={createMapOptions}
            onGoogleApiLoaded={({ map, maps }) => setIsMapLoaded(true)}
            yesIWantToUseGoogleMapApiInternals
            center={[mapGeo.latitude, mapGeo.longitude]}
          >
            {mapGeo?.latitude && (
              <LocationMaker
                lat={mapGeo?.latitude}
                lng={mapGeo?.longitude}
                text={isMapLoaded}
              />
            )}
            {[...stylistsWithGeoInfo].map((item) => (
              <MapMaker
                lat={item?.latitude}
                lng={item?.longitude}
                key={item?._id}
                text={{ data: item, isMapLoaded }}
              />
            ))}
          </GoogleMapReact>
        )}
      </div>
    </div>
  );
}
