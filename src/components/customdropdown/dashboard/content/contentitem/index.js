import React from "react";
import { Loadersmall } from "components/loader-component/loader";
import DropDown from "../../../primitive";
import { ReactComponent as KebabIcon } from "../../../../../assets/images/kebab.svg";
import Content from "./content";

function ContentDropDown({
  status,
  type,
  handleDeleteContent,
  editAction,
  publishAction,
  isLoading,
}) {
  return (
    <DropDown
      content={
        <Content
          status={status}
          type={type}
          handleDeleteContent={handleDeleteContent}
          editHandler={editAction}
          publishHandler={publishAction}
        />
      }
    >
      <button
        type="button"
        className="hover:bg-gray-500 rounded-full flex justify-center items-center p-2"
      >
        {isLoading ? <Loadersmall /> : <KebabIcon height={20} width={20} />}
      </button>
    </DropDown>
  );
}

export default ContentDropDown;
