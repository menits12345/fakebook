import React, { useEffect, useState, View, StyleSheet } from "react";
import { useNavigate } from "react-router";
import { Link, NavLink } from "react-router-dom";
import Navbar from "./navbar";
import Box from '@material-ui/core/Box';
import { BrowserTypes, BrowserView, MobileView } from 'react-device-detect';
import "../styles/centered.css";

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 1
        }}
    />
);

function Record(props) {
    return (
        <>
            <BrowserView>
                <tr class="ow">
                    <Box style={{ boxSizing: 'border-box', borderRadius: '10px', margin: 'auto', boxShadow: '0px 5px 10px 0px  grey', width: '600px', backgroundColor: "#dfe4ec" }}>
                        <div style={{ marginLeft: '20px' }}>
                            <td style={{ color: 'grey' }}>{props.record.user}</td>
                        </div>
                        <div style={{ marginLeft: '20px', width: '95%' }}>
                            <td style={{ fontSize: '110%' }}>{props.record.title}</td>
                        </div>
                        <div style={{ marginLeft: '20px', color: '#444444', width: '95%' }}>
                            <td>{props.record.body}</td>
                        </div>
                        <div >
                            <img src={props.record.image} alt="" style={{ width: 600, padding: 20 }} />
                        </div>
                    </Box>
                    <div class="ColoredLine">
                        <ColoredLine color='grey' />
                    </div>
                </tr >
            </BrowserView>
            <MobileView>
                <tr class="ow">
                    <Box style={{ boxSizing: 'border-box', borderRadius: '10px', margin: 'auto', boxShadow: '0px 5px 10px 0px  grey', width: '100%', backgroundColor: "#dfe4ec" }}>
                        <div style={{ marginLeft: '10px' }}>
                            <td style={{ color: 'grey' }}>{props.record.user}</td>
                        </div>
                        <div style={{ marginLeft: '10px', width: '95%' }}>
                            <td style={{ fontSize: '110%' }}>{props.record.title}</td>
                        </div>
                        <div style={{ marginLeft: '10px', color: '#444444', width: '95%' }}>
                            <td>{props.record.body}</td>
                        </div>
                        <div >
                            <img src={props.record.image} alt="" style={{ width: '100%', padding: 10 }} />
                        </div>
                    </Box>
                    <div class="ColoredLine">
                        <ColoredLine color='grey' />
                    </div>
                </tr >
            </MobileView>
        </>


    );
}

export default function MyPosts() {

    const navigate = useNavigate();

    const [img, setImg] = useState();

    // this part is for the table of friends
    const [records, setRecords] = useState([]);

    // This method fetches the records from the database.

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    async function getRecords() {


        const response = await fetch(`${localStorage.getItem("url")}/record/getPosts/${localStorage.getItem("currname")}`, {
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

        var sortedPosts = records.sort((a, b) => {
            return (a.date > b.date) ? -1 : ((a.date > b.date) ? 1 : 0)
        });
        setRecords(records);
    }

    useEffect(() => {

        if (localStorage.getItem("currname") == "") {
            navigate("/");
            return;
        }

        getRecords();

        return;
    }, [1]);



    // This method will map out the records on the table
    function recordList() {
        return records.map((record) => {
            return (
                <Record
                    record={record}
                    key={record._id}
                />
            );
        });
    }


    // This following section will display the form that takes the input from the user.
    return (
        <>
            <BrowserView>
                <div>
                    <Navbar />
                    <div class="ColoredLine" style={{ marginTop: '20px' }}>
                        <ColoredLine color='grey' />
                    </div>
                    <table class="centered" style={{ marginTop: 20 }}>
                        <tbody >{recordList()}</tbody>
                    </table>
                </div>
            </BrowserView>
            <MobileView>
                <div>
                    <Navbar />
                    <div class="ColoredLine" style={{ marginTop: '20px' }}>
                        <ColoredLine color='grey' />
                    </div>
                    <table class="centered" style={{ marginTop: 20 }}>
                        <tbody >{recordList()}</tbody>
                    </table>
                </div>
            </MobileView>
        </>

    );
}
