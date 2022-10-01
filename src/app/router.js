import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
} from "react-router-dom";
import { UserInfoEdit } from "../features/auth";
import { CourseLectures, Header, Students, Profile } from "../features";

const Layout = () => {
  return (
    <div className="pusher">
      <Header />
      <div className="ui container">
        <Outlet />
      </div>
    </div>
  );
};

const Home = () => <div>Home</div>;

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="own-courses" element={<Outlet />}>
        <Route path="create" element={<CourseLectures />} />
      </Route>
      <Route path="profile" element={<Profile />}>
        <Route path="edit" element={<UserInfoEdit />} />
      </Route>
      <Route path="students" element={<Outlet />}>
        <Route index element={<Students />} />
      </Route>
    </Route>
  )
);
