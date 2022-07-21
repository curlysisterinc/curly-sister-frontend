/* eslint-disable import/order */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from "react";
import admin from "../../../../../api/admin";
import useChangeBtnTitle from "../../../../../hooks/useChangeBtnTitle";
import ManageServicesModal from "../manageServicesModal";
import { IoMdClose } from "react-icons/io";

function ServicesTab({
  ariaHidden,
  idx,
  setActiveTab,
  stylistValues,
  setStylistValues,
}) {
  const [services, setServices] = useState([]);
  const [openServiceModal, setOpenServiceModal] = useState(false);
  const [buttonAction, setButtonAction] = useState("Save");
  const [isloading, setIsloading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [iServiceUpdate, setIsServiceUpdate] = useState(false);
  // const localId = localStorage.getItem("createdStylist");

  useChangeBtnTitle(setButtonAction, setStylistValues);

  useEffect(() => {
    const ac = new AbortController();
    if (stylistValues.services.length > 0) {
      setServices([...stylistValues.services]);
      // setButtonAction("Edit");
    }
    if (stylistValues.services.length === 0) {
      admin
        .GetServices()
        .then((response) => {
          console.log(response.data, "services");
          setServices(response.data.data);
          const tempArr = response.data.data.map((el) => el._id);
          setStylistValues((prev) => ({ ...prev, services: [...tempArr] }));
        })
        .catch((error) => {
          console.log(error.message, "error");
        });
    }

    return function cleanup() {
      ac.abort();
    };
  }, [iServiceUpdate]);

  // handle click event of the Remove button
  const handleRemoveServiceClick = (index) => {
    const list = services.filter((serv) => serv._id !== index);
    setServices([...list]);
  };
  const handleCreateStylist = () => {
    setIsloading(true);
    admin
      .UpdateStylist(stylistValues)
      .then((res) => {
        setActiveTab((prev) => ({ ...prev, availabilityTab: true }));
        setButtonAction("Edit");
        setIsloading(false);
      })
      .catch((err) => console.log(err));
  };

  const clickHandler = () => {
    if (buttonAction === "Save" || buttonAction === "Update") {
      handleCreateStylist();
    }
    if (buttonAction === "Edit") {
      setButtonAction("Update");
    }
  };
  // handle certification modal change
  useEffect(() => {
    const ac = new AbortController();
    // setStylistValues((prev) => ({ ...prev, id: localId }));
    document.title = "CurlySisters • Add Stylists";
    if (openServiceModal) {
      document.body.style.overflow = "hidden";
    }
    // setServices(getService);
    return function cleanup() {
      ac.abort();
    };
  }, []);
  useEffect(() => {
    const isValid = stylistValues.services.length;
    if (isValid) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [stylistValues]);

  // handle certification modal close
  const handleCloseServiceModal = () => {
    setOpenServiceModal(false);
    // Unsets Background Scrolling to use when SideDrawer/Modal is closed
    document.body.style.overflow = "unset";
  };
  // handle Service modal open
  const handleOpenServiceModal = () => {
    setOpenServiceModal(true);
    // Disables Background Scrolling whilst the SideDrawer/Modal is open
    if (typeof window != "undefined" && window.document) {
      document.body.style.overflow = "hidden";
    }
  };
  return (
    <div aria-hidden={ariaHidden} id={idx} className="mt-5 relative">
      {isloading && (
        <div className="absolute inset-0 flex justify-center items-center z-10 bg-black-50">
          <div className="loader" />
        </div>
      )}
      <div className="flex justify-between items-center">
        <p className="">Services</p>

        <button
          disabled={buttonAction === "Edit"}
          type="button"
          onClick={handleOpenServiceModal}
          className="text-purple-100 cursor-pointer"
        >
          Add new service
        </button>
      </div>
      {services.map((service) => {
        return (
          <div key={service._id}>
            <div className="border border-gray-800 rounded grid grid-cols-12 h-12 mt-5">
              <div className=" col-span-5 flex  items-center border-r border-gray-800 pl-3">
                <div className="bg-purple-100 rounded-full text-white text-sm px-3 py-1 w-auto inline-block">
                  {service.name}
                </div>
              </div>
              <div className="col-span-3 flex justify-between items-center border-r border-gray-800 px-3">
                <p>{service.default_price}</p>
                <p>$USD</p>
              </div>
              <div className="col-span-3 flex justify-between items-center border-r border-gray-800 px-3">
                <p>{service.duration}</p>
                <p>mins</p>
              </div>
              {services.length > 0 && (
                <button
                  disabled={buttonAction === "Edit"}
                  type="button"
                  onClick={() => handleRemoveServiceClick(service._id)}
                  className="col-span-1 flex justify-center items-center "
                >
                  <IoMdClose className="cursor-pointer" size={24} />
                </button>
              )}
            </div>
          </div>
        );
      })}
      {openServiceModal && (
        <ManageServicesModal handleClose={handleCloseServiceModal} />
      )}
      <div className="flex justify-end">
        <button
          type="button"
          disabled={btnDisabled}
          onClick={clickHandler}
          className="text-sm disabled:opacity-50 font-BeatriceSemiBold rounded-full bg-orange-200 py-2 px-8 text-white mt-5"
        >
          {buttonAction}
        </button>
      </div>
    </div>
  );
}

export default ServicesTab;
