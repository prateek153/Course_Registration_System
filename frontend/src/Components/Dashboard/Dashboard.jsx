/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";

import Header from "./Header.jsx";
import SideBar from "./SideBar.jsx";
import API_URLs from "../../API_URLs.js";
import AllCourses from "./CourseTab/AllCourses.jsx";
import RegisteredCourse from "./RegisterCourseTab/registeredCourse.jsx";

export default function Home() {
    const [showShow, setShowShow] = useState(false);
    const [allCourse, setAllCourse] = useState([]);
    const [activeTab, setActiveTab] = useState('home'); // Default to 'home' or any other initial value
    const [isEmptySearch, setIsEmpltySearch] = useState(false);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [registeredCourse, setRegisteredCourse] = useState(null);

    useEffect(() => {
        axios
            .get(API_URLs.course.getAll)
            .then((response) => {
                if (!response.data.data) setAllCourse([]);
                else {
                    setAllCourse(response.data.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [isEmptySearch]);

    const _id = sessionStorage.getItem("UserId");

    useEffect(() => {
        axios.post(API_URLs.user.RegisteredCourse, { _id })
            .then(response => {
                console.log(response);
                setRegisteredCourse(response.data.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [isEnrolled]);

    console.log("registeredCourse", registeredCourse);

    const toggleShow = () => {
        alert('button clicked')
        setShowShow(!showShow)
    };

    return (
        <>
            <Header toggleShow={toggleShow} setIsEmpltySearch={setIsEmpltySearch} setAllCourse={setAllCourse} />
            <div className="conatiner">
                <div style={{ width: "98%" }}>
                    <div className="row">

                        {/* Left Side Tab */}
                        <div className="col-3 vh-100" id="shadow" style={{ position: 'sticky', top: '0', zIndex: "33" }}>
                            <SideBar activeTab={activeTab} setActiveTab={setActiveTab} showShow={showShow} />
                        </div>

                        {/* RIght portion according to the tab */}
                        <div className="col-9 p-3 d-flex flex-column justify-content-center align-items-center">
                            {
                                activeTab === 'home' ?
                                    <>
                                        <h1>Home Tab</h1>
                                    </>
                                    :
                                    activeTab === 'courses' ? <>
                                        <AllCourses setIsEnrolled={setIsEnrolled} allCourse={allCourse} />
                                    </>
                                        : activeTab === 'registeredCourses' ?
                                            <>
                                                <RegisteredCourse registeredCourse={registeredCourse} />
                                            </>
                                            : <></>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
