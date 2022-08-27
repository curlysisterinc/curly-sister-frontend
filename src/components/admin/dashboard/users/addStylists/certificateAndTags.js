import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import admin from "../../../../../api/admin";
import useChangeBtnTitle from "../../../../../hooks/useChangeBtnTitle";
import { useManageCertificationModal } from "../manageCertificationModal";
import ManageTagModal from "../manageTagModal";
import MultiselectComponent from "../multiSelectComponent";
import OrangeBtn from "../../../../customButton/orangeBtn";
import { certificateInitials } from "./helper";

function CertificateAndTags({
  ariaHidden,
  idx,
  hiddenTabs,
  activeTab,
  isOpen,
  isLoading,
  detailsValues,
  setDetailsValues,
  stylistData,
  mode,
  handleEditStylist,
}) {
  const [stylistCert, setStylistCert] = useState(certificateInitials);
  const [getCertificates, setGetCertificates] = useState([]);
  const [isTagUpdate, setIsTagUpdate] = useState(false);
  const [getTags, setGetTags] = useState([]);
  const [openTagModal, setOpenTagModal] = useState(false);
  const [buttonAction, setButtonAction] = useState("Save");
  const { state } = useLocation();

  const certificationModal = useManageCertificationModal();

  useEffect(() => {
    const ac = new AbortController();
    if (stylistData) {
      const { certifications, tags } = stylistData;
      setStylistCert((prev) => ({
        ...prev,
        certifications,
        tags,
      }));
      setGetCertificates(certifications);
      setGetTags(tags);
      // setStylistCert({ ...detailsValues, ...stylistData });
    }
    return function cleanup() {
      ac.abort();
    };
  }, [stylistData]);

  // const stylistId = localStorage.getItem("createdStylist");

  useChangeBtnTitle("certificate", setButtonAction, setStylistCert);

  const disableInput = () => {
    if (mode === "EDIT") {
      return true;
    }
    return false;
  };

  const disableBtn = () => {
    const isValid =
      stylistCert?.certifications?.length > 0 && stylistCert?.tags?.length > 0;
    if (isValid || mode === "ED") {
      return false;
    }
    return true;
  };

  const handleItm = (e, name) => {
    setStylistCert((prev) => ({
      ...prev,
      [name]: [...e],
    }));
  };

  // handle certification modal open
  const handleOpenCertificationModal = () => {
    certificationModal.show();
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
    if (typeof window !== "undefined" && window.document) {
      document.body.style.overflow = "hidden";
    }
  };

  const handleUpdateCertificateAndTags = () => {
    const { id, certifications, tags } = stylistCert;
    handleEditStylist({
      id,
      certifications: certifications.map((el) => el._id),
      tags: tags.map((tg) => tg._id),
    });
  };

  return (
    <div aria-hidden={ariaHidden} id={idx} className="mt-5 text-sm relative">
      {/* certifications */}
      <div className="flex justify-between items-center">
        <p className="e">Certifications</p>
        <button
          type="button"
          disabled={disableInput()}
          onClick={handleOpenCertificationModal}
          className="text-purple-100 cursor-pointer"
        >
          Manage Certifications
        </button>
      </div>
      <div className="mt-5">
        <MultiselectComponent
          buttonAction={disableInput()}
          onRemove={(e) => handleItm(e, "certifications")}
          onSelect={(e) => handleItm(e, "certifications")}
          values={getCertificates?.filter((itm) =>
            stylistCert.certifications?.find((cert) => cert?._id === itm?._id)
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
            disabled={disableInput()}
            onClick={handleOpenTagModal}
            className="text-purple-100 cursor-pointer"
          >
            Manage Tags
          </button>
        </div>

        <div className="mt-5">
          <MultiselectComponent
            buttonAction={disableInput()}
            values={getTags?.filter((itm) =>
              stylistCert?.tags?.find((tag) => tag?._id === itm?._id)
            )}
            onRemove={(e) => handleItm(e, "tags")}
            onSelect={(e) => handleItm(e, "tags")}
            data={getTags}
            placeholder="Type to search and select tags"
          />
        </div>
      </div>
      {certificationModal.renderModal()}
      {openTagModal && (
        <ManageTagModal
          handleClose={handleCloseTagModal}
          setIsTagUpdate={setIsTagUpdate}
        />
      )}
      <div className="flex justify-end">
        <OrangeBtn
          buttonAction={buttonAction}
          disabled={disableBtn()}
          onClick={handleUpdateCertificateAndTags}
          isloading={isLoading}
        />
      </div>
    </div>
  );
}

export default CertificateAndTags;
