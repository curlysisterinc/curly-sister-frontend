/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-cycle */
/* eslint-disable import/order */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable react/function-component-definition */
import React from "react";
import {
  MdArrowForwardIos,
  MdOutlineBookmark,
  MdOutlineMail,
} from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { HiOutlineLocationMarker, HiOutlinePhotograph } from "react-icons/hi";
import { BsTelephone } from "react-icons/bs";
import { ImFacebook2 } from "react-icons/im";
import { FiInstagram } from "react-icons/fi";
import { RiGlobalLine } from "react-icons/ri";
import { AiTwotoneStar } from "react-icons/ai";
import SideBarComponent from "../../../sidebar/sidebar";
import avatar from "../../../../assets/images/gradient-avatar.svg";
import galleryBanner from "../../../../assets/images/stylist-profile-banner.png";
import Reviews from "../reviews";
import { useNavigate, useParams } from "react-router-dom";
import { AuthRoutes } from "constants";
import admin from "../../../../api/admin";
import Services from "./Services";
import Certifications from "./Certifications";
import Tags from "./Tags";
import Slider from "react-slick";
import { BookServiceCard } from "../bookedStylist";
import GalleryModal from "./galleryModal";

const NotBookServiceCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-xl h-auto w-auto">
      <div className="p-6 flex flex-col space-y-3">
        <div className="flex items-center space-x-3">
          <HiOutlineLocationMarker color="#443C4D" />
          <p className="text-sm text-gray-400">
            333, Fremont Street, SF, CA (12km)
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <BsTelephone color="#443C4D" />
          <p className="text-sm text-gray-400">(636) 763-9867</p>
        </div>
        <div className="flex items-center space-x-3">
          <MdOutlineMail color="#443C4D" />
          <p className="text-sm text-gray-400">hello@allnaturals.com</p>
        </div>
      </div>
      <div className="px-6 py-3 flex justify-between items-center">
        <div className="flex space-x-5">
          <ImFacebook2 color="#443C4D" size={22} />
          <FiInstagram color="#443C4D" size={22} />
          <RiGlobalLine color="#443C4D" size={22} />
        </div>
        <span className="rounded-full p-2 bg-gray-200 opacity-80 w-8 h-8 flex justify-center items-center">
          <MdOutlineBookmark color="white" size={26} />
        </span>
      </div>
    </div>
  );
};
function StylistProfile() {
  const [hasReview, setHasReview] = React.useState(true);
  const [getGallery, setGetGallery] = React.useState([]);
  const [bookedService, setBookedService] = React.useState(false);
  const [galleryVisible, setGalleryVisible] = React.useState(false);
  const [getStylist, setGetStylist] = React.useState({});
  const navigate = useNavigate();
  const { token } = useParams();

  React.useEffect(() => {
    admin.GetOneStylist(token).then((response) => {
      console.log(response.data);
      setGetStylist(response.data.stylist);
      setGetGallery(response.data.stylist.gallery);
    });
  }, []);

  const sliders = () => {
    return getGallery.map((gallery) => {
      return (
        <div key={gallery} className=" px-2 overflow-hidden w-1/2 h-80">
          <img
            src={gallery}
            alt=""
            className="rounded-lg w-full h-full object-cover"
          />
        </div>
      );
    });
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2.2,
    slidesToScroll: 2.5,
  };
  return (
    <div className="max-w-screen-2xl w-full flex m-auto border border-gray-50">
      <SideBarComponent active="stylist" />
      <div className="ml-80 bg-white px-0 pt-4 pb-10 w-full min-h-screen ">
        <div
          className="flex space-x-0 items-center cursor-pointer pt-4  px-6 mb-6"
          onClick={() => navigate(-1)}
        >
          <IoIosArrowBack />
          <p className="text-sm font-AvenirLTPro-Heavy text-gray-400 uppercase">
            GO Back
          </p>
        </div>
        <div className="  mt-5 ">
          <div className=" book-stylist">
            <div
              onClick={() => setGalleryVisible(true)}
              className="absolute z-40 right-10 top-10 bg-white p-1 rounded-lg flex items-center space-x-1 cursor-pointer"
            >
              <HiOutlinePhotograph color="black" size={20} />
              <p className="text-sm text-gray-400">View gallery</p>
            </div>
            {getStylist?.gallery?.length > 0 ? (
              <>
                {getStylist?.gallery?.length > 2 && (
                  <div className="flex flex-nowrap overflow-x-auto px-8">
                    {sliders()}
                  </div>
                )}
              </>
            ) : (
              <img
                src={galleryBanner}
                alt=""
                className="w-full h-80 object-cover"
              />
            )}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 relative z-30 justify-between px-16 -mt-14">
          <div className="col-span-8">
            <div className="flex justify-between items-end">
              <img
                className="w-20 h-20 rounded-full"
                src={getStylist.photo ? getStylist.photo : avatar}
                alt=""
              />
              <div className="flex  space-x-2">
                <AiTwotoneStar color="#590BA9" />
                <span className="text-sm font-BeatriceMedium">
                  4.89{" "}
                  <span className="text-slate-400 text-xs font-BeatriceRegular text-gray-200">
                    (12 reviews)
                  </span>
                </span>
              </div>
            </div>
            <div className="flex flex-col space-y-3 mt-4">
              <p className="text-base font-BeatriceSemiBold text-gray-400">
                {getStylist.stylist_name}
              </p>
              <p className="text-sm text-gray-400">{getStylist.description}</p>
            </div>
            <div className="mt-8 flex flex-col space-y-8">
              <Certifications getStylist={getStylist} />
              <Services getStylist={getStylist} />
              <Tags getStylist={getStylist} />
              <div className="">
                <p className="text-base text-gray-400 mb-5">Reviews</p>
                {hasReview ? <Reviews /> : <p>No reviews yet</p>}
              </div>
            </div>
          </div>
          <div className="col-span-4 content-end  h-auto relative z-30">
            {getStylist?.services?.length > 0 ? (
              <BookServiceCard />
            ) : (
              <NotBookServiceCard />
            )}
          </div>
        </div>
      </div>
      <GalleryModal visible={galleryVisible} setVisible={setGalleryVisible} />
    </div>
  );
}

export default StylistProfile;