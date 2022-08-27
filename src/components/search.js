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
    const [users, setUsers] = useState([]);
    const top100Films = [
        { title: "The Shawshank Redemption", year: 1994 },
        { title: "The Godfather", year: 1972 },
        { title: "The Godfather: Part II", year: 1974 },
        { title: "The Dark Knight", year: 2008 },
        { title: "12 Angry Men", year: 1957 },
        { title: "Schindler's List", year: 1993 },
        { title: "Pulp Fiction", year: 1994 },
        { title: "The Lord of the Rings: The Return of the King", year: 2003 },
        { title: "The Good, the Bad and the Ugly", year: 1966 },
        { title: "Fight Club", year: 1999 },
        { title: "The Lord of the Rings: The Fellowship of the Ring", year: 2001 },
        { title: "Star Wars: Episode V - The Empire Strikes Back", year: 1980 },
        { title: "Forrest Gump", year: 1994 },
        { title: "Inception", year: 2010 },
        { title: "The Lord of the Rings: The Two Towers", year: 2002 },
        { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
        { title: "Goodfellas", year: 1990 },
        { title: "The Matrix", year: 1999 },
        { title: "Seven Samurai", year: 1954 },
        { title: "Star Wars: Episode IV - A New Hope", year: 1977 },
        { title: "City of God", year: 2002 },
        { title: "Se7en", year: 1995 },
        { title: "The Silence of the Lambs", year: 1991 },
        { title: "It's a Wonderful Life", year: 1946 },
        { title: "Life Is Beautiful", year: 1997 },
        { title: "The Usual Suspects", year: 1995 },
        { title: "Léon: The Professional", year: 1994 },
        { title: "Spirited Away", year: 2001 },
        { title: "Saving Private Ryan", year: 1998 },
        { title: "Once Upon a Time in the West", year: 1968 },
        { title: "American History X", year: 1998 },
        { title: "Interstellar", year: 2014 },
        { title: "Casablanca", year: 1942 },
        { title: "City Lights", year: 1931 },
        { title: "Psycho", year: 1960 },
        { title: "The Green Mile", year: 1999 },
        { title: "The Intouchables", year: 2011 },
        { title: "Modern Times", year: 1936 },
        { title: "Raiders of the Lost Ark", year: 1981 },
        { title: "Rear Window", year: 1954 },
        { title: "The Pianist", year: 2002 },
        { title: "The Departed", year: 2006 },
        { title: "Terminator 2: Judgment Day", year: 1991 },
        { title: "Back to the Future", year: 1985 },
        { title: "Whiplash", year: 2014 },
        { title: "Gladiator", year: 2000 },
        { title: "Memento", year: 2000 },
        { title: "The Prestige", year: 2006 },
        { title: "The Lion King", year: 1994 },
        { title: "Apocalypse Now", year: 1979 },
        { title: "Alien", year: 1979 },
        { title: "Sunset Boulevard", year: 1950 },
        {
            title:
                "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
            year: 1964
        },
        { title: "The Great Dictator", year: 1940 },
        { title: "Cinema Paradiso", year: 1988 },
        { title: "The Lives of Others", year: 2006 },
        { title: "Grave of the Fireflies", year: 1988 },
        { title: "Paths of Glory", year: 1957 },
        { title: "Django Unchained", year: 2012 },
        { title: "The Shining", year: 1980 },
        { title: "WALL·E", year: 2008 },
        { title: "American Beauty", year: 1999 },
        { title: "The Dark Knight Rises", year: 2012 },
        { title: "Princess Mononoke", year: 1997 },
        { title: "Aliens", year: 1986 },
        { title: "Oldboy", year: 2003 },
        { title: "Once Upon a Time in America", year: 1984 },
        { title: "Witness for the Prosecution", year: 1957 },
        { title: "Das Boot", year: 1981 },
        { title: "Citizen Kane", year: 1941 },
        { title: "North by Northwest", year: 1959 },
        { title: "Vertigo", year: 1958 },
        { title: "Star Wars: Episode VI - Return of the Jedi", year: 1983 },
        { title: "Reservoir Dogs", year: 1992 },
        { title: "Braveheart", year: 1995 },
        { title: "M", year: 1931 },
        { title: "Requiem for a Dream", year: 2000 },
        { title: "Amélie", year: 2001 },
        { title: "A Clockwork Orange", year: 1971 },
        { title: "Like Stars on Earth", year: 2007 },
        { title: "Taxi Driver", year: 1976 },
        { title: "Lawrence of Arabia", year: 1962 },
        { title: "Double Indemnity", year: 1944 },
        { title: "Eternal Sunshine of the Spotless Mind", year: 2004 },
        { title: "Amadeus", year: 1984 },
        { title: "To Kill a Mockingbird", year: 1962 },
        { title: "Toy Story 3", year: 2010 },
        { title: "Logan", year: 2017 },
        { title: "Full Metal Jacket", year: 1987 },
        { title: "Dangal", year: 2016 },
        { title: "The Sting", year: 1973 },
        { title: "2001: A Space Odyssey", year: 1968 },
        { title: "Singin' in the Rain", year: 1952 },
        { title: "Toy Story", year: 1995 },
        { title: "Bicycle Thieves", year: 1948 },
        { title: "The Kid", year: 1921 },
        { title: "Inglourious Basterds", year: 2009 },
        { title: "Snatch", year: 2000 },
        { title: "3 Idiots", year: 2009 },
        { title: "Monty Python and the Holy Grail", year: 1975 }
    ];

    function ser() {
        if (document.getElementById('name').value == "" || document.getElementById('name').value == undefined) {
            return ([]);
        } else {
            return top100Films;
        }
    }

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
