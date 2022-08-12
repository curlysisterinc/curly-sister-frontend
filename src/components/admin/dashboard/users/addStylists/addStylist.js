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
import React, { createContext, useEffect, useState } from "react";
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
import { activeTabInitials, detailsInitial, openTabInitials } from "./helper";

// export const PersistUserContext = createContext(null);

export const PersistUserContext = createContext({});

function AddStylist() {
  const [hiddenTabs, setHiddenTabs] = useState(false);
  const [prevOpenedTab, setPrevOpenedTab] = useState("");
  const [openTab, setOpenTab] = useState(openTabInitials);
  const [activeTab, setActiveTab] = useState(activeTabInitials);
  const [detailActionBtn, setDetailActionBtn] = useState("Save");
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [stylistValues, setStylistValues] = useState(detailsInitial);
  // const [userApiResponse, setUserApiResponse] = useState({});
  const navigate = useNavigate();
  const { state } = useLocation();
  const stylist = localStorage.getItem("createdStylist");

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
    if (state) {
      console.log(state);
      if (state !== "walk-in only") {
        setHiddenTabs(true);
      }
      const keys = Object.keys(openTab);
      keys.forEach((itm) => {
        setOpenTab((prev) => ({ ...prev, [itm]: true }));
        setActiveTab((prev) => ({ ...prev, [itm]: true }));
      });
      admin
        .GetStylistById(stylist)
        .then((res) => {
          console.log(res.data.stylist, "stylistbyid");
          const {
            description,
            license_board,
            license_number,
            photo,
            stylist_name,
          } = res.data.stylist;
          const { active, category_type } = res.data.stylist;

          setStylistValues((prev) => ({
            ...prev,
            active,
            description,
            license_board,
            license_number,
            photo,
            stylist_name,
            category_type,
          }));

          // setStylistServices({ id: _id, services });
          setDetailActionBtn("Edit");
          console.log("changed to edit");
        })
        .catch((error) => console.log(error));
    }

    return () => {
      // localStorage.removeItem("createdStylist");
    };
  }, []);

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
          // setUserApiResponse(res.data.stylist);
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
        console.log("changed details btn to edit");
        localStorage.setItem("createdStylist", res.data.stylist._id);
        setActiveTab((prev) => ({ ...prev, locationTab: true }));
        setIsDetailsLoading(false);
      })
      .catch((err) => console.log(err, "error creating stylist"));
  };

  return (
    <div className="ml-80 bg-white px-10 py-14 w-full relative">
      <header className="fixed z-10 top-0 right-0 bg-white left-80 pt-7">
        <button
          onClick={backBtnHandler}
          type="button"
          className=" absolute  left-10 flex items-center cursor-pointer mr-[103px]"
        >
          <img className="mr-2" src={backArrow} alt="back arrow" />
          Go Back
        </button>
        <div className="w-4/6 border-b border-solid border-gray-600 pb-7  mx-auto flex justify-between items-center">
          <div className="text-22 text-gray-400 font-BeatriceSemiBold">
            Add stylist
          </div>
          <div className="flex">
            <StylistCategory
              setTypeValue={setStylistValues}
              typeValue={stylistValues.category_type}
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
      </header>

      <div className="mx-auto w-4/6 pt-3.5">
        {/* <PersistUserContext.Provider
            // eslint-disable-next-line
            value={[userApiResponse, handlePresist, setActiveTab, setOpenTab]}
          > */}
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
            />
          )}
        </div>
        {/* </PersistUserContext.Provider> */}
      </div>
      {/* </div> */}
    </div>
  );
}

export default AddStylist;
