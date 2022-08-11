/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable object-shorthand */
/* eslint-disable func-names */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-useless-fragment */
import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Slider from "react-slick";
import profilePix1 from "../../../../assets/images/stylist-profile1.png";
import profilePix2 from "../../../../assets/images/stylist-profile2.png";
import profilePix3 from "../../../../assets/images/stylist-profile3.png";
import profilePix4 from "../../../../assets/images/stylist-place-1.png";
import profilePix5 from "../../../../assets/images/stylist-place-2.png";
import "./gallery.css";

const data = [profilePix1, profilePix2, profilePix3, profilePix4, profilePix5];

function GalleryModal({ visible, setVisible }) {
  const closeModal = () => {
    setVisible(false);
  };
  const settings = {
    customPaging: function (i) {
      return (
        <div className="">
          <img
            src={data[i]}
            alt=""
            // style={{ width: "112px", height: "64px" }}
            className=" object-cover rounded-lg m-0 w-full h-16"
          />
        </div>
      );
    },
    dots: true,
    dotsClass: "slick-dots custom-indicator",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    initialSlide: 2,
    slidesToScroll: 1,
    // autoplaySpeed: 1000,
    // autoplay: true,
  };
  return (
    <>
      {visible ? (
        <div className="flex backdrop-blur-lg bg-gray-500 h-screen bg-opacity-75 items-start justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto md:my-6 mx-auto md:max-w-2xl h-full md:h-auto pt-6">
            <div className="flex justify-center items-center mb-3">
              <AiOutlineCloseCircle onClick={closeModal} size={24} />
            </div>

            <div className=" h-full relative  w-full outline-none ">
              <div className=" w-full">
                <Slider {...settings}>
                  {data.map((item) => {
                    return (
                      <div className="">
                        <img
                          src={item}
                          alt=""
                          className="w-full h-96 object-cover rounded-lg"
                        />
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default GalleryModal;
