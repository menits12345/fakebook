import React from "react";
import "../styles/centered.css";
import "../styles/topnav.css";
import "../styles/bm-burger.css";
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap/dist/js/bootstrap.bundle';

import icon from "../assets/logo.png";
import outIcon from "../assets/signoutLogo.png";

import { BrowserView, MobileView } from 'react-device-detect';
import { slide as Menu } from 'react-burger-menu'
// We import NavLink to utilize the react router.
import { Link, NavLink } from 'react-router-dom';


// Here, we display our Navbar
export default function Navbar() {
    return (
        <>
            <BrowserView style={{ position: 'sticky', top: '0' }}>
                <nav class="navbar navbar-expand navbar-dark" sticky="top" style={{ background: "#83aeff", position: 'sticky', top: '0', width: '100%', display: 'flex' }}>
                    <NavLink to="/home" className="navbar-brand"> <img src={icon} alt="" width="300" ></img></NavLink>
                    <div className="collpase navbar-collapse">
                        <ul className="navbar-nav mr-auto" style={{ border: "white", position: 'sticky' }}>
                            <li className="topnav">
                                <NavLink to="/home" className="nav-link"  >Home</NavLink>
                            </li>
                        </ul>
                        <ul className="navbar-nav mr-auto" style={{ border: "white", position: 'sticky' }}>
                            <li className="topnav">
                                <NavLink to="/myPosts" className="nav-link">My Posts</NavLink>
                            </li>
                        </ul>
                        <ul className="navbar-nav mr-auto" style={{ position: 'sticky' }}>
                            <li className="topnav">
                                <NavLink to="/friendUser" className="nav-link"  >Friends</NavLink>
                            </li>
                        </ul>
                        <ul className="navbar-nav mr-auto" style={{ position: 'sticky' }}>
                            <li className="topnav">
                                <NavLink to="/createPost" className="nav-link" >Create Post</NavLink>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto" style={{ position: 'sticky' }}>
                            <li className="navbar-item">
                                <NavLink to="/" className="nav-link"><img src={outIcon} alt="" width="50" ></img></NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            </BrowserView>
            <MobileView style={{ position: 'sticky', top: '0' }}>
                <nav class="navbar navbar-expand navbar-dark" sticky="top" style={{ background: "#83aeff", position: 'sticky', top: '0', width: '100%', display: 'flex' }}>

                    <ul className="navbar-nav mr-auto" style={{ border: "white", position: 'sticky' }}>
                        <li>
                            <Menu className="bm-burger">
                                <li className="bm-item">
                                    <NavLink id="Home" className="nav-link" to="/home">Home</NavLink>
                                </li>
                                <li className="bm-item">
                                    <NavLink id="MyPosts" className="nav-link" to="/myPosts">My Posts</NavLink>
                                </li>
                                <li className="bm-item">
                                    <NavLink id="Friends" className="nav-link" to="/friendUser">Friends</NavLink>
                                </li>
                                <li className="bm-item">
                                    <NavLink id="CreatePost" className="nav-link" to="/createPost">Create Post</NavLink>
                                </li>
                                <li className="bm-item">
                                    <NavLink id="SignOut" className="nav-link" to="/">Signout</NavLink>
                                </li>

                            </Menu>
                        </li>

                    </ul>
                    <ul className="navbar-nav mr-auto">
                        <li>
                            <NavLink to="/home" className="navbar-brand"> <img src={icon} alt="" width="300" ></img></NavLink>
                        </li>
                    </ul>

                </nav>
            </MobileView>
        </>

    );
}