import React from "react";
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
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      appElement={document.getElementById("root")}
      ariaHideApp={process.env.NODE_ENV !== "test"}
      contentLabel={ariaLabel}
      testId="modal-content"
      style={{
        overlay: {
          ...ReactModal.defaultStyles.overlay,
          backgroundColor: "red" || "rgba(0, 0, 0, 0.25)",
          zIndex: 999,
          overflow: "auto",
        },
        content: {
          backgroundColor: "transparent",
          border: "none",
          // padding: "20px",
        },
      }}
    >
      {/* <CloseIcon
        role="button"
        tabIndex={0}
        onClick={onRequestClose}
        className="fixed h-10 w-10 top-4 right-4 cursor-pointer translate-y-0 hover:opacity-90 md:top-10 md:right-10"
      /> */}
      <button
        type="button"
        tabIndex={0}
        onClick={onRequestClose}
        className={`fixed h-10 w-10 top-5 right-5 cursor-pointer translate-y-0 hover:opacity-90 bg-white rounded-full flex items-center justify-center ${closeButtonStyle}`}
      >
        <AiOutlineCloseCircle size={34} />
      </button>
      {children}
    </ReactModal>
  );
}

export default Modal;
