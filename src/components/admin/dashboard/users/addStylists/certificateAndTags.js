/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable eqeqeq */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import admin from "../../../../../api/admin";
import useChangeBtnTitle from "../../../../../hooks/useChangeBtnTitle";
import ManageCertificationModal from "../manageCertificationModal";
// import { Loadersmall } from "../../../../loader";
import ManageTagModal from "../manageTagModal";
import MultiselectComponent from "../multiSelectComponent";
import OrangeBtn from "../../../../customButton/orangeBtn";
import { certificateInitials } from "./helper";

function CertificateAndTags({
  ariaHidden,
  idx,
  hiddenTabs,
  setActiveTab,
  // stylistCert,
  // setStylistCert,
}) {
  const [stylistCert, setStylistCert] = useState(certificateInitials);
  const [getCertificates, setGetCertificates] = useState([]);
  const [isCertificationUpdate, setIsCertificationUpdate] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [isTagUpdate, setIsTagUpdate] = useState(false);
  const [getTags, setGetTags] = useState([]);
  const [openCertificationModal, setOpenCertificationModal] = useState(false);
  const [openTagModal, setOpenTagModal] = useState(false);
  const [buttonAction, setButtonAction] = useState("Save");
  const { state } = useLocation();
  const stylistId = localStorage.getItem("createdStylist");

  useChangeBtnTitle("certificate", setButtonAction, setStylistCert);

  const disableInput = () => {
    if (buttonAction === "Edit") {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (state !== "" || state !== undefined || state !== null) {
      setIsloading(true);
      admin
        .GetStylistById(stylistId)
        .then((res) => {
          const { certifications, tags } = res.data.stylist;
          setStylistCert((prev) => ({
            ...prev,
            certifications,
            tags,
          }));
          setIsloading(false);
        })
        .catch((err) => {
          console.log(err, "error fetching existing stylist information");
          setIsloading(false);
        });
    }
  }, []);

  useEffect(() => {
    const ac = new AbortController();
    admin
      .GetCertification()
      .then((response) => {
        console.log(response.data, `data fetched certification`);
        setGetCertificates(response.data.data);
      })
      .catch((error) => {
        console.log(error.message, `error fetching certification`);
      });

    return function cleanup() {
      ac.abort();
    };
  }, [isCertificationUpdate]);

  useEffect(() => {
    const ac = new AbortController();
    admin
      .GetTags()
      .then((response) => {
        console.log(response.data, `data fetched tags`);
        setGetTags(response.data.data);
      })
      .catch((error) => {
        console.log(error.message, `error fetching tags`);
      });
  }, [isTagUpdate]);

  const disableBtn = () => {
    const isValid =
      stylistCert.certifications.length > 0 && stylistCert.tags.length > 0;
    if (isValid || buttonAction === "Edit") {
      return false;
    }
    return true;
  };

  const handleCreateStylist = () => {
    setIsloading(true);
    const { id, certifications, tags } = stylistCert;
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
    setStylistCert((prev) => ({
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
          values={getCertificates.filter((itm) =>
            stylistCert.certifications.find((cert) => cert?._id === itm?._id)
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
            values={getTags.filter((itm) =>
              stylistCert.tags.find((tag) => tag?._id === itm?._id)
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
        <OrangeBtn
          buttonAction={buttonAction}
          disabled={disableBtn()}
          onClick={clickHandler}
          isloading={isloading}
        />
      </div>
    </div>
  );
}

export default CertificateAndTags;
