import Loader from "components/loader-component/loader";
import useGetStylistById from "hooks/data/admin/useGetStylistById";
import useUpdateStylist from "hooks/data/admin/useUpdateStylist";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStylistPage } from "./stylistPage";

export function EditStylist() {
  const stylistpage = useStylistPage();
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    isLoading: isStylistLoading,
    data: stylistData,
    isError: stylistError,
  } = useGetStylistById(id);

  const {
    isLoading: isStylistUpdateLoading,
    data: stylistUpdateData,
    isError: stylistUpdateError,
    mutate: updateStylist,
  } = useUpdateStylist(id);

  const handleEditStylist = (values) => {
    updateStylist({ ...values, id });
  };

  // const handleUpdateStyistDetail = () => {
  //   const id = localStorage.getItem("createdStylist");
  //   if (id !== null) {
  //     const updateValue = JSON.stringify({ ...stylistValues, id });
  //     updateStylist(updateValue);
  //   }
  // };
  if (stylistError) {
    return navigate(-1) || navigate("/dashboard/users/stylists");
  }
  if (isStylistLoading) {
    return (
      <div className="bg-white w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  return stylistpage.renderPage({
    mode: "EDIT",
    stylistData: stylistData?.data?.stylist,
    handleEditStylist,
    isLoading: isStylistUpdateLoading,
  });
}

export default EditStylist;
