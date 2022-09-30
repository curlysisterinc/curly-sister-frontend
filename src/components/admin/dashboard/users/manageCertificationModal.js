/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import {
  runFunctionWhenSpaceOrEnterIsClicked,
  toggleFixedAppLayout,
} from "utils";
import useCreateCertifications from "hooks/data/admin/useCreateCertifications";
import useUpdateCertification from "hooks/data/admin/useUpdateCertification";
import { Loadersmall } from "components/loader-component/loader";
import OrangeBtn from "components/customButton/orangeBtn";
import useUpdateStylist from "hooks/data/admin/useUpdateStylist";
import Modal from "components/modal";
import closeModalBtn from "../../../../assets/images/cancel.svg";
import trashIcon, {
  ReactComponent as TrashIcon,
} from "../../../../assets/images/trash.svg";

function ManageCertificationModal({
  handleClose,
  visible,
  certifications: stylistCertifications,
}) {
  const {
    isLoading: isCreateCertificationsLoading,
    data: createCertificationsData,
    isError: createCertificationsError,
    refetch: createCertificationsRefetch,
    mutateAsync: createCertification,
  } = useCreateCertifications();

  const {
    isLoading: isUpdateCertificationsLoading,
    data: updateCertificationsData,
    isError: updateCertificationsError,
    refetch: updateCertificationsRefetch,
    mutateAsync: updateCertification,
  } = useUpdateCertification();

  const { id: stylistId } = useParams();
  const {
    isLoading: isStylistUpdateLoading,
    data: stylistUpdateData,
    isError: stylistUpdateError,
    mutate: updateStylist,
  } = useUpdateStylist(stylistId);

  const [certifications, setCertifications] = useState([]);

  useEffect(() => {
    const ac = new AbortController();
    document.title = "Curly sisters • Create certifications";

    return function cleanup() {
      ac.abort();
      // setIsCertificationUpdate(false);
    };
  }, []);

  useEffect(() => {
    if (stylistUpdateData) {
      handleClose();
    }
  }, [stylistUpdateData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCerts = certifications.map((item) => {
      const { description, options, url, _id } = item;
      return {
        ...item,
        name: item.name,
        options: [
          ...options.map((v) => {
            if (v.text !== "") {
              return v.text;
            }
            return null;
          }),
        ].filter(Boolean),
      };
    });

    createOrUpdateCertifications(newCerts);
  };

  const createOrUpdateCertifications = async (certs) => {
    try {
      const result = await Promise.allSettled(
        certs.map((cert) => {
          // because user created id's are numbers while server creted are strings
          if (typeof cert._id === "number") {
            const { _id, ...rest } = cert;
            return createCertification(rest);
          }
          const { _id, ...rest } = cert;
          return updateCertification({ ...rest, certificateId: _id });
        })
      );

      const successResult =
        result.length &&
        result
          .filter((item) => item.status === "fulfilled")
          .map((success) => success.value.data.data.certification._id);

      updateStylist({ certifications: successResult, id: stylistId });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (stylistCertifications?.length) {
      const newCerts = stylistCertifications.map((item) => {
        return {
          ...item,
          isMoreOptionChecked: !!item?.options?.length,
          options: item?.options?.map((v, index) => {
            return {
              text: v,
              id: new Date().getTime() + index,
            };
          }),
        };
      });

      setCertifications(newCerts);
    }
  }, [stylistCertifications]);

  const addMoreCertifications = () => {
    const newCert = {
      _id: new Date().getTime(),
      name: "",
      isMoreOptionChecked: false,
      description: "",
      url: "",
      options: [{ text: "", id: new Date().getTime() + 1 }],
    };
    const newCertification = [...certifications, newCert];
    setCertifications(newCertification);
    // createCertification(newCert);
  };

  const disableCertificationbutton = () => {
    const isDisabled = certifications.some(
      (item) => item.name === "" || item.description === ""
    );

    return (
      isDisabled ||
      isCreateCertificationsLoading ||
      isStylistUpdateLoading ||
      isUpdateCertificationsLoading
    );
  };

  const handleChangeCertInputs = (e, certId) => {
    const { value } = e.target;
    const newCertification = certifications.map((cert) => {
      const newCert = cert;
      if (cert._id === certId) {
        newCert[e.target.name] = value;
      }
      return newCert;
    });
    setCertifications(newCertification);
  };

  const handleChangeCertificateOption = (e, certId, certOptionId) => {
    const { value } = e.target;
    const newCertification = certifications.map((cert) => {
      if (cert.id === certId) {
        cert.options.map((option) => {
          const newOption = option;
          if (option.id === certOptionId) {
            newOption.text = value;
          }
          return newOption;
        });
      }
      return cert;
    });
    setCertifications(newCertification);
  };

  const addCertificateOption = (certId) => {
    const newCertification = certifications.map((cert) => {
      if (cert._id === certId) {
        cert.options.push({
          id: new Date().getTime(),
          text: "",
        });
      }
      return cert;
    });
    setCertifications(newCertification);
  };

  const deleteCertOption = (certId, certOptionId) => {
    const newCertification = certifications.map((cert) => {
      const newCert = cert;
      if (cert._id === certId) {
        newCert.options = cert.options.filter(
          (option) => option.id !== certOptionId
        );
      }
      return newCert;
    });
    setCertifications(newCertification);
  };

  const deleteCertification = (id) => {
    const newCertification = certifications.filter((item) => item._id !== id);
    setCertifications(newCertification);
  };

  const handleToggleCertificateOption = (e, _id) => {
    const newCertification = certifications.map((item) => {
      const newItem = item;
      if (item._id === _id) {
        newItem.isMoreOptionChecked = !item.isMoreOptionChecked;
        return newItem;
      }
      return newItem;
    });
    setCertifications(newCertification);
  };

  return (
    visible && (
      <div
        onClick={handleClose}
        className="fixed top-0 left-0 h-full overflow-y-auto z-50 bg-black-100 w-full "
      >
        <div
          className="flex items-start justify-end h-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className=" bg-white rounded-full p-2 fixed top-2  right-2 xs:left-auto xs:right-500"
            onClick={handleClose}
            role="button"
            tabIndex="0"
            onKeyPress={(e) =>
              runFunctionWhenSpaceOrEnterIsClicked(e, handleClose)
            }
          >
            <img src={closeModalBtn} alt="close button" />
          </div>
          <div className="bg-white min-h-screen p-5 pt-10 sm:p-10 w-full max-w-480 ">
            <h4 className="text-22 text-gray-400 mb-3 font-BeatriceSemiBold">
              Certifications
            </h4>
            <p className="text-gray-200 text-base mb-10">
              Add and remove certifications
            </p>

            <form>
              <div>
                {certifications.map((cert) => {
                  const {
                    id,
                    _id,
                    isMoreOptionChecked,
                    name: certName,
                    description,
                    url,
                    options,
                  } = cert;

                  return (
                    <div
                      className="rounded-lg border border-gray-800 mb-6"
                      key={id || _id}
                    >
                      <div className="flex justify-between items-center px-3">
                        <input
                          type="text"
                          className="border-0 w-3/4 p-0 pl-2 text-gray-400 outline-none placeholder-gray-700 leading-tight focus:ring-0 focus:border-transparent focus:outline-none focus:shadow-none text-sm"
                          placeholder="name"
                          name="name"
                          value={certName}
                          onChange={(e) => handleChangeCertInputs(e, _id)}
                        />
                        <div className="flex  justify-between items-center flex-shrink-0">
                          <div className="flex justify-between items-center m-4">
                            <p className="text-gray-400 font-medium mr-3">
                              Add options
                            </p>

                            <div className="relative">
                              <input
                                type="checkbox"
                                // id={index + 1}
                                onChange={(e) =>
                                  handleToggleCertificateOption(e, _id)
                                }
                                checked={isMoreOptionChecked}
                                className="sr-only"
                                tabIndex="-1"
                              />
                              <div
                                role="button"
                                tabIndex="0"
                                aria-label="Toggle certification options"
                                onKeyPress={(e) =>
                                  runFunctionWhenSpaceOrEnterIsClicked(e, () =>
                                    handleToggleCertificateOption(e, _id)
                                  )
                                }
                                className="toggle-bg bg-gray-200 border-2 border-gray-200 h-4 w-5 rounded-full"
                                onClick={(e) =>
                                  handleToggleCertificateOption(e, _id)
                                }
                              />
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => deleteCertification(_id)}
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </div>

                      <div className="border-t border-gray-800 p-4">
                        <textarea
                          rows="3"
                          type="text"
                          className="border-0 w-full p-0 pl-1 text-gray-400 outline-none placeholder-gray-700 leading-tight focus:ring-0 focus:border-transparent focus:outline-none focus:shadow-none text-sm resize-y overflow-auto"
                          placeholder="Add a description"
                          name="description"
                          value={description}
                          onChange={(e) => handleChangeCertInputs(e, _id)}
                        />
                      </div>
                      <div
                        className={`border-t  border-gray-800 p-4 ${
                          isMoreOptionChecked && "border-b"
                        }`}
                      >
                        <input
                          type="text"
                          onChange={(e) => handleChangeCertInputs(e, _id)}
                          className={`border-0 p-0 pl-2 text-gray-400 outline-none placeholder-gray-700 leading-tight focus:ring-0 focus:border-transparent focus:outline-none focus:shadow-none text-sm `}
                          placeholder="URL"
                          name="url"
                          value={url}
                        />
                      </div>
                      {isMoreOptionChecked && (
                        <>
                          {options?.map((option) => (
                            <div
                              key={option.id}
                              className=" border-gray-800 ml-10"
                            >
                              <div className="border-b border-gray-800 flex justify-between items-center">
                                <input
                                  type="text"
                                  className="border-0 p-0  text-gray-400 outline-none placeholder-gray-700 leading-tight focus:ring-0 focus:border-transparent focus:outline-none focus:shadow-none text-sm py-3 w-full"
                                  placeholder="Add an option"
                                  value={option.text}
                                  onChange={(e) =>
                                    handleChangeCertificateOption(
                                      e,
                                      id,
                                      option.id
                                    )
                                  }
                                />
                                <button
                                  type="button"
                                  className="px-4 border-l border-gray-800"
                                  onClick={() =>
                                    deleteCertOption(_id, option.id)
                                  }
                                >
                                  <TrashIcon />
                                </button>
                              </div>
                            </div>
                          ))}
                          <button
                            type="button"
                            className="py-3 text-purple-100 font-bold ml-10"
                            onClick={() => addCertificateOption(_id)}
                          >
                            Add another option
                          </button>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
              <button
                type="button"
                className="mb-6 text-purple-100 font-bold"
                onClick={addMoreCertifications}
              >
                Add new certification
              </button>

              {certifications.length > 0 && (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={disableCertificationbutton()}
                  className="w-full h-12 bg-orange-200 rounded-full text-white text-sm font-BeatriceSemiBold disabled:opacity-60 disabled:cursor-not-allowed "
                >
                  {isCreateCertificationsLoading ||
                  isStylistUpdateLoading ||
                  isUpdateCertificationsLoading ? (
                    <Loadersmall />
                  ) : (
                    "Save changes"
                  )}
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    )
  );
}

export const useManageCertificationModal = () => {
  const [visible, setVisible] = useState(false);
  const handleClose = () => {
    toggleFixedAppLayout();
    setVisible(false);
  };
  const renderModal = ({ certifications }) => {
    return (
      <ManageCertificationModal
        visible={visible}
        handleClose={handleClose}
        certifications={certifications}
      />
    );
  };

  const show = () => setVisible(true);

  return { show, renderModal };
};

export default ManageCertificationModal;
