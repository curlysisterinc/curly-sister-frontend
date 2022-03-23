import React from "react";
import stylist1 from "../../assets/images/stylist-1.png";
import stylist2 from "../../assets/images/stylist-2.png";
import stylist3 from "../../assets/images/stylist-3.png";
import ratingIcon from "../../assets/images/rating.svg";

function BookStylist() {
  return (
    <div className="py-20 px-10 bg-gray-50">
      <div className="flex items-center justify-between w-full">
        <h5 className="w-1/4 uppercase text-base text-gray-300">
          get help from the experts
        </h5>
        <hr className="border border-orange-100 w-3/4" />
      </div>

      <div className="flex justify-between items-center mt-5">
        <h2 className="text-4xl text-gray-400 font-bold">Book a stylist</h2>
        <p className="text-gray-200 text-lg leading-7 w-1/2">
          We have stylists that are <strong>masters of their craft</strong> and
          are ready to teach you in the art of mastering your waves and curls.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-10 mt-12">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <img src={stylist1} alt="stylist" />
          <div className="flex my-3">
            <h5 className="text-lg text-gray-400 font-semibold mr-3">
              Leo Curls
            </h5>
            <img src={ratingIcon} alt="rating" />
          </div>
          <p className="text-gray-200 text-sm leading-6">
            Leo is a Master Stylist who specializes in Wavy and Curly Hair! She
            works in Burbank, California, USA. Leo has over 20 years of
            experience and has a loyal clientele. She trained under Chaz Dean,
            the creator of Wen and has numerous curly certifications.
          </p>
          <div className="mt-5 flex justify-between items-center w-full">
            <button
              type="button"
              className="border border-gray-200 text-gray-400 font-semibold w-5/12 rounded-full py-2"
            >
              View profile
            </button>
            <button
              type="button"
              className="text-white border bg-gray-400 border-gray-200 font-semibold w-5/12 rounded-full py-2"
            >
              Book Leo
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <img src={stylist2} alt="stylist" />
          <div className="flex my-3">
            <h5 className="text-lg text-gray-400 font-semibold mr-3">
              Pitze Patze{" "}
            </h5>
            <img src={ratingIcon} alt="rating" />
          </div>
          <p className="text-gray-200 text-sm leading-6">
            Leo is a Master Stylist who specializes in Wavy and Curly Hair! She
            works in Burbank, California, USA. Leo has over 20 years of
            experience and has a loyal clientele. She trained under Chaz Dean,
            the creator of Wen and has numerous curly certifications.
          </p>
          <div className="mt-5 flex justify-between items-center w-full">
            <button
              type="button"
              className="border border-gray-200 text-gray-400 font-semibold w-5/12 rounded-full py-2"
            >
              View profile
            </button>
            <button
              type="button"
              className="text-white border bg-gray-400 border-gray-200 font-semibold w-5/12 rounded-full py-2"
            >
              Book Leo
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <img src={stylist3} alt="stylist" />

          <div className="flex my-3">
            <h5 className="text-lg text-gray-400 font-semibold mr-3">
              Allyn Antione Beauty{" "}
            </h5>
            <img src={ratingIcon} alt="rating" />
          </div>
          <p className="text-gray-200 text-sm leading-6">
            Leo is a Master Stylist who specializes in Wavy and Curly Hair! She
            works in Burbank, California, USA. Leo has over 20 years of
            experience and has a loyal clientele. She trained under Chaz Dean,
            the creator of Wen and has numerous curly certifications.
          </p>
          <div className="mt-5 flex justify-between items-center w-full">
            <button
              type="button"
              className="border border-gray-200 text-gray-400 font-semibold w-5/12 rounded-full py-2"
            >
              View profile
            </button>
            <button
              type="button"
              className="text-white border bg-gray-400 border-gray-200 font-semibold w-5/12 rounded-full py-2"
            >
              Book Leo
            </button>
          </div>
        </div>
      </div>
      <div className="mt-12 flex justify-center items-center">
        <button
          type="button"
          className="text-white border bg-purple-100 border-gray-200 font-semibold w-44  rounded-full py-2"
        >
          Find more
        </button>
      </div>
    </div>
  );
}

export default BookStylist;
