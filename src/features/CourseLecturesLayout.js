import React from "react";

const CourseLecturesLayout = ({ formOne, formTwo, actions }) => {
  return (
    <div className="ui form">
      <div className="ui stackable two column relaxed centered grid">
        <div className="six wide column">{formOne}</div>
        <div className="ten wide column">
          {formTwo}
          {actions}
        </div>
      </div>
    </div>
  );
};

export default CourseLecturesLayout;
