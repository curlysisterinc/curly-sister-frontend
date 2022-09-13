import React, { useEffect, useMemo, useState } from "react";
import GoogleMapReact from "google-map-react";
import { ReactComponent as LocationIcon } from "../../../assets/images/location-dark.svg";
import { ReactComponent as VerifyIcon } from "../../../assets/images/verify.svg";
import avatar2 from "../../../assets/images/gradient-avatar.svg";
import galleryBanner from "../../../assets/images/stylist-profile-banner.png";

const K_SIZE = 40;

function LocationMaker({ text, $hover, stylist, ...rest }) {
  const display = text ? "visible" : "invisible";
  return (
    <div className={`${display}`}>
      <LocationIcon color="#590BA9" />
    </div>
  );
}

function MapMaker({
  text,
  $hover,
  stylist,
  // handleScriptLoad,
  ...rest
}) {
  const { data, isMapLoaded } = text;
  // console.log(data);
  const style = $hover ? "flex" : "hidden";
  // const style = "flex";
  const display = isMapLoaded ? "visible" : "invisible";

  return (
    <div className={`relative ${display}`}>
      <LocationIcon />
      <div
        className={`bg-white border border-gray-600 shadow-s07 absolute  rounded-2xl bottom-9   w-350 flex overflow-hidden ${style} z-100 -translate-x-2/4`}
      >
        <div className="w-2/5 flex justify-center items-center">
          <img
            src={data.gallery[0] ?? galleryBanner}
            alt=""
            className="object-cover w-full h-full"
          />

          <img
            src={data.photo ?? avatar2}
            alt=""
            className="w-16 h-16   relative right-7  rounded-full object-cover border-white border"
          />
        </div>
        <div className="m-3 w-3/5">
          <div className="flex  items-center mb-1">
            <p className="text-gray-350 font-semibold text-base mr-1">
              {data.business_name ?? data.stylist_name}
            </p>
            <VerifyIcon />
          </div>
          <p className="font-normal text-sm mb-2">{data.description}</p>
          <p className="font-normal text-sm">
            {data?.phone_no} · {data?.address} ·{" "}
            {data?.certifications.length > 0 && "Certified"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function StylistMap({
  stylelist,
  selectedPlace,
  positionData,
  handleScriptLoad,
  isMapFixed,
}) {
  const { position, status: currentLocationStatus } = positionData;
  const { lat, lng } = position;

  const [mapGeo, setMapGeo] = useState({
    longitude: null,
    latitude: null,
  });
  const [isMapLoaded, setIsMapLoaded] = useState("false");

  useEffect(() => {
    if (currentLocationStatus === "data") {
      setMapGeo({ longitude: Number(lng), latitude: Number(lat) });
    }
  }, [currentLocationStatus]);

  useEffect(() => {
    if (selectedPlace) {
      setMapGeo({
        longitude: Number(selectedPlace.lng),
        latitude: Number(selectedPlace.lat),
      });
    }
  }, [selectedPlace]);

  const defaultProps = {
    center: { ...position },
    zoom: 5,
  };

  const createMapOptions = (maps) => {
    return {
      mapTypeControl: false,
      scrollwheel: true,
      fullscreenControl: false,
      scaleControl: true,
      gestureHandling: "greedy",
      minZoom: 1,
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
        width: isMapFixed ? "450px" : "100%",
        position: isMapFixed ? "fixed" : "sticky",
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
            ? "opacity-100 h-full flex justify-center item transition-opacity  delay-300 duration-1000 "
            : "opacity-0 h-0 transition-opacity relative"
        }`}
      >
        {defaultProps?.center?.lat && (
          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.REACT_APP_MAP_API,
              libraries: ["places"],
            }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            options={createMapOptions}
            // onGoogleApiLoaded={({ map, maps }) => alert("loaded")}
            // yesIWantToUseGoogleMapApiInternals
            center={{
              lat: Number(mapGeo.latitude),
              lng: Number(mapGeo.longitude),
            }}
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
