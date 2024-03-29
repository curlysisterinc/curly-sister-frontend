import React from "react";
import bookIcon from "../../../../assets/images/book.svg";
import bookIconOutlined from "../../../../assets/images/book-outlined.svg";

function ToggleBookedService({
  toggleServiceAvailability,
  isServiceAvailable,
  handleSearchAddress,
}) {
  const handleServiceAvailability = () => {
    handleSearchAddress({ services: "" });
    toggleServiceAvailability();
  };

  return (
    <button
      onClick={handleServiceAvailability}
      type="button"
      className={`cursor-pointer h-10 flex items-center space-x-2 border rounded-full placeholder:text-sm mb-2 placeholder:text-gray-300 px-4 ${
        isServiceAvailable
          ? "bg-gray-550 border-purple-100"
          : "bg-white border-gray-600"
      }`}
    >
      {isServiceAvailable ? (
        <img src={bookIconOutlined} alt="" />
      ) : (
        <img src={bookIcon} alt="" />
      )}
      <p className="text-gray-400 text-sm">Service booking available</p>
    </button>
  );
}

export default ToggleBookedService;
