/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable prefer-regex-literals */
import React, { useState } from "react";
import closeModalBtn from "../../../../assets/images/close-modal.svg";

function ManageServicesModal({ handleClose }) {
  const [serviceList, setServiceList] = useState([
    { serviceName: "", description: "", price: "", duration: "", people: "" },
  ]);

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    const list = [...serviceList];
    list[name] = value;
    setServiceList(list);
  };

  return (
    <div
      onClick={handleClose}
      className=" fixed top-0 left-0 h-full bg-black-100 w-full flex  justify-end items-center"
    >
      <section className="" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start">
          <img
            className="mt-10 mr-10"
            onClick={handleClose}
            src={closeModalBtn}
            alt="close button"
          />
          <div className="bg-white h-screen p-10">
            <h4 className="text-22 text-gray-400 mb-3 font-BeatriceSemiBold">
              Add a service
            </h4>
            <p className="text-gray-200 text-base mb-6">
              Create a new service for people to book
            </p>
            <form>
              <div className="mb-6">
                <label
                  className="block text-black text-sm font-bold "
                  htmlFor="serviceName"
                >
                  Name of service
                  <input
                    className="shadow-sm appearance-none mt-3 border border-gray-500 rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="serviceName"
                    type="text"
                    value={serviceList.serviceName}
                    placeholder="Type a name here"
                    name="serviceName"
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="mb-6">
                <label
                  className="block text-black text-sm font-bold mt-5"
                  htmlFor="description"
                >
                  Description
                  <textarea
                    className="shadow-sm appearance-none mt-3 border border-gray-800 rounded w-full py-4 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="textarea"
                    placeholder="Enter a description for this service"
                    name="description"
                    label="description"
                    id="description"
                    rows="3"
                  />
                </label>
              </div>
              <div className="mb-6 grid grid-cols-2 gap-6">
                {/* default price */}
                <div className="col relative">
                  <label
                    className="block text-black text-sm font-bold"
                    htmlFor="price"
                  >
                    Default price
                    <div className="relative h-10 mt-3">
                      <input
                        className="shadow-sm appearance-none border border-gray-800 rounded w-full h-full px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Enter price"
                        name="price"
                        id="price"
                      />
                      <div className="absolute h-full top-0 inset-y-0 right-0 flex items-center">
                        <select
                          id="currency"
                          name="currency"
                          className="focus:ring-indigo-500 focus:border-indigo-500  h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-700 sm:text-sm rounded-md"
                        >
                          <option>$USD</option>
                          <option>$CAD</option>
                          <option>$EUR</option>
                        </select>
                      </div>
                    </div>
                  </label>
                </div>
                {/* duration */}
                <div className="col relative">
                  <label
                    className="block text-black text-sm font-bold"
                    htmlFor="duration"
                  >
                    Duration
                    <input
                      className="shadow-sm appearance-none mt-3 border border-gray-800 rounded w-full py-4 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder="Enter time"
                      name="duration"
                      id="duration"
                    />
                  </label>
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <select
                      id="time"
                      name="time"
                      className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                    >
                      <option>mins</option>
                      <option>hours</option>
                    </select>
                  </div>
                </div>
              </div>
              {/* who is this for */}
              <div className="mb-6">
                <label
                  className="block text-black text-sm font-bold "
                  htmlFor="people"
                >
                  Who is this for?
                  <select
                    id="people"
                    name="people"
                    className="shadow-sm appearance-none mt-3 border border-gray-800 rounded w-full py-4 px-3 text-gray-700 placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option>Everyone</option>
                    <option>Not everyone</option>
                  </select>
                </label>
              </div>
              <button
                type="submit"
                className="mt-6 w-full py-3 bg-orange-200 rounded-full text-white text-sm"
              >
                Create service
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ManageServicesModal;
