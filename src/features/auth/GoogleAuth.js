import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser, signIn, signOut } from "./authSlice";

const GoogleAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const current_user = useSelector(selectCurrentUser);

  const [client, setClient] = useState(null);

  useEffect(() => {
    setClient(
      window.google.accounts.oauth2.initCodeClient({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope: "email profile",
        ux_mode: "popup",
        callback: (response) => {
          dispatch(signIn(response.code));
        },
      })
    );
  }, [dispatch]);

  const onSignInClick = async () => {
    client.requestCode();
  };

  const onSignOutClick = () => {
    dispatch(signOut());

    // delete cookie
    navigate("/");
  };

  if (!client) return;

  if (current_user) {
    return (
      <button onClick={onSignOutClick} className="ui red google button">
        <i className="google icon" />
        Sign Out
      </button>
    );
  }

  return (
    <button onClick={onSignInClick} className="ui red google button">
      <i className="google icon" />
      Sign In With Google
    </button>
  );
};

export default GoogleAuth;
