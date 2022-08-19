import clsx from "clsx";
import React from "react";
import dropdownIcon from "../../assets/images/dropdown.svg";

export function AccordionItem({
  title,
  isOpen,
  children,
  handleClickItem,
  disabled,
}) {
  const toggletab = () => handleClickItem(title);
  return (
    <div className={`mx-auto w-full mt-8 ${disabled && "cursor-not-allowed"}`}>
      <button
        type="button"
        aria-controls="content-location"
        aria-expanded={isOpen}
        id="accordion-location"
        name="locationTab"
        onClick={toggletab}
        disabled={disabled}
        // disabled={!activeTab.locationTab}
        className={`bg-gray-600 p-3 rounded-lg flex justify-between items-center w-full cursor-pointer
        disabled:opacity-60 disabled:cursor-not-allowed ${
          disabled && "cursor-not-allowed"
        } }
        `}
      >
        <p className={`${isOpen ? "opacity-100" : "opacity-40"}`}> {title}</p>
        <img
          className={clsx(isOpen && "transform rotate-180", "ml-12 ")}
          src={dropdownIcon}
          alt=""
        />
      </button>
      {isOpen && <div className="px-1 w-full mt-8">{children}</div>}
    </div>
  );
}
