import React from "react";
import { DropdownArrow } from "components/customdropdown/primitive/DropDownMenuContent";
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";
import { Loadersmall } from "components/loader-component/loader";
import DropDown from "../../../primitive";
import kebabIcon from "../../../../../assets/images/kebab.svg";
import Content from "./content";

function AdminDropDown({
  status,
  deteleAction,
  activateAction,
  isLoading,
  mkStylistAction,
  changeAdminToUser,
}) {
  return (
    <DropDown
      content={
        <Content
          status={status}
          deteleAction={deteleAction}
          activateAction={activateAction}
          mkStylistAction={mkStylistAction}
          changeAdminToUser={changeAdminToUser}
        />
      }
    >
      <button
        type="button"
        className="hover:bg-gray-500 rounded-full  flex justify-center items-center p-2"
      >
        {isLoading ? (
          <Loadersmall />
        ) : (
          <img src={kebabIcon} alt="kebab icon" className="h-5 w-5" />
        )}
      </button>
    </DropDown>
  );
}

export default AdminDropDown;
