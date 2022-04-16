import React from "react";

function FollowersTableHead(props) {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          Name
        </th>
      </tr>
    </thead>
  );
}

export default FollowersTableHead;
