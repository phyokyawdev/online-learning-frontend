import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCurrentUser } from "./authSlice";

const UserInfoShow = () => {
  const current_user = useSelector(selectCurrentUser);
  if (!current_user) return;

  const { username, email, userinfo } = current_user;
  const { profile_link, headline, bio, socials } = userinfo;

  const image = (
    <div className="image">
      <img src={profile_link} />
    </div>
  );

  const content = (
    <div className="content">
      <Link to="/profile/edit" className="right floated edit">
        <i className="edit icon"></i>
        Edit
      </Link>
      <span className="header">{username}</span>
      <div className="meta">
        <span className="date">{headline}</span>
      </div>
      <div className="description">{bio}</div>
    </div>
  );

  const extraContents = (
    <div className="extra content">
      <a>
        <i className="mail icon"></i>
        {email}
      </a>
      {socials &&
        socials.map((social, index) => (
          <a key={index}>
            <i className="at icon"></i>
            {social}
          </a>
        ))}
    </div>
  );

  return (
    <div className="ui card">
      {image}
      {content}
      {extraContents}
    </div>
  );
};

export default UserInfoShow;
