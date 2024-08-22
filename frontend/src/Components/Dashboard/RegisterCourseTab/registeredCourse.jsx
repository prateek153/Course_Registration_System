/* eslint-disable no-unused-vars */

import Loading from "../../loading";
import CourseCard from "../CourseTab/CourseCard";

/* eslint-disable react/prop-types */
export default function RegisteredCourse({ registeredCourse }) {
    return <>
        <h1 style={{ color: "black" }}>Registered Courses</h1>

        <div className="container border mb-2 mt-2"></div>
        <div className="container">
            <div className="row">
                {
                    registeredCourse.length ? <>
                        <Loading />
                    </>
                        :
                        registeredCourse.map(course => {
                            return <>
                                <CourseCard course={course} />
                            </>
                        })
                }
            </div>
        </div>
    </>
}