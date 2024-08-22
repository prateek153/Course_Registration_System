/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from 'axios';
import { MDBCard, MDBCardBody, MDBCardText, MDBCardHeader, MDBCardFooter, MDBBtn } from 'mdb-react-ui-kit';

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URLs from '../../../API_URLs';
import { MessageContext } from '../../../App';

export default function CourseCard({ course, setIsEnrolled }) {

    // error, info, question, success, warning
    const showMessage = useContext(MessageContext);

    const handleCourseCard = () => {
        navigate('/CourseCardDetails', { state: { course, handleEnrollCourse } });
    }

    const navigate = useNavigate();

    const handleEnrollCourse = () => {
        const UserId = sessionStorage.getItem("UserId");

        axios.post(API_URLs.user.registerCourse, { UserId, CourseId: course._id })
            .then(response => {
                showMessage("Enrolled", response.data.message, "success");
                setIsEnrolled(true);
            })
            .catch(error => {
                error.response.status === 400 ?
                    showMessage("Enrolled", error.response.data.Error, "warning")
                    :
                    showMessage("Somthing went wrong", error.response.data.Error, "error")
                console.log(error);
            });
    }

    return (
        <MDBCard alignment='center' style={{ marginTop: "30px", width: "22vw" }} id='cardShadow'>
            <MDBCardHeader onClick={handleCourseCard} background='secondary' style={{ cursor: "pointer", marginTop: "20px" }}>
                <b>{course.title}</b>
            </MDBCardHeader>
            <MDBCardBody style={{ cursor: "pointer" }} onClick={handleCourseCard}>
                <MDBCardText>A course by<br />
                    <b>{course.instructor}</b>
                </MDBCardText>
            </MDBCardBody>
            <MDBCardFooter className='text-muted'>
                <MDBBtn style={{ width: "100%", marginBottom: "20px" }}
                    onClick={setIsEnrolled ? handleEnrollCourse : ''} className={setIsEnrolled ? '' : 'bg-secondary'}>
                    {
                        setIsEnrolled ? "Enroll" : "Already Enrolled"
                    }
                </MDBBtn>
            </MDBCardFooter>
        </MDBCard>
    );
}