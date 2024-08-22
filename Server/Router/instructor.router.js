import express from "express";
import { verifyInstructor } from "../VerifyToken/verifyUser.js";
import { addCourse, addCourseInBulk, fetchAllCourses } from "../Controller/course.controller.js";

const router = express.Router();
// Validation middleware
// const validateRegistration = [
//     body('name')
//         .notEmpty().withMessage('Name is required')
//     // .isAlpha().withMessage('Name must only contain letters')
//     , body('password')
//         .notEmpty().withMessage('Password is required')
//         .isAlphanumeric().withMessage('Password must be alphanumeric')
//     , body('email')
//         .notEmpty().withMessage('Email is required')
//         .isEmail().withMessage('Invalid email format')
// ];

// const validateSignIn = [
//     body('email')
//         .notEmpty().withMessage('Email is required')
//         .isEmail().withMessage('Invalid email format'),
//     body('password')
//         .notEmpty().withMessage('Password is required')
//         .isAlphanumeric().withMessage('Password must be alphanumeric'),
// ]

// // Custom middleware to handle validation errors
// const handleValidationErrors = (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     next();
// };

// router.post('/registration', validateRegistration, handleValidationErrors, userRegistration);
// router.post('/signIn', validateSignIn, handleValidationErrors, userLogIn);

router.post("/addCourse", addCourse);
router.post("/addCourseInBulk",
    // verifyInstructor,
    addCourseInBulk);
router.get('/getAllCourses', fetchAllCourses);

export default router;