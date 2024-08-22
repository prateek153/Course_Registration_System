/* eslint-disable no-unused-vars */
import {
    MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader,
    MDBCardFooter, MDBBtn,
    MDBIcon
} from 'mdb-react-ui-kit';
import { useLocation, useNavigate } from 'react-router-dom';

export default function CourseCardDetails() {
    const { state } = useLocation();
    const { course, handleEnrollCourse } = state;
    console.log(course);

    const navigate = useNavigate();

    return (<>
        <div className=" container-fluid" >
            <div style={{ height: "100vh" }} className="pt-3 d-flex flex-column align-items-center position-relative">
                <div onClick={() => navigate(-1)} className="position-absolute " style={{ left: '20px', top: "30px" }}>
                    <MDBIcon fas icon="arrow-left-long fa-xl border" />
                </div>
                <h1 className='text-center text-decoration-underline'>Course Details</h1>
                <MDBCard className='mt-5' style={{ maxWidth: '50vw' }} alignment='center' background='light' id='cardShadow'>
                    <MDBCardHeader><h3>{course.title}</h3></MDBCardHeader>
                    <MDBCardBody>
                        <MDBCardText> A course by
                            <MDBCardTitle>{course.instructor}</MDBCardTitle>
                        </MDBCardText>
                        <MDBCardText>{course.description} </MDBCardText>
                        <MDBCardFooter className='text-muted'>
                            <b>Duration - </b>{course.duration}
                        </MDBCardFooter>
                        <MDBCardFooter className='text-muted'>
                            <b>Days - </b>
                            {
                                course.schedule.days.map(day => <>
                                    <small> {day}&nbsp;,</small>
                                </>
                                )
                            }
                        </MDBCardFooter>
                        <MDBBtn onClick={()=>handleEnrollCourse()} size='lg'>Enroll Now</MDBBtn>
                    </MDBCardBody>
                    <MDBCardFooter className='text-muted'>{course.schedule.time}</MDBCardFooter>
                </MDBCard>
            </div>
        </div >
    </>);
}