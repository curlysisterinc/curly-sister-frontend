import React from "react";

function Certifications({ getStylist }) {
  return (
    <div>
      {getStylist?.certifications?.length > 0 && (
        <div className="">
          <p className="text-base text-gray-400">Certifications</p>
          <div className="flex justify-start flex-wrap items-center mt-5">
            {getStylist.certifications.map((item) => {
              return (
                <div className="rounded-full mb-3 mr-3 px-3 py-2 border whitespace-nowrap border-purple-100 bg-white text-purple-100 text-sm">
                  {item.name}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Certifications;
