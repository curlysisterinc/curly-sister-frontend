import React, { createContext, useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import clsx from "clsx";
import useCreateStylists from "hooks/data/admin/useCreateStylists";
import useGetStylistById from "hooks/data/admin/useGetStylistById";
import dropdownIcon from "../../../../../assets/images/dropdown.svg";
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
  const [prevOpenedTab, setPrevOpenedTab] = useState("");
  const [openTab, setOpenTab] = useState(openTabInitials);
  const [activeTab, setActiveTab] = useState(null);
  const [detailActionBtn, setDetailActionBtn] = useState("Save");
  const [, setIsDetailsLoading] = useState(false);
  const [stylistValues, setStylistValues] = useState(detailsInitial);
  // const [userApiResponse, setUserApiResponse] = useState({});
  const navigate = useNavigate();
  const { state } = useLocation();
  useEffect(() => {
    if (mode === "EDIT") {
      setStylistValues({ ...stylistValues, ...stylistData });
    }
  }, [mode]);

  useEffect(() => {
    return (
      window.location.search.includes("location") &&
      setActiveTab("Location and contact")
    );
  }, []);

  useEffect(() => {
    if (state) {
      if (state !== "walk-in only") {
        setHiddenTabs(true);
      }
      const keys = Object.keys(openTab);
      keys.forEach((itm) => {
        setOpenTab((prev) => ({ ...prev, [itm]: true }));
        setActiveTab((prev) => ({ ...prev, [itm]: true }));
      });
    }

    return () => {
      // localStorage.removeItem("createdStylist");
    };
  }, []);

  const backBtnHandler = () => {
    navigate(-1);
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
      <div className=" bg-white px-10 pb-8 w-full relative min-h-screen">
        <header className="sticky z-10 top-0 right-0 bg-white left-0 pt-7">
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
              {mode === "EDIT" ? "Edit stylist" : "Add stylist"}
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

        <div className="mx-auto w-4/6 pt-2">
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
              activeTab={activeTab}
              ariaHidden={activeTab !== "Certification and tags"}
              idx="content-certification"
              stylistData={stylistData}
              handleEditStylist={handleEditStylist}
              isLoading={isLoading}
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
