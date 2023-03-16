import React from "react";

export function AdminTable({ onMasterCheck, children }) {
  return (
    <div className="flex flex-col mt-4">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="max-h-screen-250px overflow-auto shadow-s01 border border-gray-600 rounded-2xl">
            <table className="min-w-full text-left rounded-2xl pb-40">
              <thead className="bg-gray-50 uppercase text-sm text-gray-300 sticky z-50 -top-px">
                <tr>
                  <th scope="col ">
                    <input
                      type="checkbox"
                      className="ml-3"
                      id="mastercheck"
                      onChange={onMasterCheck}
                    />
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-400 px-6 py-4"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-400 px-6 py-4"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className=" text-sm font-medium text-gray-400 px-6 py-4"
                  >
                    Date joined
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-400 px-6 py-4"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-400 px-6 py-4"
                    aria-label="extra action"
                  />
                </tr>
              </thead>
              <tbody className="">{children}</tbody>
            </table>
            <div className="my-10" />
          </div>
        </div>
      </div>
    </div>
  );
}
