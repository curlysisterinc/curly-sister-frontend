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
import OrangeBtn from "../../../../customButton/orangeBtn";
import { useLocation } from "react-router-dom";
import { serviceInitials } from "./helper";
import DropDown from "../../../../customdropdown/primitive/DropDown";
import DropDownItem from "../../../../customdropdown/primitive/DropDownItem";

function ServicesTab({ ariaHidden, idx, setActiveTab }) {
  const [stylistServices, setStylistServices] = useState(serviceInitials);
  const [allServices, setAllServices] = useState([]);
  const [iServiceUpdate, setIServiceUpdate] = useState(false);
  const [openServiceModal, setOpenServiceModal] = useState(false);
  const [buttonAction, setButtonAction] = useState("Save");
  const [isloading, setIsloading] = useState(false);

  const { state } = useLocation();
  const stylistId = localStorage.getItem("createdStylist");

  useChangeBtnTitle("service", setButtonAction, setStylistServices);

  useEffect(() => {
    const ac = new AbortController();

    if (state) {
      setIsloading(true);
      admin
        .GetStylistById(stylistId)
        .then((res) => {
          console.log(res.data.stylist, "services stylist");
          const { services } = res.data.stylist;
          const temp = services.map((service) => service._id);
          setStylistServices((prev) => ({ ...prev, services: [...temp] }));
          setIsloading(false);
        })
        .catch((err) => {
          console.log(err, "error fetching existing stylist information");
          setIsloading(false);
        });
    }

    // if (allServices.length === 0) {
    admin
      .GetServices()
      .then((response) => {
        console.log(response.data, "services");
        setAllServices(response.data.data);
      })
      .catch((error) => {
        console.log(error.message, "error");
      });
    // }

    return function cleanup() {
      ac.abort();
    };
  }, [iServiceUpdate]);

  // handle click event of the Remove button
  const handleRemoveServiceClick = (index) => {
    const tempServices = stylistServices.services.filter(
      (serv) => serv !== index
    );
    setStylistServices((prev) => ({ ...prev, services: [...tempServices] }));
  };
  const handleCreateStylist = () => {
    setIsloading(true);
    admin
      .UpdateStylist(stylistServices)
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
    document.title = "CurlySisters • Add Stylists";
    if (openServiceModal) {
      document.body.style.overflow = "hidden";
    }
    return function cleanup() {
      ac.abort();
    };
  }, []);

  const onServiceSelectHandler = (e) => {
    const { id } = e.target.dataset;
    setStylistServices((prev) => ({
      ...prev,
      services: [...prev.services, id],
    }));
  };

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
  const disableBtn = () => {
    const isValid = stylistServices.services.length;
    if (isValid || buttonAction === "Edit") {
      return false;
    }
    return true;
  };
  return (
    <div aria-hidden={ariaHidden} id={idx} className="mt-5 relative">
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
      <table
        style={{ borderSpacing: "0 .5rem" }}
        className="w-full border-separate"
      >
        <tbody>
          {allServices
            .filter((service) => stylistServices.services.includes(service._id))
            .map((service) => {
              return (
                <tr className="rounded-lg" key={service._id}>
                  <td
                    style={{
                      borderRightColor: "transparent",
                      borderTopLeftRadius: "0.5rem",
                      borderBottomLeftRadius: "0.5rem",
                    }}
                    className="p-1.5 border border-solid border-gray-800"
                  >
                    <div className="bg-purple-100 rounded-full text-white text-sm px-3 py-1.5 w-auto inline-block">
                      {service.name}
                    </div>
                  </td>
                  <td
                    style={{ borderRightColor: "transparent" }}
                    className="px-4 py-3 border border-solid border-gray-800"
                  >
                    <div className="flex justify-between">
                      <p>{service.default_price}</p>
                      <p>$USD</p>
                    </div>
                  </td>
                  <td
                    style={{ borderRightColor: "transparent" }}
                    className="px-4 py-3 border border-solid border-gray-800"
                  >
                    <div className="flex justify-between">
                      <p>{service.duration}</p>
                      <p>mins</p>
                    </div>
                  </td>
                  {allServices.length > 0 && (
                    <td
                      style={{
                        borderTopRightRadius: "0.5rem",
                        borderBottomRightRadius: "0.5rem",
                      }}
                      className=" border border-solid border-gray-800 "
                    >
                      <button
                        disabled={buttonAction === "Edit"}
                        type="button"
                        onClick={() => handleRemoveServiceClick(service._id)}
                        className="flex justify-center items-center mx-auto px-2 "
                      >
                        <IoMdClose
                          style={{ fill: "#8E8695" }}
                          className="cursor-pointer m-0 fill-[#8E8695]"
                          size={24}
                        />
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
        </tbody>
      </table>
      {allServices.filter(
        (service) => stylistServices.services.includes(service._id) === false
      ).length > 0 ? (
        <DropDown
          disabled={buttonAction === "Edit"}
          contentClassName="bg-white border border-solid border-gray-800 p-2 rounded"
          trigger={
            <button
              className={`text-purple-100 cursor-pointer ${
                stylistServices.services.length > 0 ? "" : "w-full"
              }`}
              type="button"
            >
              {stylistServices.services.length > 0
                ? "Select another service"
                : "Select a service"}
            </button>
          }
        >
          {allServices
            .filter(
              (service) =>
                stylistServices.services.includes(service._id) === false
            )
            .map((service) => (
              <DropDownItem key={service._id}>
                <button
                  data-id={service._id}
                  onClick={onServiceSelectHandler}
                  type="button"
                  className="w-full text-left hover:bg-purple-100 hover:text-white"
                >
                  {service.name}
                </button>
              </DropDownItem>
            ))}
        </DropDown>
      ) : null}

      {openServiceModal && (
        <ManageServicesModal handleClose={handleCloseServiceModal} />
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

export default ServicesTab;
