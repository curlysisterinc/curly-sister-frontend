import React, { useEffect } from "react";
import ReactModal, { Props } from "react-modal";
import { AiOutlineCloseCircle } from "react-icons/ai";
// import { ReactComponent as CloseIcon } from "./assets/close.svg";

function Modal({
  children,
  ariaLabel = "Alert Modal",
  isOpen,
  onRequestClose,
  overlayColor,
  closeButtonStyle,
}) {
  // const { isOpen, children, onRequestClose } = props;
  useEffect(() => {
    const content = document.querySelector("#content");
    if (isOpen) {
      content.style.position = "fixed";
    } else {
      content.style.position = "unset";
      content.style.position = "initial";
    }
  }, [isOpen]);

  const handleCloseModal = () => {
    const content = document.querySelector("#content");
    content.style.position = "unset";
    content.style.position = "initial";
    onRequestClose();
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      appElement={document.getElementById("root")}
      ariaHideApp={process.env.NODE_ENV !== "test"}
      contentLabel={ariaLabel}
      testId="modal-content"
      style={{
        overlay: {
          ...ReactModal.defaultStyles.overlay,
          backgroundColor: overlayColor || "rgba(0, 0, 0, 0.25)",
          zIndex: 999,
          overflow: "auto",
        },
        content: {
          backgroundColor: "transparent",
          border: "none",
          padding: "0px",
          inset: window.innerWidth < 500 ? "10px" : "40px",
          width: "fit-content",
          height: "fit-content",
          margin: "auto",
        },
      }}
    >
      {/* <CloseIcon
        role="button"
        tabIndex={0}
        onClick={onRequestClose}
        className="fixed h-10 w-10 top-4 right-4 cursor-pointer translate-y-0 hover:opacity-90 md:top-10 md:right-10"
      /> */}
      <div className="relative">
        <button
          type="button"
          tabIndex={0}
          onClick={handleCloseModal}
          className={`fixed h-10 w-10 top-2 right-5 cursor-pointer translate-y-0 hover:opacity-90 bg-white rounded-full flex items-center justify-center ${closeButtonStyle} z-300`}
        >
          <AiOutlineCloseCircle size={34} />
        </button>
        {children}
      </div>
    </ReactModal>
  );
}

export default Modal;
