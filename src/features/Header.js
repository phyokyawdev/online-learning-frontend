import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GoogleAuth, CookieAuth } from "./auth";
import { isLoggedIn, isTeacher } from "./auth/authSlice";

const Header = () => {
  const _isLoggedIn = useSelector(isLoggedIn);
  const _isTeacher = useSelector(isTeacher);
  //ui huge borderless secondary menu
  return (
    <div className="following bar">
      <div className="ui container">
        <div className="ui large borderless secondary menu">
          <Link to="/" className="header item">
            Online Learning
          </Link>
          <div className="right menu">
            {_isLoggedIn && (
              <>
                {_isTeacher && (
                  <Link to="/own-courses" className="item">
                    Own Courses
                  </Link>
                )}
                <Link to="/profile" className="item">
                  Profile
                </Link>
              </>
            )}
            <GoogleAuth />
            <CookieAuth />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
