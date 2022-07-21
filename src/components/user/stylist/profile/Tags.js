import React from "react";

function Tags({ getStylist }) {
  return (
    <div>
      {getStylist?.tags?.length > 0 && (
        <div className="">
          <p className="text-base text-gray-400">Tags</p>
          <div className="flex flex-wrap justify-start items-center mt-5">
            {getStylist?.tags.map((tag) => {
              return (
                <div className="rounded-full px-3 mr-3 py-2 border whitespace-nowrap border-purple-100 bg-white text-purple-100 text-sm">
                  {tag.name}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Tags;
