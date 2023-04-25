// Import Modules_
import React from "react";
import { Routes, Route } from "react-router-dom";

// Import Components_
import Feed from "../Pages/Feed";
import Create from "../Pages/Create";
import People from "../Pages/People";
import Home from "../Pages/Home";
import { Profile } from "./Profile";
import Edit from "./EditProfile";
import ProfileComp from "./ProfileComp";
import Admin from "./Admin";

// Export Component_
function Allroutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/feed" element={<Feed />}></Route>
      <Route path="/create" element={<Create />}></Route>
      <Route path="/people" element={<People />}></Route>
      <Route path="/bio" element={<Profile />}></Route>
      <Route path="/edit" element={<Edit />}></Route>
      <Route path="/profile" element={<ProfileComp />}></Route>
      <Route path="/profile/:name" element={<ProfileComp />}></Route>
      <Route path="/admin" element={<Admin />}></Route>
    </Routes>
  );
}

export default Allroutes;
