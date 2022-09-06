import React from "react";
import CommonCard from "../../stylistCard";
import StylistMap from "./StylistMap";

function StylistList({ list, selectedPlace, positionData, handleScriptLoad }) {
  const [isMapOpen, setIsMapOpen] = React.useState(true);

  return (
    <div>
      <div className="grid grid-cols-12 gap-4">
        <div
          className={`${
            isMapOpen ? "col-span-12 lg:col-span-8" : "col-span-12"
          } `}
        >
          <div className="flex justify-between items-center mt-8">
            <p className="text-gray-200 text-sm">{list.length} stylists</p>
            <button
              type="button"
              className="hidden lg:block text-gray-200 text-sm cursor-pointer"
              onClick={() => setIsMapOpen(!isMapOpen)}
            >
              {isMapOpen ? "Hide map" : "Show map"}
            </button>
          </div>
          {list.length > 0 ? (
            <div
              className={`grid  gap-6 my-5 w-full ${
                isMapOpen
                  ? "grid-cols-1  md:grid-cols-2"
                  : "md:grid-cols-2 lg:grid-cols-4"
              }`}
            >
              {list.map((item) => {
                return <CommonCard key={item._id} stylist={item} />;
              })}
            </div>
          ) : (
            <div className="text-lg text-center mt-8">No stylist available</div>
          )}
        </div>
        <div
          className={`${
            isMapOpen ? "hidden lg:block lg:col-span-4 " : "hidden"
          } h-1/2 sticky top-0
          `}
        >
          <StylistMap
            stylelist={list}
            selectedPlace={selectedPlace}
            positionData={positionData}
            handleScriptLoad={handleScriptLoad}
          />
        </div>
      </div>
    </div>
  );
}

export default StylistList;
