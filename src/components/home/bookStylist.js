/* eslint-disable no-underscore-dangle */
/* eslint-disable import/order */
/* eslint-disable prefer-const */
/* eslint-disable react/function-component-definition */
import React from "react";
import { NonAuthRoutes, AuthRoutes } from "../../constants";
import { useNavigate } from "react-router-dom";
import ratingIcon from "../../assets/images/rating.svg";
import stylistAvatar from "../../assets/images/stylist-1.png";
import Image from "components/image";

const CommonCard = ({ stylist }) => {
  const splitName = (fullname) => {
    let name = fullname?.business_name;
    const firstName = name?.split(" ");
    return firstName && firstName[0];
  };
  const navigate = useNavigate();
  return (
    <div className="bg-white p-4 rounded-xl shadow-lg">
      <Image
        className="rounded-full h-20 w-20 object-cover"
        src={stylist.photo ? stylist.photo : stylistAvatar}
        alt="stylist"
      />
      <div className="flex my-3">
        <h5 className="text-lg capitalize text-gray-400 mr-3 font-BeatriceSemiBold">
          {stylist.business_name}
        </h5>
        <Image src={ratingIcon} alt="rating" />
      </div>
      <p className="text-gray-200 text-sm leading-6 line-clamp-7">
        {stylist.description}
      </p>
      <div className="mt-5 grid grid-cols-2 gap-3 w-full">
        <button
          onClick={() => {
            navigate(`/stylists/profile/${stylist._id}`);
          }}
          type="button"
          className="col-1 border text-sm border-gray-200 tracking-tight text-gray-400 font-BeatriceSemiBold rounded-full py-2"
        >
          View profile
        </button>
        <button
          onClick={() => {
            navigate(AuthRoutes.bookedStylistProfile);
          }}
          type="button"
          className="col-1 whitespace-nowrap px-2 text-white tracking-tight overflow-hidden line-clamp-1 text-sm border bg-gray-400 border-gray-200 font-BeatriceSemiBold rounded-full py-2"
        >
          Book {splitName(stylist)}
        </button>
      </div>
    </div>
  );
};
function BookStylist({ getStylist }) {
  const navigate = useNavigate();

  return (
    <div className="py-6 px-4 md:py-20 md:px-10 bg-gray-50 ">
      <div className="grid grid-cols-12 w-full items-center gap-2">
        <h5 className="col-span-8 md:col-span-4 uppercase text-xs md:text-base text-gray-300">
          get help from the experts
        </h5>
        <hr className="border border-orange-100 col-span-4 md:col-span-8 mt-3" />
      </div>

      <div className="flex justify-between md:items-center mt-2 md:mt-5 flex-col md:flex-row">
        <h2 className="text-2xl mb-3 md:text-4xl text-gray-400 font-bold font-GTSuperTextBlack">
          Book a stylist
        </h2>
        <p className="text-gray-200 text-sm md:text-lg leading-6 md:leading-7 md:w-2/3">
          We have stylists that are <strong>masters of their craft</strong> and
          are ready to teach you in the art of mastering your waves and curls.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 md:mt-12">
        {[...getStylist].splice(0, 3).map((item) => {
          return <CommonCard key={item._id} stylist={item} />;
        })}
      </div>
      <div className="mt-10 md:mt-12 flex justify-center items-center">
        <button
          type="button"
          onClick={() => navigate(NonAuthRoutes.stylists)}
          className="text-white border bg-purple-100 border-gray-200 font-BeatriceSemiBold w-44  rounded-full py-2"
        >
          Find more
        </button>
      </div>
    </div>
  );
}

export default BookStylist;
