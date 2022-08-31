import React, { useLayoutEffect, useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link, NavLink } from "react-router-dom";
import Navbar from "./navbar";
import { BrowserView, MobileView } from 'react-device-detect';
//const methodOverride = require('method-override');
//const GridFsStorage = require('multer-gridfs-storage');

import "../styles/centered.css";
import "../styles/button-12.css";

export default function CreatePost() {

    var imgUrl = null;
    const formData = new FormData();

    const ref = useRef(null);

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useLayoutEffect(() => {
        setWidth(ref.current.offsetWidth);
        setHeight(ref.current.offsetHeight);
    }, []);

    const [img, setImg] = useState();


    const [form, setForm] = useState({
        name: "",
    });
    const navigate = useNavigate();

    let a;
    useEffect(() => {
        if (localStorage.getItem("currname") == "") {
            navigate("/");
        }
    }, [a]);
    a = 10;


    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }


    function dataURItoBlob(dataURI) {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        var byteString = atob(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length);

        // create a view into the buffer
        var ia = new Uint8Array(ab);

        // set the bytes of the buffer to the correct values
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        // write the ArrayBuffer to a blob, and you're done
        var blob = new Blob([ab], { type: mimeString });
        return blob;

    }

    var data;
    function toDataURL(src, callback) {
        var image = new Image();
        image.crossOrigin = 'Anonymous';

        image.onload = function () {
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            canvas.height = this.naturalHeight;
            canvas.width = this.naturalWidth;
            context.drawImage(this, 0, 0);

            var dataURL = canvas.toDataURL('image/jpeg');

            callback(dataURL);
        };
        image.src = src;
    }

    function toDataURLPNG(src, callback) {
        var image = new Image();
        image.crossOrigin = 'Anonymous';

        image.onload = function () {
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            canvas.height = this.naturalHeight;
            canvas.width = this.naturalWidth;
            context.drawImage(this, 0, 0);

            var dataURL = canvas.toDataURL('image/png');

            callback(dataURL);
        };
        image.src = src;
    }

    const onImageChange = (e) => {
        if (e.target.files[0].type.includes('image')) {
            if (e.target.files[0].type.includes('png')) {
                const [file] = e.target.files;
                toDataURLPNG(URL.createObjectURL(file), function (dataURL) {
                    data = dataURL;
                    setImg(data);
                });
            }
            else {
                const [file] = e.target.files;
                toDataURL(URL.createObjectURL(file), function (dataURL) {
                    data = dataURL;
                    setImg(data);
                });
            }


        }
        else {
            e.target.value = null;
            setImg(null);
        }
    };

    async function onSubmit(e) {
        e.preventDefault();
        if (form.title != null) {
            // When a post request is sent to the create url, we'll add a new record to the database.
            const post = { title: form.title, body: form.body, image: img };
            const response = await fetch(`${localStorage.getItem("url")}/addpost/${localStorage.getItem("currname")}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "name": localStorage.getItem("currname"),
                    "tok": getCookie("authToken")
                },
                body: JSON.stringify(post),
            })
                .catch(error => {
                    window.alert(error);
                    return;
                });
            const check = await response.json();

            if (check == "session expired") {
                alert("session expired");
                navigate("/");
                return;
            }
            navigate("/home");
        }

    }

    // This following section will display the form that takes the input from the user.
    return (
        <>
            <BrowserView>
                <div>
                    <Navbar />
                    <form onSubmit={onSubmit} style={{ borderRadius: '10px', width: '85%', backgroundColor: "#dfe4ec", textAlign: 'center', alignContent: 'center', margin: 'auto', boxShadow: '0px 5px 10px 0px  grey', marginTop: 30 }}>
                        <div className="centered">
                            <h3 style={{ marginTop: "20px", marginBottom: "20px" }} >Create Post</h3>
                        </div>
                        <div className="form-group">
                            <input
                                style={{ backgroundColor: 'transparent', width: '90%', margin: 'auto', marginBottom: '30px' }}
                                placeholder="title goes here"
                                type="text"
                                className="form-control"
                                id="title"
                                value={form.title}
                                onChange={(e) => updateForm({ title: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                placeholder="body goes here"
                                style={{ height: "25vh", backgroundColor: 'transparent', width: '90%', margin: 'auto', marginBottom: '15px' }}
                                type="text"
                                className="form-control"
                                id="body"
                                value={form.body}
                                onChange={(e) => updateForm({ body: e.target.value })}
                            />
                        </div>
                        <div ref={ref}>

                        </div>
                        <div className="form-group">
                            <label htmlFor="image" style={{ marginBottom: '10px', }}>Add Image</label>
                            <input type="file" accept="image/*" className="form-control" onChange={onImageChange} style={{ width: '90%', margin: 'auto' }} />
                        </div>
                        <div className="center-image">
                            <img src={img} alt="" style={{ width: 500, height: { width }, marginTop: '20px', marginBottom: '10px' }} />
                        </div>
                        <div className="centered">
                            <input
                                style={{ marginBottom: '20px' }}
                                type="submit"
                                value="Post"
                                className="button-12 "
                            />
                        </div>
                    </form>
                </div>
            </BrowserView>
            <MobileView>
                <div>
                    <Navbar />
                    <form onSubmit={onSubmit} style={{ borderRadius: '10px', width: '95%', backgroundColor: "#dfe4ec", textAlign: 'center', alignContent: 'center', margin: 'auto', boxShadow: '0px 5px 10px 0px  grey', marginTop: 30 }}>
                        <div className="centered">
                            <h3 style={{ marginTop: "20px", marginBottom: "20px" }} >Create Post</h3>
                        </div>
                        <div className="form-group">
                            <input
                                style={{ backgroundColor: 'transparent', width: '90%', margin: 'auto', marginBottom: '15px' }}
                                placeholder="title goes here"
                                type="text"
                                className="form-control"
                                id="title"
                                value={form.title}
                                onChange={(e) => updateForm({ title: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                placeholder="body goes here"
                                style={{ height: "25vh", backgroundColor: 'transparent', width: '90%', margin: 'auto', marginBottom: '15px' }}
                                type="text"
                                className="form-control"
                                id="body"
                                value={form.body}
                                onChange={(e) => updateForm({ body: e.target.value })}
                            />
                        </div>
                        <div ref={ref}>

                        </div>
                        <div className="form-group">
                            <label htmlFor="image" style={{ marginBottom: '10px', }}>Add Image</label>
                            <input type="file" accept="image/*" className="form-control" onChange={onImageChange} style={{ width: '90%', margin: 'auto' }} />
                        </div>
                        <div className="center-image">
                            <img src={img} alt="" style={{ width: '90%', height: { width }, marginTop: '20px', marginBottom: '10px' }} />
                        </div>
                        <div className="centered">
                            <input
                                style={{ marginBottom: '20px' }}
                                type="submit"
                                value="Post"
                                className="button-12"
                            />
                        </div>
                    </form>
                </div>
            </MobileView>
        </>
    );
}