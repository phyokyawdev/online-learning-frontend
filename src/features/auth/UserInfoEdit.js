import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Field, Form, FieldArray } from "formik";
import { selectCurrentUser, updateUserInfo } from "./authSlice";
import { ImagePicker, Modal } from "../../common/components";
import { Link, useNavigate } from "react-router-dom";

const UserInfoEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const current_user = useSelector(selectCurrentUser);
  if (!current_user) return;

  const initialValues = {
    username: current_user.username,
    email: current_user.email,
    profile_link: current_user.userinfo.profile_link || "",
    headline: current_user.userinfo.headline || "",
    bio: current_user.userinfo.bio || "",
    socials: current_user.userinfo.socials || [],
  };

  const content = (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        dispatch(updateUserInfo(values));
        navigate("/profile");
      }}
    >
      {({ values, setFieldValue }) => (
        <Form id="profile-form" className="ui form">
          <div className="ui stackable two column relaxed grid">
            <div className="six wide column">
              <div className="field">
                <ImagePicker
                  src={values.profile_link}
                  handleLoadEnd={(image) => {
                    setFieldValue("profile_link", image);
                  }}
                  className="ui medium rounded image"
                  alt="profile image"
                  style={{
                    width: "300px",
                    height: "196px",
                  }}
                />
              </div>
              <div className="field">
                <label>User Name</label>
                <input placeholder={values.username} readOnly type="text" />
              </div>
              <div className="field">
                <label>Email</label>
                <input placeholder={values.email} readOnly type="text" />
              </div>
            </div>
            <div className="ten wide column">
              <div className="field">
                <label htmlFor="headline">Headline</label>
                <Field id="headline" name="headline" tabIndex="1" />
              </div>
              <div className="field">
                <label htmlFor="bio">Bio</label>
                <Field
                  as="textarea"
                  rows="4"
                  id="bio"
                  name="bio"
                  tabIndex="2"
                />
              </div>
              <div className="field">
                <label htmlFor="socials">Socials</label>
                <FieldArray name="socials">
                  {({ insert, remove, push }) => (
                    <div>
                      {values.socials &&
                        values.socials.length > 0 &&
                        values.socials.map((social, index) => (
                          <div key={index} className="ui action input">
                            <Field name={`socials.${index}`} />
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="ui button"
                            >
                              Delete
                            </button>
                          </div>
                        ))}
                      <button
                        type="button"
                        className="ui button"
                        onClick={() => push("")}
                        tabIndex="3"
                      >
                        Add Social
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );

  const actions = (
    <>
      <Link to="/profile" className="ui button negative">
        Cancel
      </Link>
      <button
        form="profile-form"
        type="submit"
        className="ui button primary"
        tabIndex="4"
      >
        Submit
      </button>
    </>
  );

  return (
    <Modal
      title="Edit User Info"
      content={content}
      actions={actions}
      onDismiss={() => navigate("/profile")}
    />
  );
};

export default UserInfoEdit;
