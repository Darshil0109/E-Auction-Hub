import React from 'react';

const BidHistory = (props) => {
  return (
    <tr className="bg-white border-b hover:bg-gray-50">
        <th scope="row" className="px-4 py-4 font-medium text-gray-900">
            {props.bid_Item.title}
        </th>
        <td className="px-4 py-4">Laptop</td>
        <td className="px-4 py-4">$2999</td>
        <td className="px-4 py-4">2024-08-16T13:13:53+05:30</td>
        <td className="px-4 py-4 text-right">
            <a href="/" className="font-medium text-blue-600 hover:underline">
            Edit
            </a>
        </td>
    </tr>

  );
};

export default BidHistory;
