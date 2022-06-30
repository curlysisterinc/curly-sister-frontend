/* eslint-disable eqeqeq */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from "react";
import admin from "../../../../../api/admin";
import ManageCertificationModal from "../manageCertificationModal";
import ManageTagModal from "../manageTagModal";
import MultiselectComponent from "../multiSelectComponent";

function CertificateAndTags() {
  const [getCertificates, setGetCertificates] = useState([]);
  const [getTags, setGetTags] = useState([]);
  const [openCertificationModal, setOpenCertificationModal] = useState(false);
  const [openTagModal, setOpenTagModal] = useState(false);
  useEffect(() => {
    const ac = new AbortController();

    admin
      .GetCertification()
      .then((response) => {
        console.log(response.data, "certification");
        setGetCertificates(response.data.data);
      })
      .catch((error) => {
        console.log(error.message, "error");
      });
    return function cleanup() {
      ac.abort();
    };
  }, []);

  useEffect(() => {
    const ac = new AbortController();

    admin
      .GetTags()
      .then((response) => {
        console.log(response.data, "tags");
        setGetTags(response.data.data);
      })
      .catch((error) => {
        console.log(error.message, "error");
      });
    return function cleanup() {
      ac.abort();
    };
  }, []);

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
  return (
    <div className="mt-5 text-sm">
      {/* certifications */}
      <div className="flex justify-between items-center">
        <p className="e">Certifications</p>
        <div
          onClick={handleOpenCertificationModal}
          className="text-purple-100 cursor-pointer"
        >
          Manage Certifications
        </div>
      </div>
      <div className="mt-5">
        <MultiselectComponent
          data={getCertificates}
          placeholder="Type to search and select certifications"
        />
      </div>

      <hr className="border border-gray-600 w-full mt-8" />
      {/* tags */}
      <div className="mt-6">
        <div className=" flex justify-between items-center">
          <p className="e">Tags</p>
          <div
            onClick={handleOpenTagModal}
            className="text-purple-100 cursor-pointer"
          >
            Manage Tags
          </div>
        </div>

        <div className="mt-5">
          <MultiselectComponent
            data={getTags}
            placeholder="Type to search and select tags"
          />
        </div>
      </div>
      {openCertificationModal && (
        <ManageCertificationModal handleClose={handleCloseCertificationModal} />
      )}
      {openTagModal && <ManageTagModal handleClose={handleCloseTagModal} />}
    </div>
  );
}

export default CertificateAndTags;
