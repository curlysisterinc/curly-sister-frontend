import React, { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import backArrow from "../../../../../assets/images/back-arrow.svg";
import AvailabilityTab from "./availability";
import GalleryTab from "./gallery";
import ServicesTab from "./services";
import CertificateAndTags from "./certificateAndTags";
import LocationAndContact from "./locationAndContact";
import DetailsTab, { useDetailsTab } from "./details";
import admin from "../../../../../api/admin";
import StylistCategory from "../../../../customdropdown/dashboard/stylist/stylistcategory";
import ActiveStylist from "../../../../customdropdown/dashboard/stylist/activestylist";
import { activeTabInitials, detailsInitial, openTabInitials } from "./helper";
import { AccordionItem } from "../../../../accordion";

export const PersistUserContext = createContext({});

function StylistPage({ mode, stylistData, handleEditStylist, isLoading }) {
  const detailsTab = useDetailsTab();

  const [hiddenTabs, setHiddenTabs] = useState(false);
  const [openTab, setOpenTab] = useState(openTabInitials);
  const [activeTab, setActiveTab] = useState(null);
  const [detailActionBtn, setDetailActionBtn] = useState("Save");
  const [stylistValues, setStylistValues] = useState(detailsInitial);
  const [certTagId, setCertTagId] = useState(null);

  const navigate = useNavigate();
  const { state } = useLocation();
  useEffect(() => {
    if (mode === "EDIT") {
      setStylistValues({ ...stylistValues, ...stylistData });
    }
  }, [mode]);

  useEffect(() => {
    handleMountCertTag();
    return (
      window.location.search.includes("location") &&
      setActiveTab("Location and contact")
    );
  }, []);

  const handleMountCertTag = () => setCertTagId(uuidv4);

  const backBtnHandler = () => {
    // if(mode ==="EDIT")
    navigate("/dashboard/users/stylists");
  };

  const handleSetActiveTab = (tab) => {
    if (activeTab === tab) {
      setActiveTab(null);
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className="bg-white w-full ">
      <div className=" bg-white px-3 md:px-10 pb-8 w-full relative min-h-screen">
        <header className="sticky z-10 top-0 right-0 bg-white left-0 pt-20 md:pt-7">
          <button
            onClick={backBtnHandler}
            type="button"
            className=" absolute  left-0 md:left-10 flex items-center cursor-pointer mr-[103px] top-20 md:top-auto"
          >
            <img className="mr-2" src={backArrow} alt="back arrow" />
            Go Back
          </button>
          <div className="w-full max-w-640 border-b border-solid border-gray-600 pb-7 mt-7 md:mx-auto flex justify-center md:justify-between items-center flex-col lg:flex-row">
            <div className="text-22 text-gray-400 font-BeatriceSemiBold mb-3 md:mb-0">
              {mode === "EDIT" ? "Edit stylist" : "Add stylist"}
            </div>
            <div className="flex flex-wrap justify-center items-center gap-2">
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

        <div className="mx-auto w-full max-w-640 pt-2">
          <AccordionItem
            handleClickItem={handleSetActiveTab}
            title="Details"
            isOpen={activeTab === "Details"}
          >
            {detailsTab.renderDetails({
              isOpen: false,
              isLoading,
              stylistData,
              mode,
              handleEditStylist,
              activeTab,
            })}
          </AccordionItem>

          {/* location and contact */}
          <AccordionItem
            disabled={mode === "ADD"}
            handleClickItem={handleSetActiveTab}
            title="Location and contact"
            isOpen={activeTab === "Location and contact"}
          >
            <LocationAndContact
              activeTab={activeTab}
              ariaHidden={!openTab.locationTab.toString()}
              idx="content-location"
              stylistData={stylistData}
              handleEditStylist={handleEditStylist}
              isLoading={isLoading}
            />
          </AccordionItem>

          {/* certification and tag */}
          <AccordionItem
            disabled={mode === "ADD"}
            handleClickItem={handleSetActiveTab}
            title="Certification and tags"
            isOpen={activeTab === "Certification and tags"}
          >
            <CertificateAndTags
              hiddenTabs={hiddenTabs}
              handleSetActiveTab={handleSetActiveTab}
              activeTab={activeTab}
              ariaHidden={activeTab !== "Certification and tags"}
              idx="content-certification"
              stylistData={stylistData}
              handleEditStylist={handleEditStylist}
              isEditLoading={isLoading}
              key={certTagId}
              remountCertAndTags={handleMountCertTag}
            />
          </AccordionItem>

          <AccordionItem
            disabled={mode === "ADD"}
            handleClickItem={handleSetActiveTab}
            title="Services and pricing"
            isOpen={activeTab === "Services and pricing"}
          >
            <ServicesTab
              isLoading={isLoading}
              activeTab={activeTab}
              ariaHidden={!openTab.serviceTab.toString()}
              idx="content-service"
              stylistData={stylistData}
              handleEditStylist={handleEditStylist}
            />
          </AccordionItem>
          {/* availability */}
          <AccordionItem
            disabled={mode === "ADD"}
            handleClickItem={handleSetActiveTab}
            title="Availability"
            isOpen={activeTab === "Availability"}
          >
            <AvailabilityTab
              isLoading={isLoading}
              activeTab={activeTab}
              ariaHidden={!openTab.availabilityTab.toString()}
              idx="content-availability"
              stylistData={stylistData}
              handleEditStylist={handleEditStylist}
            />
          </AccordionItem>

          {/* gallery */}
          <AccordionItem
            disabled={mode === "ADD"}
            handleClickItem={handleSetActiveTab}
            title="Gallery"
            isOpen={activeTab === "Gallery"}
          >
            <GalleryTab
              activeTab={activeTab}
              ariaHidden={!openTab.galleryTab.toString()}
              idx="content-gallery"
              stylistData={stylistData}
              handleEditStylist={handleEditStylist}
              isLoading={isLoading}
            />
          </AccordionItem>

          {/* </PersistUserContext.Provider> */}
        </div>
      </div>
    </div>
  );
}

export const useStylistPage = () => {
  const renderPage = ({ mode, stylistData, handleEditStylist, isLoading }) => {
    return (
      <StylistPage
        mode={mode}
        stylistData={stylistData}
        handleEditStylist={handleEditStylist}
        isLoading={isLoading}
      />
    );
  };

  return { renderPage };
};
