import React from 'react'

const CardSkeleton = (props) => {
  return (
    <div className="w-full md:w-64">
        <div className="card h-80 p-2 rounded-lg border border-gray-200 flex flex-col justify-evenly animate-pulse">
            <div className="relative overflow-hidden rounded-t-md h-48 bg-gray-300"></div>
            <div className="flex-1 mt-4 space-y-4 px-2">
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
            <div className="flex mt-2 justify-around items-center">
                <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                    <div className="h-6 bg-gray-300 rounded w-24"></div>
                </div>
                <div className="bg-gray-300 h-10 w-28 rounded-md"></div>
            </div>
        </div>
    </div>
  )
}

export default CardSkeleton
