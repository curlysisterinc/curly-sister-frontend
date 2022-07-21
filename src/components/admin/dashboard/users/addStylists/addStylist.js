/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { createContext, useEffect, useReducer, useState } from "react";
import SideBarComponent from "../../../../sidebar/sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import dropdownIcon from "../../../../../assets/images/dropdown.svg";
import backArrow from "../../../../../assets/images/back-arrow.svg";
import clsx from "clsx";
// import { phoneNumberCountries } from "../data";
import AvailabilityTab from "./availability";
import GalleryTab from "./gallery";
import ServicesTab from "./services";
import CertificateAndTags from "./certificateAndTags";
import LocationAndContact from "./locationAndContact";
import DetailsTab from "./details";
import admin from "../../../../../api/admin";
import StylistCategory from "../../../../customdropdown/dashboard/stylist/stylistcategory";
import ActiveStylist from "../../../../customdropdown/dashboard/stylist/activestylist";
import reducer, { initialState } from "./availablity";
import {
  activeTabInitials,
  certificateInitials,
  detailsInitial,
  galleryInitials,
  locationInitials,
  openTabInitials,
  serviceInitials,
} from "./helper";

export const PersistUserContext = createContext(null);

function AddStylist() {
  const [hiddenTabs, setHiddenTabs] = useState(false);
  const [prevOpenedTab, setPrevOpenedTab] = useState("");
  const [openTab, setOpenTab] = useState(openTabInitials);
  const [activeTab, setActiveTab] = useState(activeTabInitials);
  const [detailActionBtn, setDetailActionBtn] = useState("Save");
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [stylistValues, setStylistValues] = useState(detailsInitial);
  const [stylistLocation, setStylistLocation] = useState(locationInitials);
  const [stylistCert, setStylistCert] = useState(certificateInitials);
  const [stylistServices, setStylistServices] = useState(serviceInitials);
  const [stylistAvailability, dispatch] = useReducer(reducer, initialState);
  const [stylistGallery, setStylistGallery] = useState(galleryInitials);
  const [userApiResponse, setUserApiResponse] = useState({});
  const navigate = useNavigate();
  const { state } = useLocation();

  const toggletab = (e) => {
    const { name } = e.target;
    if (Object.keys(openTab).includes(name)) {
      if (prevOpenedTab !== name) {
        setOpenTab((prev) => ({
          ...prev,
          [name]: !prev[name],
          [prevOpenedTab]: false,
        }));
        setPrevOpenedTab(name);
      }
      if (prevOpenedTab === name) {
        setPrevOpenedTab("");
        setOpenTab((prev) => ({
          ...prev,
          [name]: !prev[name],
          [prevOpenedTab]: false,
        }));
      }
    }
  };

  useEffect(() => {
    const stylist = localStorage.getItem("createdStylist");
    if (stylist !== null) {
      console.log(stylist);
      // in a situation user refresh's the add stylist while filling the form
      // make api call to what current user has updated
    }

    // this handles data gotten from stylist row
    if (state?._id) {
      const { active, address, certifications, description, email } = state;
      const { facebook, instagram, license_board, license_number } = state;
      const { phone_no, photo, services, stylist_name } = state;
      const { tags, website, zipcode, _id, availability, gallery } = state;
      localStorage.setItem("createdStylist", _id);
      if (availability.length > 0) {
        dispatch({ type: "CLEAR_INITIAL_BLOCK" });
        dispatch({ type: "CLEAR_INITIAL_RANGE" });
        availability.forEach(({ blocked_dates, range }) => {
          blocked_dates.forEach(({ endDate, startDate }) => {
            dispatch({
              type: "ADD_BLOCK",
              payload: [
                Math.floor(Math.random() * 10000),
                {
                  start: new Date(startDate),
                  end: new Date(endDate),
                  key: "selection",
                },
              ],
            });
          });
          range.forEach(({ days, time_range }) => {
            dispatch({
              type: "ADD_OLD_RANGE",
              payload: { olddays: days, oldtimes: time_range },
            });
          });
        });
      }

      gallery.forEach((picture) => {
        setStylistGallery((prev) => ({
          ...prev,
          preview: [
            ...prev.preview,
            { img: picture, name: picture.substring(picture.length - 10) },
          ],
          update: {
            ...prev.update,
            gallery: [...prev.update.gallery, picture],
          },
        }));
      });
      // setStylistGallery((prev ))
      setStylistValues((prev) => ({
        ...prev,
        active,
        description,
        license_board,
        license_number,
        photo,
        stylist_name,
        categoryType: `${
          availability.length > 0 || services.length > 0
            ? "curly sister stylist"
            : "walk-in only"
        }`,
      }));
      setStylistLocation({
        address,
        email,
        facebook,
        id: _id,
        instagram,
        phone_no,
        website,
        zipcode,
      });
      setStylistCert({ certifications, tags, id: _id });
      setStylistServices({ id: _id, services });
      setDetailActionBtn("Edit");
      if (services.length > 0 || availability.length > 0) {
        setHiddenTabs(true);
      }
      const keys = Object.keys(openTab);
      keys.forEach((itm) => {
        setOpenTab((prev) => ({ ...prev, [itm]: true }));
        setActiveTab((prev) => ({ ...prev, [itm]: true }));
      });
      // openTab, setOpenTab
    }
    return () => {
      localStorage.removeItem("createdStylist");
    };
  }, []);
  // console.log(state);

  const backBtnHandler = () => {
    navigate(-1);
  };

  const handlePresist = () => {
    const id = localStorage.getItem("createdStylist");
    if (id !== null) {
      setIsDetailsLoading(true);
      const update = JSON.stringify({ id });
      admin
        .UpdateStylist(update)
        .then((res) => {
          console.log(res.data, "updating stylist");
          setUserApiResponse(res.data.stylist);
          setDetailActionBtn("Edit");
          setIsDetailsLoading(false);
        })
        .catch((err) => console.log(err, "error updating stylist"));
    }
  };

  const handleUpdateStyistDetail = () => {
    const id = localStorage.getItem("createdStylist");
    if (id !== null) {
      setIsDetailsLoading(true);
      console.log(id);
      const update = JSON.stringify({ ...stylistValues, id });
      admin
        .UpdateStylist(update)
        .then((res) => {
          console.log(res.data, "updating stylist");
          setUserApiResponse(res.data.stylist);
          setDetailActionBtn("Edit");
          setIsDetailsLoading(false);
        })
        .catch((err) => console.log(err, "error updating stylist"));
    }
  };

  const handleCreateStylist = () => {
    setIsDetailsLoading(true);
    admin
      .CreateStylist(stylistValues)
      .then((res) => {
        console.log(res.data.stylist, "response after creating stylist");
        setDetailActionBtn("Edit");
        localStorage.setItem("createdStylist", res.data.stylist._id);
        setActiveTab((prev) => ({ ...prev, locationTab: true }));
        setIsDetailsLoading(false);
      })
      .catch((err) => console.log(err, "error creating stylist"));
  };

  return (
    <div className="max-w-screen-2xl w-full flex m-auto border border-gray-50">
      <SideBarComponent active="dashboard" isLoggedIn />
      <div className="ml-80 bg-white px-10 py-14 w-full">
        <div className="flex items-start ">
          <div
            className="flex items-center cursor-pointer"
            onClick={backBtnHandler}
          >
            <img className="mr-2" src={backArrow} alt="back arrow" />
            Go Back
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            autoComplete="off"
            className="ml-28 w-4/6 "
          >
            <PersistUserContext.Provider
              // eslint-disable-next-line
              value={[userApiResponse, handlePresist, setActiveTab, setOpenTab]}
            >
              <div className=" flex justify-between items-center">
                <div className="text-22 text-gray-400 font-BeatriceSemiBold">
                  Add stylist
                </div>
                <div className="flex">
                  <StylistCategory
                    setTypeValue={setStylistValues}
                    typeValue={stylistValues.categoryType}
                    setHiddenTabs={setHiddenTabs}
                    detailActionBtn={detailActionBtn}
                  />
                  <ActiveStylist
                    bool={stylistValues.active}
                    setBool={setStylistValues}
                    detailActionBtn={detailActionBtn}
                  />
                </div>
              </div>

              <hr className="mb-5 mt-5 border-b border-gray-600  mx-auto" />
              {/* accordion */}
              {/* details */}
              <div className="mx-auto w-full mt-8">
                <button
                  aria-controls="content-details"
                  aria-expanded={openTab.detailsTab.toString()}
                  id="accordion-details"
                  name="detailsTab"
                  onClick={toggletab}
                  disabled={activeTab.detailsTab ? false : true}
                  className="bg-gray-600 p-3 rounded-lg flex justify-between items-center w-full cursor-pointer"
                >
                  Details
                  <img
                    className={clsx(
                      openTab.detailsTab && "transform rotate-180",
                      "ml-12 "
                    )}
                    src={dropdownIcon}
                    alt=""
                  />
                </button>
                {openTab.detailsTab && (
                  <DetailsTab
                    buttonAction={detailActionBtn}
                    setButtonAction={setDetailActionBtn}
                    handleUpdateStyistDetail={handleUpdateStyistDetail}
                    handleCreateStylist={handleCreateStylist}
                    stylistValues={stylistValues}
                    isloading={isDetailsLoading}
                    setStylistValues={setStylistValues}
                    ariaHidden={!openTab.detailsTab.toString()}
                    idx="content-details"
                  />
                )}
              </div>
              {/* location and contact */}
              <div className="mx-auto w-full mt-8">
                <button
                  aria-controls="content-location"
                  aria-expanded={openTab.locationTab.toString()}
                  id="accordion-location"
                  name="locationTab"
                  onClick={toggletab}
                  disabled={activeTab.locationTab ? false : true}
                  className={`bg-gray-600 p-3 rounded-lg flex justify-between items-center w-full cursor-pointer ${
                    activeTab.locationTab ? "opacity-100" : "opacity-60"
                  }`}
                >
                  Location and contact
                  <img
                    className={clsx(
                      openTab.locationTab && "transform rotate-180",
                      "ml-12 "
                    )}
                    src={dropdownIcon}
                    alt=""
                  />
                </button>
                {openTab.locationTab && (
                  <LocationAndContact
                    setActiveTab={setActiveTab}
                    ariaHidden={!openTab.locationTab.toString()}
                    idx="content-location"
                    setStylistValues={setStylistLocation}
                    stylistValues={stylistLocation}
                  />
                )}
              </div>
              {/* certification and tag */}
              <div className="mx-auto w-full mt-8">
                <button
                  aria-controls="content-certification"
                  aria-expanded={openTab.certifificationTab.toString()}
                  id="accordion-certification"
                  name="certifificationTab"
                  onClick={toggletab}
                  disabled={activeTab.certifificationTab ? false : true}
                  className={`bg-gray-600 p-3 rounded-lg flex justify-between items-center w-full cursor-pointer ${
                    activeTab.certifificationTab ? "opacity-100" : "opacity-60"
                  }`}
                >
                  Certification and tags
                  <img
                    className={clsx(
                      openTab.certifificationTab && "transform rotate-180",
                      "ml-12 "
                    )}
                    src={dropdownIcon}
                    alt=""
                  />
                </button>
                {openTab.certifificationTab && (
                  <CertificateAndTags
                    hiddenTabs={hiddenTabs}
                    setActiveTab={setActiveTab}
                    ariaHidden={!openTab.certifificationTab.toString()}
                    idx="content-certification"
                    setStylistValues={setStylistCert}
                    stylistValues={stylistCert}
                  />
                )}
              </div>
              {hiddenTabs && (
                <>
                  {/* services and pricing */}
                  <div className="mx-auto w-full mt-8">
                    <button
                      aria-controls="content-service"
                      aria-expanded={openTab.serviceTab.toString()}
                      id="accordion-service"
                      name="serviceTab"
                      onClick={toggletab}
                      disabled={activeTab.serviceTab ? false : true}
                      className={`bg-gray-600 p-3 rounded-lg flex justify-between items-center w-full cursor-pointer ${
                        activeTab.serviceTab ? "opacity-100" : "opacity-60"
                      }`}
                    >
                      Services and pricing
                      <img
                        className={clsx(
                          openTab.serviceTab && "transform rotate-180",
                          "ml-12 "
                        )}
                        src={dropdownIcon}
                        alt=""
                      />
                    </button>
                    {openTab.serviceTab && (
                      <ServicesTab
                        setActiveTab={setActiveTab}
                        ariaHidden={!openTab.serviceTab.toString()}
                        idx="content-service"
                        setStylistValues={setStylistServices}
                        stylistValues={stylistServices}
                      />
                    )}
                  </div>
                  {/* availability */}
                  <div className="mx-auto w-full mt-8">
                    <button
                      aria-controls="content-availability"
                      aria-expanded={openTab.availabilityTab.toString()}
                      id="accordion-availability"
                      name="availabilityTab"
                      onClick={toggletab}
                      disabled={activeTab.availabilityTab ? false : true}
                      className={`bg-gray-600 p-3 rounded-lg flex justify-between items-center w-full cursor-pointer ${
                        activeTab.availabilityTab ? "opacity-100" : "opacity-60"
                      }`}
                    >
                      Availability
                      <img
                        className={clsx(
                          openTab.availabilityTab && "transform rotate-180",
                          "ml-12 "
                        )}
                        src={dropdownIcon}
                        alt=""
                      />
                    </button>
                    {openTab.availabilityTab && (
                      <div className="">
                        <AvailabilityTab
                          setActiveTab={setActiveTab}
                          ariaHidden={!openTab.availabilityTab.toString()}
                          idx="content-availability"
                          state={stylistAvailability}
                          dispatch={dispatch}
                        />
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* gallery */}
              <div className="mx-auto w-full mt-8">
                <button
                  aria-controls="content-gallery"
                  aria-expanded={openTab.galleryTab.toString()}
                  id="accordion-gallery"
                  name="galleryTab"
                  onClick={toggletab}
                  disabled={activeTab.galleryTab ? false : true}
                  className={`bg-gray-600 p-3 rounded-lg flex justify-between items-center w-full cursor-pointer ${
                    activeTab.galleryTab ? "opacity-100" : "opacity-60"
                  }`}
                >
                  Gallery
                  <img
                    className={clsx(
                      openTab.galleryTab && "transform rotate-180",
                      "ml-12 "
                    )}
                    src={dropdownIcon}
                    alt=""
                  />
                </button>
                {openTab.galleryTab && (
                  <GalleryTab
                    ariaHidden={!openTab.galleryTab.toString()}
                    idx="content-gallery"
                    data={stylistGallery}
                    setData={setStylistGallery}
                  />
                )}
              </div>
            </PersistUserContext.Provider>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddStylist;
