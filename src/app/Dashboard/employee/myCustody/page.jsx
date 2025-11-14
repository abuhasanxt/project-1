import React from "react";
import { CiWarning } from "react-icons/ci";

const page = () => {
  return (
    <div className="min-h-screen bg-gray-200 p-10">
      <h2 className="text-xl font-semibold text-blue-500 bg-white p-2">
        My Custody
      </h2>
      <h2 className=" bg-white px-2 py-5 mt-2 flex items-center gap-2">
       <CiWarning className="text-2xl" /> <span>No records were found</span>
      </h2>
    </div>
  );
};

export default page;
