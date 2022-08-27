import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link, NavLink } from "react-router-dom";
import icon from "./logo2.png";
import { BrowserView, MobileView } from 'react-device-detect';
import Cookies from 'universal-cookie';

import { GenerateJWT, DecodeJWT, ValidateJWT } from "./JWTfunctions"
const JSRSASign = require('jsrsasign');

const key = '$JesseWeNeedToCook!';

export default function Login() {

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    let a;
    useEffect(() => {
        document.cookie = `authToken=; expires=expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`
        localStorage.setItem("currname", "");
        localStorage.setItem("currtoken", "");
        localStorage.setItem("names", JSON.stringify([{ name: "" }]));
    }, [a]);
    a = 10;

    const [form, setForm] = useState({
        name: "",
        password: "",
    });
    const navigate = useNavigate();

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    var allUsers = [];
    function setUserList(users) {
        allUsers = users;
    }
    // This method fetches the records from the database.
    async function getUsers() {
        //get all users
        const serverRes = await fetch(`${localStorage.getItem("url")}/record/getUsers`, {
            headers: {
                "name": localStorage.getItem("currname"),
            }
        });
        if (!serverRes.ok) {
            const message = `An error occurred: ${serverRes.statusText}`;
            window.alert(message);
            return;
        }
        const users = await serverRes.json();
        //till here
        var userList = allUsers.concat(users);


        localStorage.setItem("names", JSON.stringify(userList));
        //setUsers(allUsers);

        //alert(JSON.stringify(userList)[0].name)
    }

    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();
        // When a post request is sent to the create url, we'll add a new record to the database.
        const user = { ...form };

        const claims = { name: user.name, password: user.password.hashCode() };
        const header = {

            alg: 'HS512',

            typ: 'JWT'

        };
        const sJWT = GenerateJWT(header, claims, key);

        const response = await fetch(`${localStorage.getItem("url")}/record/validate/${sJWT}`);
        const record = await response.json();
        if (!record) {
            window.alert('Wrong login information!');
        }
        else {
            localStorage.setItem("currname", user.name);
            localStorage.setItem("currtoken", sJWT);
            var expires = (new Date(Date.now() + 86400 * 1000)).toUTCString();
            if (sJWT != getCookie('authToken')) {
                document.cookie = `authToken=${sJWT}; expires=` + expires + ";path=/;"
            }
            getUsers();
            navigate("/home");
        }
    }

    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 1
            }}
        />
    );

    // This following section will display the form that takes the input from the user.
    return (
        <>
            <BrowserView>
                <div>
                    <h3 className="centered" style={{ display: 'flex', border: "none", width: "100%", paddingTop: '20px' }}> <img src={icon} alt="" width="400" ></img></h3>
                    <h3 className="centered" style={{ display: 'flex', border: "none", width: "100%", height: "10vh", fontSize: '20pt', marginBottom: '10px' }}>Connect with friends and the world around you on Fakebook.</h3>
                    <form onSubmit={onSubmit} style={{ borderRadius: '10px', width: '40%', backgroundColor: "#dfe4ec", textAlign: 'center', alignContent: 'center', margin: 'auto', boxShadow: '0px 5px 10px 0px  grey' }}>
                        <h3 className="centered" style={{ display: 'flex', border: "none", width: "100%", height: "15vh", fontSize: '30pt', marginBottom: '-5px' }}>Sign In</h3>
                        <div className="centered">
                            <input
                                style={{ backgroundColor: 'transparent', borderRadius: '5px', borderColor: '#d5dff0', marginBottom: '20px', fontSize: '15pt' }}
                                placeholder="Username"
                                type="text"
                                className="centered"
                                id="name"
                                value={form.name}
                                onChange={(e) => updateForm({ name: e.target.value })}
                            />
                        </div>
                        <div className="centered">
                            <input
                                style={{ backgroundColor: 'transparent', borderRadius: '5px', borderColor: '#d5dff0', fontSize: '15pt' }}
                                placeholder="Password"
                                type="password"
                                className="centered"
                                id="password"
                                value={form.password}
                                onChange={(e) => updateForm({ password: e.target.value })}
                            />
                        </div>
                        <div className="centered">
                            <input
                                style={{ marginTop: '20px', marginBottom: '5x' }}
                                type="submit"
                                value="Sign In"
                                className="button-12 "
                            />
                        </div>
                        <div class="ColoredLine">
                            <ColoredLine color='grey' />
                        </div>
                        <div className="centered">
                            <Link className="centered" class="btn btn-link" style={{ marginBottom: '20px' }} to={`/`}>Don't have an account? Sign up!</Link>
                        </div>
                    </form>
                </div>
            </BrowserView>
            <MobileView>
                <div>
                    <h3 className="centered" style={{ display: 'flex', border: "none", width: "100%", paddingTop: '20px', paddingBottom: '20px' }}> <img src={icon} alt="" width="90%" ></img></h3>
                    <form onSubmit={onSubmit} style={{ borderRadius: '10px', width: '85%', backgroundColor: "#dfe4ec", textAlign: 'center', alignContent: 'center', margin: 'auto', boxShadow: '0px 5px 10px 0px  grey' }}>
                        <h3 className="centered" style={{ display: 'flex', border: "none", width: "100%", height: "15vh", fontSize: '20pt', marginBottom: '-5px' }}>Sign In</h3>
                        <div className="centered">
                            <input
                                style={{ backgroundColor: 'transparent', borderRadius: '5px', borderColor: '#d5dff0', marginBottom: '20px', fontSize: '13pt' }}
                                placeholder="Username"
                                type="text"
                                className="centered"
                                id="name"
                                value={form.name}
                                onChange={(e) => updateForm({ name: e.target.value })}
                            />
                        </div>
                        <div className="centered">
                            <input
                                style={{ backgroundColor: 'transparent', borderRadius: '5px', borderColor: '#d5dff0', fontSize: '13pt' }}
                                placeholder="Password"
                                type="password"
                                className="centered"
                                id="password"
                                value={form.password}
                                onChange={(e) => updateForm({ password: e.target.value })}
                            />
                        </div>
                        <div className="centered">
                            <input
                                style={{ marginTop: '20px', marginBottom: '5x' }}
                                type="submit"
                                value="Sign In"
                                className="button-12 "
                            />
                        </div>
                        <div class="ColoredLine">
                            <ColoredLine color='grey' />
                        </div>
                        <div className="centered">
                            <Link className="centered" class="btn btn-link" style={{ marginBottom: '20px' }} to={`/`}>Don't have an account? Sign up!</Link>
                        </div>
                    </form>
                </div>
            </MobileView>
        </>
    );
}
