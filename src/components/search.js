import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link, NavLink } from "react-router-dom";
import Navbar from "./navbar";
import Box from '@material-ui/core/Box';
import { Card, Table } from "react-bootstrap";
import { BrowserView, MobileView } from 'react-device-detect';
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";


function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
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


export default function Search() {

    const navigate = useNavigate();
    const defaultFilterOptions = createFilterOptions();


    const CustomPaper = (props) => {
        return <Paper elevation={8} {...props} />;
    };

    const filterOptions = (options, state) => {
        if (document.getElementById('name').value == "" || document.getElementById('name').value == undefined) {
            options = [{ name: "" }];
        }
        else {
            options = JSON.parse(localStorage.getItem("names"));
        }

        return defaultFilterOptions(options, state).slice(0, 5);
    };
    const Record = (props) => (

        <tr>
            <td>{props.record}</td>
            <td >
                <button className="btn btn-link "
                    onClick={async () => {
                        var toSend = { to: props.record.toString() };
                        const response = await fetch(`${localStorage.getItem("url")}/record/deleteFriend/${localStorage.getItem("currname")}`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "name": localStorage.getItem("currname"),
                                "tok": getCookie("authToken")
                            },
                            body: JSON.stringify(toSend),
                        })
                        if (!response.ok) {
                            const message = `An error occurred: ${response.statusText}`;
                            window.alert(message);
                            return;
                        }

                        const answer = await response.json();

                        if (answer == "session expired") {
                            alert("session expired");
                            navigate("/");
                            return;
                        }

                        props.deleteFriend(props.record);
                    }}
                >
                    Unfriend
                </button>
            </td>
            <div>
                <td class="ColoredLine">
                    <ColoredLine color='grey' />
                </td>
            </div>

        </tr>
    );

    // this part is for the table of friends
    const [records, setRecords] = useState([]);


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
    async function getRecords() {


        const response = await fetch(`${localStorage.getItem("url")}/record/getFriends/${localStorage.getItem("currname")}`, {
            headers: {
                "name": localStorage.getItem("currname"),
                "tok": getCookie("authToken")
            }
        });

        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }

        const records = await response.json();
        if (records == "session expired") {
            alert("session expired");
            navigate("/");
            return;
        }
        setRecords(records);
    }

    useEffect(() => {
        if (localStorage.getItem("currname") == "") {
            navigate("/");
            return;
        }
        getRecords();
        getUsers();
        return;
    }, [1]);


    // This method will delete a record
    async function deleteFriend(name) {
        getRecords();
        return;
    }

    // This method will map out the records on the table
    function recordList() {
        return records.map((record) => {
            return (
                <Record
                    record={record}
                    deleteFriend={() => deleteFriend(record._id)}
                    key={record._id}
                />
            );
        });
    }

    //till here
    // add friend form
    const [form, setForm] = useState({
        name: "",
    });

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
        // When a post request is sent to the create url, we'll add a new record to the database.
        const user = { name: document.getElementById('name').value };
        const toSend = { to: document.getElementById('name').value };
        const response = await fetch(`${localStorage.getItem("url")}/record/findUser/${user.name.toString()}`, {
            headers: {
                "name": localStorage.getItem("currname"),
                "tok": getCookie("authToken")
            }
        });
        const record = await response.json();

        if (record == "session expired") {
            alert("session expired");
            navigate("/");
            return;
        }

        if (!record) {
            window.alert('User does not exist!');
        }
        else {
            if (localStorage.getItem("currname") == toSend.to) {
                window.alert('Cannot send friend request to yourself!');
            }
            else {
                const res = await fetch(`${localStorage.getItem("url")}/record/getFriends/${localStorage.getItem("currname")}`, {
                    headers: {
                        "name": localStorage.getItem("currname"),
                        "tok": getCookie("authToken")
                    }
                });
                const frens = await res.json();
                if (frens == "session expired") {
                    alert("session expired");
                    navigate("/");
                    return;
                }

                if (!frens) {
                    await fetch(`${localStorage.getItem("url")}/addFriend/${localStorage.getItem("currname")}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "name": localStorage.getItem("currname"),
                            "tok": getCookie("authToken")
                        },
                        body: JSON.stringify(toSend),
                    })
                        .catch(error => {
                            window.alert(error);
                            return;
                        });
                    setForm({ name: "" });
                    getRecords();
                }
                else {
                    if (frens.includes(user.name)) {
                        window.alert('User is already your friend!');
                    }
                    else {
                        const answ = await fetch(`${localStorage.getItem("url")}/addFriend/${localStorage.getItem("currname")}`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "name": localStorage.getItem("currname"),
                                "tok": getCookie("authToken")
                            },
                            body: JSON.stringify(toSend),
                        })
                            .catch(error => {
                                window.alert(error);
                                return;
                            });

                        const ans = await answ.json();

                        if (ans == "session expired") {
                            alert("session expired");
                            navigate("/");
                            return;
                        }
                        setForm({ name: "" });
                        getRecords();
                    }
                }
            }
        }
    }

    // This following section will display the form that takes the input from the user.

    if (JSON.parse(localStorage.getItem("names")) == undefined) {
        alert("null")
        return <div />
    }
    return (
        <div>
            <Navbar />
            <form onSubmit={onSubmit} style={{ borderRadius: '10px', backgroundColor: "#dfe4ec", background: 'transparent', textAlign: 'center', alignContent: 'center', margin: 'auto' }}>
                <div className="centered">
                    <h3 style={{ marginTop: "40px", marginBottom: "20px" }} >Add Friend</h3>
                </div>
                <div className="centered">
                    <Autocomplete
                        getOptionDisabled={(value) => {
                            if (document.getElementById('name').value == "") {
                                return true;
                            }
                            else {
                                return false;
                            }
                        }}
                        clearOnBlur={false}
                        id="autoComp"
                        filterOptions={filterOptions}
                        options={JSON.parse(localStorage.getItem("names"))}
                        getOptionLabel={(option) => option.name}
                        style={{ width: 250 }}
                        PaperComponent={CustomPaper}
                        renderInput={(params) => (
                            <div ref={params.InputProps.ref} style={{ marginBottom: '20px' }}>
                                <input {...params.inputProps} autoFocus style={{ backgroundColor: 'transparent', borderRadius: '5px', borderColor: '#d5dff0', fontSize: '15pt', marginBottom: '-5px', width: '250px' }} placeholder="Username" id="name" type="search" />
                            </div>
                        )}
                    />
                </div>
                <div className="centered">
                    <input
                        style={{ marginBottom: '20px' }}
                        class="button-12"
                        type="submit"
                        value="Add Friend"
                        className="button-12 "
                    />
                </div>
            </form>
            <div class="ColoredLine">
                <ColoredLine color='grey' />
            </div>
            <div className="centered">
                <h3 style={{ marginTop: "30px" }} >Friends</h3>
            </div>
            <div>
                <table className="centered" style={{}}>
                    <tbody>{recordList()}</tbody>
                </table>
            </div>
        </div>
    );
}
