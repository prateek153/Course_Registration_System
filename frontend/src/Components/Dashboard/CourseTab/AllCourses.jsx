/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */

import CourseCard from "./CourseCard.jsx";

/* eslint-disable react-refresh/only-export-components */
export default ({ allCourse, setIsEnrolled }) => {
    return <>
        <h1 style={{ color: "black" }}>All Courses</h1>
        <div className="container border mb-2 mt-2"></div>

        <div className="d-flex flex-wrap justify-content-around ">
            {
                allCourse.map((course) => {
                    return (
                        <>
                            <CourseCard setIsEnrolled={setIsEnrolled} course={course} />
                        </>
                    );
                })
            }
        </div>
    </>
}