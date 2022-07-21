/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-else-return */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-shadow */
/* eslint-disable import/order */
import React, { useState } from "react";
import SideBarComponent from "../../sidebar/sidebar";
import admin from "../../../api/admin";
import FilterPanel from "./filterPanel";
import StylistList from "./StylistList";

function Stylist() {
  const [selectBookableStylist, setSelectBookableStylist] = useState(false);
  const [categories, setCategories] = useState("all-stylist");
  const [certifications, setCertifications] = useState([
    {
      id: 1,
      checked: false,
      label: "Deva",
    },
    {
      id: 2,
      checked: false,
      label: "Quidad",
    },
    {
      id: 3,
      checked: false,
      label: "Ketch",
    },
  ]);
  const [getServices, setGetServices] = useState([]);
  const [filteredArr, setFilteredArr] = useState([]);
  const [getStylist, setGetStylist] = React.useState([]);
  const handleSelectToggle = () => {
    // console.log("handleSelectToggle", selectBookableStylist);
    setSelectBookableStylist(!selectBookableStylist);
  };

  const handleSelectCategory = (e) => {
    setCategories(e.target.value);
  };

  const handleOnCheckboxChange = (id, value) => {
    const newArr = certifications;
    const getCheckedItems = newArr.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setCertifications(getCheckedItems);
  };

  const applyFilter = () => {
    let updatedList = filteredArr;
    // console.log(updatedList, "all");
    if (selectBookableStylist === true) {
      updatedList = updatedList.filter((item) => item.services.length > 0);
      // setGetStylist(updatedList);
      console.log(updatedList, "services available");
    }

    if (categories !== "all-stylist") {
      updatedList = updatedList.filter(
        (item) => item.category_type === categories
      );
      console.log(updatedList, "all stylist");
    }

    // const checkCertificates = certificationsAndTags
    //   .filter((item) => item.checked)
    //   .map((item) => item.label.toLocaleLowerCase());
    // if (checkCertificates.length) {
    //   updatedList = updatedList.filter((item) =>
    //     checkCertificates.includes(item.certifications)
    //   );
    // }
    setGetStylist(updatedList);
  };

  React.useEffect(() => {
    const fetchData = () => {
      admin.GetAllStylists().then((response) => {
        console.log(response.data);
        setGetStylist(response.data.stylists);

        setFilteredArr(response.data.stylists);
      });
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    const fetchData = () => {
      admin.GetServices().then((response) => {
        console.log(response.data.data);
        setGetServices(response.data.data);
      });
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    applyFilter();
  }, [selectBookableStylist, categories]);

  return (
    <div className="max-w-screen-2xl w-full flex m-auto border border-gray-50">
      <SideBarComponent active="stylists" />
      <div className="ml-80 bg-white px-10 pt-14 w-full min-h-screen">
        <FilterPanel
          selectToggle={handleSelectToggle}
          selectBookableStylist={selectBookableStylist}
          certifications={certifications}
          handleOnCheckboxChange={handleOnCheckboxChange}
          categories={categories}
          handleSelectCategory={handleSelectCategory}
          getServices={getServices}
        />
        <hr className="w-full border border-gray-600 mt-8" />
        <StylistList list={getStylist} />
      </div>
    </div>
  );
}

export default Stylist;
