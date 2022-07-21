/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable eqeqeq */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from "react";
import admin from "../../../../../api/admin";
import useFetchData from "../../../../../hooks/useFetchData";
import useChangeBtnTitle from "../../../../../hooks/useChangeBtnTitle";
import ManageCertificationModal from "../manageCertificationModal";
import ManageTagModal from "../manageTagModal";
import MultiselectComponent from "../multiSelectComponent";

function CertificateAndTags({
  ariaHidden,
  idx,
  hiddenTabs,
  setActiveTab,
  stylistValues,
  setStylistValues,
}) {
  const [getCertificates, setGetCertificates] = useState([]);
  const [isCertificationUpdate, setIsCertificationUpdate] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [isTagUpdate, setIsTagUpdate] = useState(false);
  const [getTags, setGetTags] = useState([]);
  const [openCertificationModal, setOpenCertificationModal] = useState(false);
  const [openTagModal, setOpenTagModal] = useState(false);
  const [buttonAction, setButtonAction] = useState("Save");

  useChangeBtnTitle(setButtonAction, setStylistValues);

  // fetch get certificate endpoint
  useFetchData(
    admin.GetCertification(),
    setGetCertificates,
    "certification",
    isCertificationUpdate
  );

  // fetch get tags endpoint
  useFetchData(admin.GetTags(), setGetTags, "tags", isTagUpdate);

  const btnHandler = () => {
    const isValid =
      stylistValues.certifications.length > 0 && stylistValues.tags.length > 0;
    if (isValid || buttonAction === "Edit") {
      return false;
    }
    return true;
  };

  const handleCreateStylist = () => {
    setIsloading(true);
    const { id, certifications, tags } = stylistValues;
    admin
      .UpdateStylist({
        id,
        certifications: certifications.map((el) => el._id),
        tags: tags.map((tg) => tg._id),
      })
      .then((res) => {
        if (hiddenTabs) {
          setActiveTab((prev) => ({ ...prev, serviceTab: true }));
        } else {
          setActiveTab((prev) => ({ ...prev, galleryTab: true }));
        }
        setButtonAction("Edit");
        setIsloading(false);
      })
      .catch((err) => console.log(err));
  };

  const handleItm = (e, name) => {
    setStylistValues((prev) => ({
      ...prev,
      [name]: [...e],
    }));
  };

  // handle certification modal close
  const handleCloseCertificationModal = () => {
    setOpenCertificationModal(false);
    // Unsets Background Scrolling to use when SideDrawer/Modal is closed
    document.body.style.overflow = "unset";
  };
  // handle certification modal open
  const handleOpenCertificationModal = () => {
    setOpenCertificationModal(true);
    // Disables Background Scrolling whilst the SideDrawer/Modal is open
    if (typeof window != "undefined" && window.document) {
      document.body.style.overflow = "hidden";
    }
  };
  // handle certification modal close
  const handleCloseTagModal = () => {
    setOpenTagModal(false);
    // Unsets Background Scrolling to use when SideDrawer/Modal is closed
    document.body.style.overflow = "unset";
  };
  // handle certification modal open
  const handleOpenTagModal = () => {
    setOpenTagModal(true);
    // Disables Background Scrolling whilst the SideDrawer/Modal is open
    if (typeof window != "undefined" && window.document) {
      document.body.style.overflow = "hidden";
    }
  };

  const clickHandler = () => {
    if (buttonAction === "Save" || buttonAction === "Update") {
      handleCreateStylist();
    }
    if (buttonAction === "Edit") {
      setButtonAction("Update");
    }
  };

  return (
    <div aria-hidden={ariaHidden} id={idx} className="mt-5 text-sm relative">
      {isloading && (
        <div className="absolute inset-0 flex justify-center items-center z-10 bg-black-50">
          <div className="loader" />
        </div>
      )}
      {/* certifications */}
      <div className="flex justify-between items-center">
        <p className="e">Certifications</p>
        <button
          type="button"
          disabled={buttonAction === "Edit"}
          onClick={handleOpenCertificationModal}
          className="text-purple-100 cursor-pointer"
        >
          Manage Certifications
        </button>
      </div>
      <div className="mt-5">
        <MultiselectComponent
          buttonAction={buttonAction}
          onRemove={(e) => handleItm(e, "certifications")}
          onSelect={(e) => handleItm(e, "certifications")}
          values={getCertificates.filter((itm) =>
            stylistValues.certifications.find((cert) => cert?._id === itm?._id)
          )}
          data={getCertificates}
          placeholder="Type to search and select certifications"
        />
      </div>

      <hr className="border border-gray-600 w-full mt-8" />
      {/* tags */}
      <div className="mt-6">
        <div className=" flex justify-between items-center">
          <p className="e">Tags</p>
          <button
            type="button"
            disabled={buttonAction === "Edit"}
            onClick={handleOpenTagModal}
            className="text-purple-100 cursor-pointer"
          >
            Manage Tags
          </button>
        </div>

        <div className="mt-5">
          <MultiselectComponent
            buttonAction={buttonAction}
            values={getTags.filter((itm) =>
              stylistValues.tags.find((tag) => tag?._id === itm?._id)
            )}
            onRemove={(e) => handleItm(e, "tags")}
            onSelect={(e) => handleItm(e, "tags")}
            data={getTags}
            placeholder="Type to search and select tags"
          />
        </div>
      </div>
      {openCertificationModal && (
        <ManageCertificationModal
          handleClose={handleCloseCertificationModal}
          setIsCertificationUpdate={setIsCertificationUpdate}
        />
      )}
      {openTagModal && (
        <ManageTagModal
          handleClose={handleCloseTagModal}
          setIsTagUpdate={setIsTagUpdate}
        />
      )}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={clickHandler}
          disabled={btnHandler()}
          className="text-sm disabled:opacity-50 font-BeatriceSemiBold rounded-full bg-orange-200 py-2 px-8 text-white mt-5"
        >
          {buttonAction}
        </button>
      </div>
    </div>
  );
}

export default CertificateAndTags;
