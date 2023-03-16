import React, { useEffect, useMemo, useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import useGetServices from "hooks/data/admin/useGetServices";
import { Loadersmall } from "components/loader-component/loader";
import wallet from "../../../../assets/images/wallet.svg";
import timer from "../../../../assets/images/timer.svg";

function ServiceList({ handleSearchAddress, setIsSearchMode }) {
  const [toggleType, setToggleType] = useState(false);
  const [isActive, setIsActive] = useState("everyone");
  const [services, setServices] = useState([]);

  const {
    data: servicesData,
    isLoading: isServicesLoading,
    error: ServicesError,
  } = useGetServices();

  React.useEffect(() => {
    const ac = new AbortController();
    if (servicesData) {
      const newServices = servicesData.data.data.map((item) => ({
        ...item,
        isSelected: false,
      }));
      setServices(newServices);
    }
    return function cleanup() {
      ac.abort();
    };
  }, [servicesData]);

  useEffect(() => {
    const selectedItems = services
      .filter((item) => item.isSelected)
      .map((isSelected) => isSelected._id);
    setIsSearchMode(true);
    return handleSearchAddress({ services: selectedItems.join() });
  }, [services]);

  const handleSelectService = (service) => {
    const newServices = services.map((item) => {
      if (item._id === service._id) {
        return { ...item, isSelected: !item.isSelected };
      }
      return item;
    });
    setServices(newServices);
  };

  const hasAtLeastOneSelectedService = useMemo(() => {
    return services.some((item) => item.isSelected);
  }, [services]);

  const selectedServiceCount = useMemo(() => {
    return services.filter((item) => item.isSelected).length;
  }, [services]);

  const handleToggleFilter = () => {
    setToggleType((isToggled) => !isToggled);
  };

  return (
    <div className="relative w-full md:w-fit">
      <button
        className={`md:mx-3  flex items-center justify-between w-48 border outline-none focus:outline-none mr-2 mb-1  rounded-full placeholder:text-sm text-sm  placeholder:text-gray-300 text-gray-400 h-10 px-4 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 relative ${
          hasAtLeastOneSelectedService
            ? "border-purple-100 bg-gray-550"
            : "border-gray-250 bg-white"
        }`}
        disabled={isServicesLoading}
        onClick={handleToggleFilter}
        type="button"
      >
        <p>Type of service</p>
        {!!selectedServiceCount && (
          <p
            className="absolute -top-3 right-0 text-xs rounded-full  border-gray-550 text-white
bg-purple-500 border w-5 h-5 flex items-start justify-center"
          >
            {selectedServiceCount}
          </p>
        )}

        {servicesData &&
          (!toggleType ? (
            <IoIosArrowDown
              // onClick={() => setToggleType(!toggleType)}
              size={20}
              className="cursor-pointer"
            />
          ) : (
            <IoIosArrowUp size={20} className="cursor-pointer" />
          ))}
        {isServicesLoading && <Loadersmall />}
      </button>
      {toggleType && (
        <div className="absolute  md:right-0 md:left-auto top-14 left-0 xl:left-0  bg-white shadow-s07 rounded-xl  overflow-hidden w-full md:w-543 h-500 z-500  p-0 ">
          <div className="flex items-center space-x-5 w-full p-5">
            <button
              type="button"
              onClick={() => setIsActive("everyone")}
              className={`text-sm pb-3 border-b-4 cursor-pointer ${
                isActive === "everyone"
                  ? "text-purple-100  border-purple-100 "
                  : "text-gray-300 border-white"
              }`}
            >
              For everyone
            </button>
            <button
              type="button"
              onClick={() => setIsActive("stylists")}
              className={`text-sm pb-3 cursor-pointer border-b-4 ${
                isActive === "stylists"
                  ? "text-purple-100  border-purple-100 "
                  : "text-gray-300 border-white"
              }`}
            >
              For stylists
            </button>
          </div>
          <div className="max-h-400 overflow-auto p-5 m-0 pt-0">
            {isActive === "everyone" && (
              <div>
                <p className="text-sm text-gray-400">
                  Services to help with your own hair
                </p>
                <div>
                  {services
                    ?.filter(
                      (service) => service.who_is_this_for !== "Stylists"
                    )
                    ?.map((service) => {
                      return (
                        <ServiceCard
                          service={service}
                          handleSelectService={handleSelectService}
                        />
                      );
                    })}
                </div>
              </div>
            )}
            {isActive === "stylists" && (
              <div>
                <p className="text-sm text-gray-400">
                  Services to help with your client’s hair
                </p>
                <div>
                  {services
                    .filter((service) => service.who_is_this_for === "Stylists")
                    .map((service) => {
                      return (
                        <ServiceCard
                          service={service}
                          handleSelectService={handleSelectService}
                        />
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ServiceCard({ service, handleSelectService }) {
  return (
    <button
      type="button"
      onClick={() => handleSelectService(service)}
      className={` cursor-pointer rounded-xl flex flex-col-reverse h-fit md:grid grid-cols-12 mt-5 w-full md:h-40 overflow-hidden border-2 hover:bg-gray-550 hover:border-purple-100 ${
        service.isSelected
          ? "bg-gray-550 border-purple-100"
          : "bg-white border-gray-600"
      }`}
    >
      <div className="p-5 col-span-9 text-left">
        <h6 className="text-base font-BeatriceSemiBold mb-2">{service.name}</h6>
        <p className="text-sm text-gray-200 tracking-tight">
          {service.description}
        </p>
      </div>
      <div className="relative bg-service-image col-span-3 bg-cover bg-no-repeat  h-full w-full flex justify-end p-2 text-right">
        {service.isSelected && (
          <BsFillCheckCircleFill
            color="white"
            size={20}
            className="absolute right-1 top-1"
          />
        )}
        <div className="flex flex-col h-full justify-end items-end">
          <div className="mb-1">
            <div className="bg-white inline-block w-auto rounded-md  p-1">
              <div className="flex items-center text-sm">
                <img src={wallet} alt="" />
                <p>${service.default_price}</p>
              </div>
            </div>
          </div>
          <div className="bg-white inline-block w-auto rounded-md  p-1">
            <div className="flex items-center text-sm">
              <img src={timer} alt="" />
              <p>{service.duration} mins</p>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

export default ServiceList;
