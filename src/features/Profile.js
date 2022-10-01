import React from "react";
import { Link, Outlet } from "react-router-dom";
import { UserInfoShow } from "./auth";

const Profile = () => {
  return (
    <div className="ui stackable grid">
      <div className="six wide column">
        <UserInfoShow />
        <Outlet />
      </div>
      <div className="ten wide column">
        <Link to="/own-courses/create">Create New Course</Link>
      </div>
    </div>
  );
};

export default Profile;
