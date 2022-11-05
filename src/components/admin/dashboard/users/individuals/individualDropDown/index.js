import DropDown from "components/customdropdown/primitive";
import React from "react";
// import DropDown from "../../../primitive";
import kebabIcon from "assets/images/kebab.svg";
import useSuspendOrActivateUser from "hooks/data/admin/useSuspendOrActivateUser";
import useDeleteIndividual from "hooks/data/admin/useDeleteIndividual";
import { Loadersmall } from "components/loader-component/loader";
import Content from "./content";

function IndividualDropDown({ user }) {
  const {
    isLoading: isSuspendOrActivateUserLoading,
    mutate: suspendOrActivateUser,
  } = useSuspendOrActivateUser();
  const { isLoading: isDeleteUserLoading, mutate: deleteUser } =
    useDeleteIndividual();

  const toggleActivation = () => {
    suspendOrActivateUser({
      userId: user._id,
      status: !user.active,
    });
  };

  const handleDeleteUser = () => {
    deleteUser({
      userId: user._id,
    });
  };

  const isLoading = isSuspendOrActivateUserLoading || isDeleteUserLoading;
  return (
    <DropDown
      content={
        <Content
          status={user.active}
          toggleActivation={toggleActivation}
          handleDeleteUser={handleDeleteUser}
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

export default IndividualDropDown;
