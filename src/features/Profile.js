import React from "react";
import { Outlet } from "react-router-dom";
import { UserInfoShow } from "./auth";

const Profile = () => {
  return (
    <div className="ui stackable grid">
      <div className="six wide column">
        <UserInfoShow />
        <Outlet />
      </div>
      <div className="ten wide column">User Courses</div>
    </div>
  );
};

export default Profile;
