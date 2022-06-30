/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import admin from "../../../../../api/admin";
import ManageServicesModal from "../manageServicesModal";

function ServicesTab() {
  const [services, setServices] = React.useState([]);
  const [openServiceModal, setOpenServiceModal] = React.useState(false);

  React.useEffect(() => {
    const ac = new AbortController();
    admin
      .GetServices()
      .then((response) => {
        console.log(response.data, "services");
        setServices(response.data.data);
      })
      .catch((error) => {
        console.log(error.message, "error");
      });
    return function cleanup() {
      ac.abort();
    };
  }, []);

  // handle certification modal change
  React.useEffect(() => {
    const ac = new AbortController();
    document.title = "CurlySisters • Add Stylists";
    if (openServiceModal) {
      document.body.style.overflow = "hidden";
    }
    // setServices(getService);
    return function cleanup() {
      ac.abort();
    };
  }, []);

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
    <div className="mt-5">
      <div className="flex justify-between items-center">
        <p className="">Services</p>

        <div
          onClick={handleOpenServiceModal}
          className="text-purple-100 cursor-pointer"
        >
          Add new service
        </div>
      </div>
      {services.map((service, index) => {
        return (
          <>
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
              {/* {services.length > 1 && (
                            <div className="col-span-1 flex justify-between items-center px-6">
                              <img
                                onClick={handleRemoveServiceClick}
                                className="cursor-pointer"
                                src={cancel}
                                alt=""
                              />
                            </div>
                          )} */}
            </div>
            {/* {services.length - 1 === index &&
                          serviceList.length < 4 && (
                            <div
                              onClick={handleAddServiceClick}
                              className="text-purple-100 text-sm mt-4 cursor-pointer"
                            >
                              Select another service
                            </div>
                          )} */}
          </>
        );
      })}
      {openServiceModal && (
        <ManageServicesModal handleClose={handleCloseServiceModal} />
      )}
    </div>
  );
}

export default ServicesTab;
