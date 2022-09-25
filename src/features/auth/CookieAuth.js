import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { setUser } from "./authSlice";

const CookieAuth = () => {
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies("token");

  useEffect(() => {
    // if no cookies return
    if (Object.keys(cookies).length == 0) return;

    // if specific token not exist, return
    const { token } = cookies;
    if (!token) return;

    // parse token and destructure jwt
    const { jwt } = JSON.parse(atob(token));
    if (!jwt) return;

    const user = jwtDecode(jwt);
    delete user.iat;
    delete user.exp;

    dispatch(setUser(user));
  });

  return null;
};

export default CookieAuth;
