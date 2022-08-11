import React from "react";
import CommonCard from "../stylistCard";
import bgOne2 from "../../assets/images/bg-one2.png";

function WaitList({ getStylist }) {
  return (
    <div className="bg-orange-50 px-20 py-10 flex justify-between items-center relative ">
      <img
        className="absolute w-full object-fit top-0 z-0"
        src={bgOne2}
        alt=""
      />

      <div className="relative z-10 grid grid-cols-12 gap-16">
        <div className="col-span-5">
          {getStylist?.splice(0, 1)?.map((item) => {
            return <CommonCard key={item.id} stylist={item} />;
          })}
        </div>
        <div className="col-span-7 my-6">
          <p className="text-gray-300 text-base mb-2">ARE YOU A STYLIST?</p>
          <h3 className="font-GTSuperTextBlack text-4xl text-gray-400 mb-2">
            It’s time to get listed
          </h3>
          <p className="text-gray-200 text-base line-clamp-3">
            Join our database of over 10,000+ stylists around the world so new
            clients can easily find you.
          </p>
          <div className="pt-10">
            <a
              href="https://hevxcdnqqzt.typeform.com/to/dPCDRkOk?typeform-source=curlysister.com"
              className="rounded-full bg-purple-100 w-44 px-6 py-4 text-white font-BeatriceSemiBold"
            >
              Get listed
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WaitList;
