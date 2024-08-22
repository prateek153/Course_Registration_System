import Course from "../Model/course.model.js";
import User from "../Model/user.model.js";

export const addCourse = (req, res, next) => {
    // title, description, duration, instructor, and schedule   
    Course.create(req.body)
        .then(result => {
            console.log(result);
            return res.status(200).json({ Message: "Course added..." });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ Error: "internal Server Error..." });
        });

}

export const addCourseInBulk = async (req, res, next) => {
    // title, description, duration, instructor, and schedule   
    try {
        // for (let course of courses)
        for (let course of req.body)
            await Course.create(course);

        return res.status(200).json({ Message: "All Courses added..." });

    } catch (error) {
        console.log(err);
        return res.status(500).json({ Error: "internal Server Error..." });
    }
}

export const getCourseByName = async (request, response, next) => {
    try {
        let { searchQuery } = request.body;

        console.log(typeof searchQuery, searchQuery);
        if (!searchQuery || typeof searchQuery !== 'string') {
            throw new Error('Invalid search query');
        }

        // Build the aggregation pipeline
        const pipeline = [
            {
                $match: {
                    title: {
                        $regex: searchQuery, // Use regex for partial matching
                        $options: 'i'       // Case-insensitive search
                    }
                }
            }
        ];

        // Check if the pipeline is not empty
        if (pipeline.length === 0)
            throw new Error('Aggregation pipeline is empty');

        // Execute the aggregation pipeline
        const courses = await Course.aggregate(pipeline);
        console.log(courses);

        if (!courses)
            return response.status(202).json({ Messgae: 'Oops, no record found' });

        return response.status(200).json({ Messgae: 'All relevant courses', data: courses });

    } catch (error) {
        console.log(error);
        return response.status(500).json({ Error: 'Internal Server error' });
    }
}

export const fetchAllCourses = (request, response, next) => {
    Course.find()
        .then(result => {
            if (!result)
                return response.status(201).json({ Message: "No record found" });

            return response.status(200).json({ Message: "All courses list", data: result });
        })
        .catch(error => {
            console.log(error);
            return response.status(500).json({ Error: "Internal Server Error" })
        })
}

export const registerCourse = async (request, response, next) => {
    try {
        let { UserId, CourseId } = request.body;
        const user = await User.findById(UserId);


        if (user.registeredCourses.includes(CourseId))
            return response.status(400).json({ Error: "Course is already registered" });

        await User.updateOne(
            { _id: UserId },
            { $push: { registeredCourses: CourseId } }
        );

        return response.status(200).json({ message: "Course registered successfully" });
    } catch (error) {
        console.log(error);
        return response.status(500).json({ Error: "Internal server error" });
    }
}
