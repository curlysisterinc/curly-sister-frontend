import React from "react";
import CommonCard from "../../stylistCard";
import StylistMap from "./StylistMap";

function StylistList({ list, selectedPlace, positionData }) {
  const [openMap, setOpenMap] = React.useState(true);

  return (
    <div>
      <div className="grid grid-cols-12 gap-4">
        <div className={`${openMap ? "col-span-8" : "col-span-12"} `}>
          <div className="flex justify-between items-center mt-8">
            <p className="text-gray-200 text-sm">{list.length} stylists</p>
            <button
              type="button"
              className="text-gray-200 text-sm cursor-pointer"
              onClick={() => setOpenMap(!openMap)}
            >
              {openMap ? "Hide map" : "Show map"}
            </button>
          </div>
          {list.length > 0 ? (
            <div
              className={`grid  gap-6 my-5 w-full grid-cols-1 md:${
                openMap ? "grid-cols-2" : "grid-cols-3"
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
          className={`${openMap ? "col-span-4" : "hidden"} h-1/2 sticky top-0`}
        >
          <StylistMap
            stylelist={list}
            selectedPlace={selectedPlace}
            positionData={positionData}
          />
        </div>
      </div>
    </div>
  );
}

export default StylistList;
