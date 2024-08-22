/* eslint-disable react/prop-types */
import { MDBIcon, MDBCollapse, MDBRipple, MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

export default function SideBar({ showShow, activeTab, setActiveTab }) {

    const handleActiveTab = (id) => {
        setActiveTab(id); // Set the active tab based on the clicked item
    }

    const logOut = () => {
        sessionStorage.clear();
        navigate('/');
    }

    const navigate = useNavigate();

    return (
        <MDBCollapse show={showShow} tag="nav" className="d-lg-block bg-white sidebar">
            <div className="position-sticky">
                <MDBListGroup flush className="mx-3 mt-4">
                    <MDBRipple rippleTag='span'>
                        <MDBListGroupItem
                            id='home'
                            onClick={() => handleActiveTab('home')}
                            action style={{ cursor: "pointer" }}
                            className={`border-0 border-bottom rounded ${activeTab === 'home' ? 'active' : ''}`}
                        >
                            <MDBIcon fas icon="home me-3" />
                            Home
                        </MDBListGroupItem>
                    </MDBRipple>

                    <MDBRipple rippleTag='span'>
                        <MDBListGroupItem
                            id='courses'
                            onClick={() => handleActiveTab('courses')}
                            action style={{ cursor: "pointer" }}
                            className={`border-0 border-bottom rounded ${activeTab === 'courses' ? 'active' : ''}`}
                        >
                            <MDBIcon fas icon="book me-3" />
                            Courses
                        </MDBListGroupItem>
                    </MDBRipple>

                    <MDBRipple rippleTag='span'>
                        <MDBListGroupItem
                            id='courses' action style={{ cursor: "pointer" }}
                            onClick={() => handleActiveTab('registeredCourses')}
                            className={`border-0 border-bottom rounded ${activeTab === 'registeredCourses' ? 'active' : ''}`}
                        >
                            <MDBIcon fas icon="book me-3" />
                            Registered &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Courses
                        </MDBListGroupItem>
                    </MDBRipple>

                    <MDBRipple rippleTag='span'>
                        <MDBListGroupItem
                            id='logOut' style={{ cursor: "pointer" }}
                            // onClick={() => handleActiveTab('logOut')}
                            action onClick={logOut}
                            className={`border-0 border-bottom rounded ${activeTab === 'logOut' ? 'active' : ''}`}
                        >
                            <MDBIcon fas icon="sign-out me-3" />
                            Log Out
                        </MDBListGroupItem>
                    </MDBRipple>
                </MDBListGroup>
            </div>
        </MDBCollapse>
    );
}
