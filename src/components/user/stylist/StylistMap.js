/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-shadow */
import React, { useEffect, useMemo, useRef, useState } from "react";
import GoogleMapReact from "google-map-react";
import useSupercluster from "use-supercluster";
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
  children,
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
        className={`bg-white border border-gray-600 shadow-s07 absolute  rounded-2xl bottom-9 p-0  w-350 flex overflow-hidden ${style} z-100 `}
      >
        <div className="w-2/5 h-full flex justify-center items-center relative">
          <img
            src={data.gallery[0] ?? galleryBanner}
            alt=""
            className="w-full h-40  object-none"
          />
          <img
            src={data.photo ? data.photo : avatar2}
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
      {children}
    </div>
  );
}

const Marker = ({ children }) => children;

export default function StylistMap({
  stylelist,
  selectedPlace,
  positionData,
  handleScriptLoad,
  isMapFixed,
}) {
  const { position, status: currentLocationStatus } = positionData;
  const { lat, lng } = position;
  const [zoom, setZoom] = useState(10);
  const [bounds, setBounds] = useState(null);

  const mapRef = useRef();

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
    zoom: 15,
  };

  const createMapOptions = (maps) => {
    return {
      mapTypeControl: false,
      scrollwheel: true,
      fullscreenControl: false,
      scaleControl: true,
      gestureHandling: "greedy",
      minZoom: 8,
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
    const res = [...stylelist]
      .filter((item) => item.latitude && item.longitude)
      .map((elem) => {
        return {
          type: "Feature",
          properties: {
            cluster: false,
            category: "wells",
            wellId: elem._id,
            data: elem,
          },
          geometry: {
            type: "Point",
            coordinates: [
              parseFloat(elem.longitude),
              parseFloat(elem.latitude),
            ],
          },
        };
      });
    console.log("res", res);
    return res;
  }, []);

  const { clusters, supercluster } = useSupercluster({
    points: stylistsWithGeoInfo,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 },
  });
  console.log({ clusters, supercluster, bounds });

  // const apiIsLoaded = (map, maps, places) => {
  //   const newBounds = new maps.LatLngBounds();
  //   console.log("newBounds", newBounds);
  //   stylelist.forEach((place) => {
  //     console.log("place", place);
  //     newBounds.extend(new maps.LatLng(place.latitude, place.longitude));
  //   });
  //   setBounds(newBounds);
  // };

  return (
    // Important! Always set the container height explicitly
    <div
      style={{
        height: "calc(100vh - 220px)",
        width: isMapFixed ? "450px" : "100%",
        position: isMapFixed ? "fixed" : "sticky",
        top: 0,
        borderRadius: "16px",
        // background: "rgb(229, 227, 223)",
      }}
    >
      {/* {currentLocationStatus !== "data" && currentLocationStatus} */}
      <div
        className={`${
          currentLocationStatus !== "data"
            ? "opacity-100 h-full flex justify-center item transition-opacity rounded-2xl"
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
        <div style={{ height: "100vh", width: "100%" }}>
          {defaultProps?.center?.lat && (
            // <GoogleMapReact
            //   bootstrapURLKeys={{
            //     key: process.env.REACT_APP_MAP_API,
            //     libraries: ["places"],
            //   }}
            //   defaultCenter={defaultProps.center}
            //   defaultZoom={defaultProps.zoom}
            //   // options={createMapOptions}
            //   yesIWantToUseGoogleMapApiInternals
            //   onGoogleApiLoaded={({ map, maps }) => {
            //     mapRef.current = map;
            //     // return apiIsLoaded(map, maps);
            //   }}
            //   // center={{
            //   //   lat: Number(mapGeo.latitude),
            //   //   lng: Number(mapGeo.longitude),
            //   // }}
            //   onChange={({ z, b }) => {
            //     console.log({ z, b });
            //     setZoom(zoom);
            //     // setBounds({ ...mapGeo });
            //   }}
            // >
            <GoogleMapReact
              bootstrapURLKeys={{
                key: process.env.REACT_APP_MAP_API,
                libraries: ["places"],
              }}
              defaultCenter={defaultProps.center}
              defaultZoom={10}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map }) => {
                mapRef.current = map;
              }}
              center={{
                lat: Number(mapGeo.latitude),
                lng: Number(mapGeo.longitude),
              }}
              onChange={({ zoom, bounds }) => {
                setZoom(zoom);
                setBounds([
                  bounds.nw.lng,
                  bounds.se.lat,
                  bounds.se.lng,
                  bounds.nw.lat,
                ]);
              }}
            >
              {clusters &&
                clusters.map((cluster) => {
                  const [longitude, latitude] = cluster.geometry.coordinates;
                  const { cluster: isCluster, point_count: pointCount } =
                    cluster.properties;

                  if (isCluster) {
                    const size = (pointCount * 20) / stylistsWithGeoInfo.length;

                    return (
                      <Marker
                        lat={latitude}
                        lng={longitude}
                        key={`cluster-${cluster.id}`}
                        className="rounded-xl p-2 flex items-center justify-center bg-green-500 text-white"
                      >
                        <div
                          className="rounded-xl p-2 flex items-center justify-center bg-green-500 text-white"
                          style={{ width: `${size}px`, height: `${size}px` }}
                          onClick={() => {
                            const expansionZoom = Math.min(
                              supercluster.getClusterExpansionZoom(cluster.id),
                              20
                            );
                            mapRef.current.setZoom(expansionZoom);
                            mapRef.current.panTo({
                              lat: latitude,
                              lng: longitude,
                            });
                          }}
                        >
                          {pointCount}
                        </div>
                      </Marker>
                    );
                  }
                  return (
                    <MapMaker
                      lat={cluster.properties?.latitude}
                      lng={cluster.properties?.longitude}
                      key={cluster.properties?._id}
                      text={{ data: cluster.properties.data, isMapLoaded }}
                    />
                  );
                })}
            </GoogleMapReact>
          )}
        </div>
      </div>
    </div>
  );
}
