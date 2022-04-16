import React from "react";

function FollowersTableRow(props) {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
      >
        {props.follower.from_name}
      </th>
    </tr>
  );
}

export default FollowersTableRow;
