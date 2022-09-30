import Loader from "components/loader-component/loader";
import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { FaAngleUp } from "react-icons/fa";
import CommonCard from "../../stylistCard";
import StylistMap from "./StylistMap";

function ScrollToTop() {
  return (
    <button
      type="button"
      className="fixed bottom-10 right-6 z-70 bg-orange-200 rounded-full h-50 w-50 cursor-pointer flex items-center justify-center shadow-s05"
    >
      <FaAngleUp size={30} className="text-white" />
    </button>
  );
}

function StylistList({
  list,
  fetchNextPage,
  hasNextPage,
  selectedPlace,
  positionData,
  isSearchMode,
  // handleScriptLoad,
  isMapFixed,
  totalStylistCount,
  hasSearchNextPage,
}) {
  const [ref, inView] = useInView();

  const [isMapOpen, setIsMapOpen] = React.useState(true);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const isMapLoadingFailed =
    positionData.status === "Unable to retrieve your location";
  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  useEffect(() => {
    window.addEventListener("scroll", toggleScrollToButton);

    return window.removeEventListener("scroll", toggleScrollToButton, false);
  });

  const toggleScrollToButton = () => {
    if (window.scrollY > 400) {
      setShowTopBtn(true);
    } else {
      setShowTopBtn(false);
    }
  };

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const isPaginationLoading =
    (!isSearchMode && hasNextPage) || (isSearchMode && hasSearchNextPage);

  return (
    <div>
      {showTopBtn && <ScrollToTop onClick={goToTop} />}
      <div className="grid grid-cols-12 gap-4">
        <div
          className={`${
            isMapOpen && !isMapLoadingFailed
              ? "col-span-12 lg:col-span-8"
              : "col-span-12"
          } `}
        >
          <div className="flex justify-between items-center pt-32px">
            <p className="text-gray-200 text-sm">
              {totalStylistCount
                ? `${list.length} stylists out of ${totalStylistCount}`
                : ""}
            </p>
            {!isMapLoadingFailed && (
              <button
                type="button"
                className="hidden lg:block text-gray-200 text-sm cursor-pointer"
                onClick={() => setIsMapOpen(!isMapOpen)}
              >
                {isMapOpen ? "Hide map" : "Show map"}
              </button>
            )}
          </div>
          <div>
            {list.length > 0 ? (
              <div
                className={`grid  gap-6 my-5 w-full relative ${
                  isPaginationLoading ? "pb-24" : "pb-0"
                } ${
                  isMapOpen && !isMapLoadingFailed
                    ? "grid-cols-1  md:grid-cols-2"
                    : "md:grid-cols-2 lg:grid-cols-4"
                }`}
              >
                {list.map((item) => {
                  return <CommonCard key={item._id} stylist={item} />;
                })}

                {isPaginationLoading && (
                  <div className="absolute bottom-0 w-full" ref={ref}>
                    <Loader />
                  </div>
                )}
              </div>
            ) : (
              <div className="text-lg text-center mt-8">
                No stylist available
              </div>
            )}
          </div>
        </div>
        <div
          className={`${
            isMapOpen && !isMapLoadingFailed
              ? "hidden lg:block lg:col-span-4 "
              : "hidden"
          } h-1/2 sticky top-0
          `}
        >
          <StylistMap
            stylelist={list}
            selectedPlace={selectedPlace}
            positionData={positionData}
            // handleScriptLoad={handleScriptLoad}
            isMapFixed={isMapFixed}
          />
        </div>
      </div>
    </div>
  );
}

export default StylistList;
