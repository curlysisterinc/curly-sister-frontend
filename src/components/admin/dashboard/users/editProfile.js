import React from "react";

function EditProfile() {
  return (
    <div className="flex items-start">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate(AuthRoutes.dashboard)}
      >
        <img className="mr-2" src={backArrow} alt="back arrow" />
        Go Back
      </div>
      <div className="ml-16 w-4/6 flex justify-between items-center"></div>
    </div>
  );
}

export default EditProfile;
