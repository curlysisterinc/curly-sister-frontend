import React from "react";

function Services({ getStylist }) {
  return (
    <div>
      {getStylist?.services?.length > 0 && (
        <div className="">
          <p className="text-base text-gray-400">Services</p>
          <div className="flex  items-center justify-start flex-wrap mt-5">
            {getStylist?.services.map((service) => {
              return (
                <div className="rounded-full mb-3 mr-3 px-3 py-2 border whitespace-nowrap border-purple-100 bg-white text-purple-100 text-sm">
                  {service.name}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Services;
