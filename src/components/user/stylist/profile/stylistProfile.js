/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from "react";
import { MdOutlineBookmark, MdOutlineMail } from "react-icons/md";
import { HiOutlineLocationMarker, HiOutlinePhotograph } from "react-icons/hi";
import { BsTelephone } from "react-icons/bs";
import { ImFacebook2 } from "react-icons/im";
import { FiInstagram } from "react-icons/fi";
import { RiGlobalLine } from "react-icons/ri";
import { AiTwotoneStar } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import useGetStylistById from "hooks/data/admin/useGetStylistById";
import useGetAvailabilityById from "hooks/data/admin/useGetAvailabilityById";
import avatar from "../../../../assets/images/gradient-avatar.svg";
import galleryBanner from "../../../../assets/images/stylist-profile-banner.png";
import Reviews from "../reviews";
import admin from "../../../../api/admin";
import Services from "./Services";
import Certifications from "./Certifications";
import Tags from "./Tags";
import { BookServiceCard } from "../BookServiceCard";
import GalleryModal from "./galleryModal";
import { ReactComponent as VerifyIcon } from "../../../../assets/images/verify.svg";

function NotBookServiceCard({ ...props }) {
  return (
    <div className="bg-white rounded-lg shadow-xl h-auto w-auto">
      <div className="p-6 flex flex-col space-y-3">
        {props?.address && (
          <div className="flex items-center space-x-3">
            <HiOutlineLocationMarker color="#443C4D" />
            <p className="text-sm text-gray-400">{props.address}</p>
          </div>
        )}
        {props?.phone_no && (
          <div className="flex items-center space-x-3">
            <BsTelephone color="#443C4D" />
            <p className="text-sm text-gray-400">{props?.phone_no}</p>
          </div>
        )}
        {props?.email && (
          <div className="flex items-center space-x-3">
            <MdOutlineMail color="#443C4D" />
            <p className="text-sm text-gray-400">{props.email}</p>
          </div>
        )}
      </div>
      <div className="px-6 py-3 flex justify-between items-center">
        <div className="flex space-x-5">
          {props.facebook && (
            <a
              href={`https://${props.facebook.replace("https://")}`}
              target="_blank"
              aria-describedby="users facebook account"
              rel="noreferrer"
            >
              <ImFacebook2 color="#443C4D" size={22} />
            </a>
          )}

          {props.instagram && (
            <a
              href={`https://${props.instagram.replace("https://")}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-describedby="users instagram account"
            >
              <FiInstagram color="#443C4D" size={22} />
            </a>
          )}

          {props.website && (
            <a
              href={`https://${props.website.replace("https://")}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-describedby="users website account"
            >
              <RiGlobalLine color="#443C4D" size={22} />
            </a>
          )}
        </div>
        <span className="rounded-full p-2 bg-gray-200 opacity-80 w-8 h-8 flex justify-center items-center">
          <MdOutlineBookmark color="white" size={26} />
        </span>
      </div>
    </div>
  );
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      // className="block z-50 left-3"
      style={{ ...style, display: "block", background: "red", zIndex: "30000" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      // className="block z-50 left-5"
      style={{
        ...style,
        display: "block",
        background: "green",
        zIndex: "30000",
      }}
      onClick={onClick}
    />
  );
}
function StylistProfile() {
  const [hasReview, setHasReview] = React.useState(true);
  const [bookedService, setBookedService] = React.useState(false);
  const [avail, setAvail] = React.useState({});
  const [galleryVisible, setGalleryVisible] = React.useState(false);
  const [getStylist, setGetStylist] = React.useState({});
  const navigate = useNavigate();
  const { token } = useParams();

  const {
    isLoading: isStylistLoading,
    data: stylistData,
    isError: stylistError,
  } = useGetStylistById(token);

  const {
    isLoading: isAvailabilityLoading,
    data: availabilityData,
    isError: availabilityError,
    refetch: availabilityRefetch,
  } = useGetAvailabilityById(stylistData?.data?.stylist?.availability[0]);

  React.useEffect(() => {
    if (stylistData) {
      setGetStylist(stylistData.data.stylist);
    }
  }, [stylistData]);

  React.useEffect(() => {
    const ac = new AbortController();
    if (availabilityData) {
      setAvail(availabilityData.data.data);
    }
    return function cleanup() {
      ac.abort();
    };
  }, [availabilityData]);

  const settings = useCallback(
    (length = 1) => {
      return {
        dots: false,
        speed: 500,
        slidesToShow: (() => {
          if (length > 3) {
            return 3;
          }
          if (length === 0) {
            return 1;
          }
          if (length <= 3 && length > 1) {
            return length - 0.5;
          }
          return length;
        })(),
        focusOnSelect: true,
        initialSlide: 0,
        slidesToScroll: 1,
        lazyLoad: true,
        centerPadding: "60px",
        nextArrow: null,
        prevArrow: null,
        responsive: [
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1.07,
              slidesToScroll: 1,
            },
          },
        ],
      };
    },
    [stylistData]
  );

  return (
    <div className="max-w-screen-2xl w-full flex m-auto">
      <div className="bg-white px-0 pt-16 md:pt-4 pb-10 w-full min-h-screen ">
        <div className="  mt-5 ">
          <div className="relative  book-stylist w-full">
            {getStylist?.gallery?.length > 2 && (
              <button
                type="button"
                onClick={() => setGalleryVisible(true)}
                className="absolute z-40 right-10  top-3 md:top-5 bg-white p-1 rounded-lg flex items-center  cursor-pointer viewButton"
              >
                <HiOutlinePhotograph color="black" size={20} />
                <p className="text-sm text-gray-400 ml-1">View gallery</p>
              </button>
            )}

            <div className=" relative w-full outline-none h-44 md:h-80">
              <div className="h-full w-full">
                <Slider {...settings(getStylist?.gallery?.length)}>
                  {getStylist?.gallery?.length === 0 ? (
                    <div className="w-full h-44 md:h-80  object-cover rounded-lg">
                      <img
                        src={galleryBanner}
                        alt=""
                        className="w-full h-80 object-cover "
                      />
                    </div>
                  ) : (
                    getStylist?.gallery?.map((item) => {
                      return (
                        <div className="w-full h-44 md:h-80  object-cover rounded-lg">
                          <img
                            src={item}
                            alt=""
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                      );
                    })
                  )}
                </Slider>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto relative md:px-5">
          <div className="grid z-30  p-5  md:mr-250 lg:mr-350 md:pr-50 md:pl-0 mt-0 md:-mt-14">
            <div className="flex w-full justify-between flex-wrap">
              <div className="w-full">
                <div className="flex justify-between items-center">
                  <img
                    className=" w-20 h-20 rounded-full object-cover"
                    src={getStylist.photo ? getStylist.photo : avatar}
                    alt=""
                  />
                  <div className="flex space-x-2 md:self-end">
                    <AiTwotoneStar color="#590BA9" />
                    <span className="text-sm font-BeatriceMedium">
                      4.89{" "}
                      <span className="text-slate-400 text-xs font-BeatriceRegular ">
                        (12 reviews)
                      </span>
                    </span>
                  </div>
                </div>
                <div className="flex flex-col mt-4">
                  <p className="text-2xl font-BeatriceSemiBold text-gray-400 flex items-center">
                    {getStylist.stylist_name}{" "}
                    <span className="ml-2">
                      <VerifyIcon />
                    </span>
                  </p>
                  <p className="text-base text-gray-200">
                    {getStylist.description}
                  </p>
                </div>
              </div>

              <div className="col-span-12 md:col-span-4 content-end  h-auto  right-5 md:absolute md:mr-5 w-full z-30 max-w-358 md:max-w-250 lg:max-w-358 mt-5">
                {getStylist?.services?.length > 0 ? (
                  <BookServiceCard
                    stylistId={getStylist._id}
                    availability={avail}
                    serviceOffered={getStylist?.services}
                    {...getStylist}
                  />
                ) : (
                  <NotBookServiceCard {...getStylist} />
                )}
              </div>
            </div>

            <div className="mt-8 flex flex-col space-y-10">
              <Certifications getStylist={getStylist} />
              <Services getStylist={getStylist} />
              <Tags getStylist={getStylist} />
              <div className="">
                <p className="text-base text-gray-400 mb-5">Reviews</p>
                {hasReview ? <Reviews /> : <p>No reviews yet</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <GalleryModal
        visible={galleryVisible}
        setVisible={setGalleryVisible}
        gallery={getStylist.gallery}
      />
    </div>
  );
}

export default StylistProfile;
