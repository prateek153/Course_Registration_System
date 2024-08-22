export default {
    user: {
        registration: 'http://localhost:3001/user/registration',
        logIn: 'http://localhost:3001/user/signIn',
        registerCourse: 'http://localhost:3001/user/registerCourse',
        RegisteredCourse: 'http://localhost:3001/user/registeredCourses',
    },
    instructor: {
        registration: 'http://localhost:3001/instructor/registration',
        logIn: 'http://localhost:3001/instructor/signIn',
    },
    course: {
        getAll: 'http://localhost:3001/user/getAllCourses',
        getByName: 'http://localhost:3001/user/getCourseByName',
        addCourse: 'http://localhost:3001/instructor/addCourse',
        addInBulk: 'http://localhost:3001/instructor/addCourseInBulk',
    }
}