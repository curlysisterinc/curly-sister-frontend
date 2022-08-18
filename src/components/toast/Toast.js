import React from "react";
import { ReactComponent as CloseIcon } from "./assets/close.svg";
import { ReactComponent as AlertDanger } from "./assets/alert-danger.svg";
import { ReactComponent as AlertSuccess } from "./assets/alert-success.svg";
import { ReactComponent as AlertInfo } from "./assets/alert-info.svg";

export function CustomToast({ children, ...props }) {
  const { appearance, onDismiss } = props;

  const bg = () => {
    switch (appearance) {
      case "error":
        return { background: "bg-alert-error", icon: <AlertDanger /> };
      case "success":
        return { background: "bg-alert-success", icon: <AlertSuccess /> };
      case "warning":
        return { background: "bg-alert-warning", icon: <AlertInfo /> };
      case "info":
        return { background: "bg-alert-info", icon: <AlertInfo /> };
      default:
        return { background: "bg-alert-info", icon: <AlertInfo /> };
    }
  };
  return (
    <div
      className={`${
        bg().background
      } rounded-lg p-2 mb-2 flex justify-between max-w-md w-full text-white text-sm`}
    >
      <div className="h-5">{bg().icon}</div>
      <div className="flex-1 px-2">{children}</div>
      <div className="h-5">
        <CloseIcon
          role="button"
          tabIndex={0}
          onClick={() => onDismiss("i")}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
}
