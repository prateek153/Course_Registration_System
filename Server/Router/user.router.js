import express from 'express';
import { body, validationResult } from 'express-validator';
import { userLogIn, userRegistration, registeredCourses } from '../Controller/user.controller.js';
import { fetchAllCourses, getCourseByName, registerCourse } from '../Controller/course.controller.js';

const router = express.Router();

// Validation middleware
const validateRegistration = [
    body('name')
        .notEmpty().withMessage('Name is required')
    // .isAlpha().withMessage('Name must only contain letters')
    , body('password')
        .notEmpty().withMessage('Password is required')
        .isAlphanumeric().withMessage('Password must be alphanumeric')
    , body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
];

const validateSignIn = [
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isAlphanumeric().withMessage('Password must be alphanumeric'),
]

// Custom middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

router.post('/registration', validateRegistration, handleValidationErrors, userRegistration);
router.post('/signIn', validateSignIn, handleValidationErrors, userLogIn);
router.get('/getAllCourses', fetchAllCourses);
router.post('/getCourseByName', getCourseByName);
router.post('/registerCourse', registerCourse);
router.post('/registeredCourses', registeredCourses);

export default router;
