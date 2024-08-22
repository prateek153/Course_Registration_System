/* eslint-disable no-unused-vars */
// import { Link, useNavigate } from "react-router-dom";
// import userImage from '../../assets/user-image.png';
import axios from "axios";
import { MDBBadge, MDBCollapse, MDBContainer, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBIcon, MDBInput, MDBNavbar, MDBNavbarBrand, MDBNavbarItem, MDBNavbarLink, MDBNavbarNav, MDBNavbarToggler } from "mdb-react-ui-kit";
import API_URLs from "../../API_URLs.js";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function Header({ toggleShow, setAllCourse, setIsEmpltySearch }) {

    // const navigate = useNavigate();

    const handleSearchCourse = (e) => {
        let searchQuery = e.target.value;


        axios.post(API_URLs.course.getByName, {
            searchQuery,
            limit: 10
        })
            .then(response => {
                console.log(response);
                setAllCourse(response.data.data);
            })
            .catch(() => {
                setIsEmpltySearch(true);
            });
    }

    return <>
        <MDBNavbar expand='lg' light bgColor='light'
        // style={{ position: 'sticky', top: '0', zIndex: "33" }}
        >
            <MDBContainer fluid>
                <MDBNavbarNav className="w-auto border ">
                    <MDBNavbarToggler
                        type='button'
                        aria-label='Toggle navigation'
                        onClick={toggleShow}
                    >
                        <MDBIcon icon='bars' fas />
                    </MDBNavbarToggler>
                    <MDBNavbarBrand href='#'>
                        {/* <img
                            src='https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.webp'
                            height='30'
                            alt=''
                            loading='lazy'
                        /> */}
                        Course Registration System
                    </MDBNavbarBrand>
                </MDBNavbarNav>

                <MDBNavbarNav className="w-auto">
                    <MDBCollapse navbar>
                        <MDBNavbarItem className="d-flex align-items-center">
                            <MDBInput label='Search courses' onChange={handleSearchCourse} id='form1' type='text' />
                            <MDBIcon fas icon="search mx-2" />
                        </MDBNavbarItem>
                    </MDBCollapse>
                </MDBNavbarNav>

                <MDBNavbarNav className="d-flex flex-row justify-content-end w-auto">
                    <MDBNavbarItem className='me-3 me-lg-0 d-flex align-items-center'>
                        <MDBDropdown>
                            <MDBDropdownToggle tag="a" href="#!" className="hidden-arrow nav-link">
                                <MDBIcon fas icon="bell" />
                                <MDBBadge color='danger' notification pill>
                                    1
                                </MDBBadge>
                            </MDBDropdownToggle>

                            <MDBDropdownMenu>
                                <MDBDropdownItem>
                                    <Link to={''}>Some news</Link>
                                </MDBDropdownItem>
                                <MDBDropdownItem>
                                    <Link to={''}>Another news</Link>
                                </MDBDropdownItem>
                                <MDBDropdownItem>
                                    <Link to={''}>Something else here</Link>
                                </MDBDropdownItem>
                            </MDBDropdownMenu>
                        </MDBDropdown>
                    </MDBNavbarItem>

                    <MDBNavbarItem className='me-3 me-lg-0'>
                        <MDBNavbarLink href='#'>
                            <MDBIcon fas icon='fill-drip' />
                        </MDBNavbarLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem className='me-3 me-lg-0'>
                        <MDBNavbarLink href='#'>
                            <MDBIcon fab icon='github' />
                        </MDBNavbarLink>
                    </MDBNavbarItem>

                    <MDBNavbarItem className='me-3 me-lg-0 d-flex align-items-center'>
                        <MDBDropdown>

                            <MDBDropdownToggle tag="a" className="hidden-arrow nav-link ">
                                <i className="fa-solid fa-circle-user fa-lg"></i>
                            </MDBDropdownToggle>
                            <MDBDropdownMenu>
                                <MDBDropdownItem>
                                    <Link to={''}>My profile</Link>
                                </MDBDropdownItem>
                                <MDBDropdownItem>
                                    <Link to={''}>Settings</Link>
                                </MDBDropdownItem>
                                <MDBDropdownItem>
                                    <Link to={''}>Logout</Link>
                                </MDBDropdownItem>
                            </MDBDropdownMenu>
                        </MDBDropdown>
                    </MDBNavbarItem>
                </MDBNavbarNav>
            </MDBContainer>
        </MDBNavbar>
        {/* <nav className="navbar bg-body-tertiary sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand" >Course Registration System</Link >
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <div className="border m-4 mt-5 rounded d-flex flex-column align-items-center gap-3">
                            <img src={userImage} alt="user_image" height={'80px'} style={{ marginTop: "-70px", zIndex: -2 }} />
                            <h6>Your Profile</h6>
                            <h6>About</h6>
                            <h6>Contact Us</h6>
                            <h6 onClick={logOut}>Log Out</h6>
                        </div>
                    </div>
                </div>
            </div>
        </nav> */}
    </>
}