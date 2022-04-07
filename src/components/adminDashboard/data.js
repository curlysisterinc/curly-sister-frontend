{
  /* <tr className="bg-white border-b border-gray-600">
                      <td className="border-2 px-6 py-4 w-10">
                        <input
                          type="checkbox"
                          checked={itemChecked}
                          className="inline-block border-2"
                          id="rowcheck{user.id}"
                          onChange={() => setItemChecked(!itemChecked)}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap flex items-center">
                        <img
                          className="h-10 w-10"
                          src={productRecommendation}
                          alt="profile pix"
                        />
                        <div className="ml-2">
                          <p className="text-sm text-gray-400 mb-1">
                            All Naturals
                          </p>
                          <p className="text-xs text-gray-200 ">
                            bookings@allnaturals.com
                          </p>
                        </div>
                      </td>
                      <td className="text-sm text-gray-400  px-6 py-4 whitespace-nowrap">
                        Curly sister stylist
                      </td>
                      <td className="text-sm text-gray-400  px-6 py-4 whitespace-nowrap">
                        333, Fremont Street, SF, CA, 94105, USA
                      </td>
                      <td className="text-sm text-gray-400  px-6 py-4 whitespace-nowrap">
                        <img src={greenIndicator} alt="" />
                      </td>
                      <td
                        className="px-2 py-4 relative cursor-pointer"
                        onClick={() => setToggleKebab1(!toggleKebab1)}
                      >
                        <img className="" src={kebabIcon} alt="kebab icon" />
                        {toggleKebab1 && (
                          <div className="absolute bg-white rounded-2xl top-14 shadow-lg w-44 right-0 z-50 overflow-hidden">
                            <div
                              // eslint-disable-next-line no-undef
                              onClick={() => navigate(AuthRoutes.addStylist)}
                              className=" hover:bg-gray-600 p-2 text-sm text-gray-400 flex items-center  w-full cursor-pointer overflow-hidden"
                            >
                              <img
                                className="mr-2"
                                src={activateIcon}
                                alt="trash icon"
                              />
                              Deactivate
                            </div>
                            <div className=" hover:bg-gray-600 p-2 text-sm text-red-400 flex items-center  w-full cursor-pointer ">
                              <img
                                className="mr-2"
                                src={trashIcon}
                                alt="trash icon"
                              />
                              Delete
                            </div>{" "}
                          </div>
                        )}
                      </td>
                    </tr>
                    <tr className="bg-white border-b border-gray-600">
                      <td className="px-6 py-4 whitespace-nowrap flex items-center">
                        <img
                          className="h-10 w-10"
                          src={spencerAvatar}
                          alt="profile pix"
                        />
                        <div className="ml-2">
                          <p className="text-sm text-gray-400 mb-1">
                            Spencer Wright
                          </p>
                          <p className="text-xs text-gray-200 ">
                            swhair@hey.com
                          </p>
                        </div>
                      </td>
                      <td className="text-sm text-gray-400  px-6 py-4 whitespace-nowrap">
                        Walk-in only
                      </td>
                      <td className="text-sm text-gray-400  px-6 py-4 whitespace-nowrap">
                        2, Hebert Macaulay Way, Yaba, Lagos, 100...
                      </td>
                      <td className="text-sm text-gray-400  px-6 py-4 whitespace-nowrap">
                        <img src={grayIndicator} alt="" />
                      </td>
                      <td
                        className="px-2 py-4 relative cursor-pointer"
                        onClick={() => setToggleKebab2(!toggleKebab2)}
                      >
                        <img src={kebabIcon} alt="kebab icon" />
                        {toggleKebab2 && (
                          <div className="absolute bg-white rounded-2xl top-14 shadow-lg w-44 right-0 z-50 overflow-hidden">
                            <div
                              // eslint-disable-next-line no-undef
                              onClick={() => navigate(AuthRoutes.addStylist)}
                              className=" hover:bg-gray-600 p-2 text-sm text-gray-400 flex items-center  w-full cursor-pointer overflow-hidden"
                            >
                              <img
                                className="mr-2"
                                src={activateIcon}
                                alt="trash icon"
                              />
                              Deactivate
                            </div>
                            <div className=" hover:bg-gray-600 p-2 text-sm text-red-400 flex items-center  w-full cursor-pointer ">
                              <img
                                className="mr-2"
                                src={trashIcon}
                                alt="trash icon"
                              />
                              Delete
                            </div>{" "}
                          </div>
                        )}
                      </td>
                    </tr>
                    <tr className="bg-white border-b border-gray-600">
                      <td className="px-6 py-4 whitespace-nowrap flex items-center">
                        <img
                          className="h-10 w-10"
                          src={rfHairstudio}
                          alt="profile pix"
                        />
                        <div className="ml-2">
                          <p className="text-sm text-gray-400 mb-1">
                            RF hair studio
                          </p>
                          <p className="text-xs text-gray-200 ">
                            rfhair@gmail.com
                          </p>
                        </div>
                      </td>
                      <td className="text-sm text-gray-400  px-6 py-4 whitespace-nowrap">
                        Walk-in only
                      </td>
                      <td className="text-sm text-gray-400  px-6 py-4 whitespace-nowrap">
                        546, Mandela Avenue, SF, CA, 92401, USA
                      </td>
                      <td className="text-sm text-gray-400  px-6 py-4 whitespace-nowrap">
                        <img src={grayIndicator} alt="" />
                      </td>
                      <td
                        className="px-2 py-4 relative cursor-pointer"
                        onClick={() => setToggleKebab3(!toggleKebab3)}
                      >
                        <img src={kebabIcon} alt="kebab icon" />
                        {toggleKebab3 && (
                          <div className="absolute bg-white rounded-2xl top-14 shadow-lg w-44 right-0 z-50 overflow-hidden">
                            <div
                              // eslint-disable-next-line no-undef
                              onClick={() => navigate(AuthRoutes.addStylist)}
                              className=" hover:bg-gray-600 p-2 text-sm text-gray-400 flex items-center  w-full cursor-pointer overflow-hidden"
                            >
                              <img
                                className="mr-2"
                                src={activateIcon}
                                alt="trash icon"
                              />
                              Deactivate
                            </div>
                            <div className=" hover:bg-gray-600 p-2 text-sm text-red-400 flex items-center  w-full cursor-pointer ">
                              <img
                                className="mr-2"
                                src={trashIcon}
                                alt="trash icon"
                              />
                              Delete
                            </div>{" "}
                          </div>
                        )}
                      </td>
                    </tr>{" "}
                    <tr className="bg-white border-b border-gray-600 relative">
                      <td className="px-6 py-4 whitespace-nowrap flex items-center">
                        <img
                          className="h-10 w-10"
                          src={allynAvatr}
                          alt="profile pix"
                        />
                        <div className="ml-2">
                          <p className="text-sm text-gray-400 mb-1">
                            Allyn Antoine
                          </p>
                          <p className="text-xs text-gray-200 ">
                            ally.antoine@aabeauty.com
                          </p>
                        </div>
                      </td>
                      <td className="text-sm text-gray-400  px-6 py-4 whitespace-nowrap">
                        Master stylist
                      </td>
                      <td className="text-sm text-gray-400  px-6 py-4 whitespace-nowrap">
                        129 Mission Street, SF, CA, 95338, USA
                      </td>
                      <td className="text-sm text-gray-400  px-6 py-4 whitespace-nowrap">
                        <img src={greenIndicator} alt="" />
                      </td>
                      <td
                        className="px-2 py-4 relative cursor-pointer"
                        onClick={() => setToggleKebab4(!toggleKebab4)}
                      >
                        <img src={kebabIcon} alt="kebab icon" />
                        {toggleKebab4 && (
                          <div className="absolute bg-white rounded-2xl top-14 shadow-lg w-44 right-0 z-50 overflow-hidden">
                            <div
                              // eslint-disable-next-line no-undef
                              onClick={() => navigate(AuthRoutes.addStylist)}
                              className=" hover:bg-gray-600 p-2 text-sm text-gray-400 flex items-center  w-full cursor-pointer overflow-hidden"
                            >
                              <img
                                className="mr-2"
                                src={activateIcon}
                                alt="trash icon"
                              />
                              Deactivate
                            </div>
                            <div className=" hover:bg-gray-600 p-2 text-sm text-red-400 flex items-center  w-full cursor-pointer ">
                              <img
                                className="mr-2"
                                src={trashIcon}
                                alt="trash icon"
                              />
                              Delete
                            </div>{" "}
                          </div>
                        )}
                      </td>
                    </tr>{" "}
                    <tr className="bg-white border-b border-gray-600 relative">
                      <td className="px-6 py-4 whitespace-nowrap flex items-center">
                        <img
                          className="h-10 w-10"
                          src={profileDp}
                          alt="profile pix"
                        />
                        <div className="ml-2">
                          <p className="text-sm text-gray-400 mb-1">
                            All Naturals
                          </p>
                          <p className="text-xs text-gray-200 ">
                            bookings@allnaturals.com
                          </p>
                        </div>
                      </td>
                      <td className="text-sm text-gray-400  px-6 py-4 whitespace-nowrap">
                        Walk-in only
                      </td>
                      <td className="text-sm text-gray-400  px-6 py-4 whitespace-nowrap">
                        2, Hebert Macaulay Way, Yaba, Lagos, 100...
                      </td>
                      <td className="text-sm text-gray-400  px-6 py-4 whitespace-nowrap">
                        <img src={grayIndicator} alt="" />
                      </td>
                      <td
                        className="px-2 py-4 relative cursor-pointer"
                        onClick={() => setToggleKebab5(!toggleKebab5)}
                      >
                        <img src={kebabIcon} alt="kebab icon" />
                        {toggleKebab5 && (
                          <div className="absolute bg-white rounded-2xl top-14 shadow-lg w-44 right-0 z-50 overflow-hidden">
                            <div
                              // eslint-disable-next-line no-undef
                              onClick={() => navigate(AuthRoutes.addStylist)}
                              className=" hover:bg-gray-600 p-2 text-sm text-gray-400 flex items-center  w-full cursor-pointer overflow-hidden"
                            >
                              <img
                                className="mr-2"
                                src={activateIcon}
                                alt="trash icon"
                              />
                              Deactivate
                            </div>
                            <div className=" hover:bg-gray-600 p-2 text-sm text-red-400 flex items-center  w-full cursor-pointer ">
                              <img
                                className="mr-2"
                                src={trashIcon}
                                alt="trash icon"
                              />
                              Delete
                            </div>{" "}
                          </div>
                        )}
                      </td>
                    </tr> */
}
