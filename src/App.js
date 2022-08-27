import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Create from "./components/create";
import Login from "./components/login";
import Home from "./components/home";
import Search from "./components/search";
import CreatePost from "./components/addPost";
import MyPosts from "./components/myPosts";
import "./background.css";

const App = () => {

  return (
    <div className="backg" >
      <Routes>
        <Route path="/home" element={<Home />} Route />
        <Route path="/friendUser" element={<Search />} Route />
        <Route path="/createPost" element={<CreatePost />} Route />
        <Route path="/myPosts" element={<MyPosts />} Route />
        <Route path="/" element={<Create />} />
        <Route path="/login" element={<Login />} />
      </Routes>

    </div>
  );
};

export default App;