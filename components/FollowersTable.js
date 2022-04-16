import React from "react";
import FollowersTableRow from "./FollowersTableRow";
import FollowersTableHead from "./FollowersTableHead";

function FollowersTable(props) {
  return (
    <div className="mt-5 relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <FollowersTableHead />
        <tbody>
          {props.followers.map((follower, i) => (
            <FollowersTableRow key={i} follower={follower} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FollowersTable;
