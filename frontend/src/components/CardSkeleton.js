import React from "react";

// card skeleton shows up when Card data is loading
const CardSkeleton = (props) => {
  return (
    <div className="w-full md:w-64">
      <div className="card bg-white dark:bg-[#262626] p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-200 hover:cursor-pointer flex flex-col h-full group animate-pulse">
        {/* Skeleton for Image */}
        <div className="relative overflow-hidden rounded-t-md h-48 bg-gray-300 dark:bg-gray-600"></div>

        {/* Skeleton for Text */}
        <div className="flex-1 mt-4 space-y-4 px-2">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
        </div>

        {/* Skeleton for Bid and Button */}
        <div className="flex mt-2 justify-between items-center px-2">
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
          </div>
          <div className="bg-gray-300 dark:bg-gray-600 h-10 w-28 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
