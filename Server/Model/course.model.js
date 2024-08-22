import mongoose from 'mongoose';

// Define the schedule schema
const scheduleSchema = new mongoose.Schema({
    days: {
        type: [String], // Array of strings
        required: true
    },
    time: {
        type: String, // Time range as a string
        required: true
    }
});

// Define the course schema
const courseSchema = new mongoose.Schema({
    title: {
        type: String, // Course title
        required: true,
        trim: true
    },
    description: {
        type: String, // Course description
        required: true,
        trim: true
    },
    duration: {
        type: String, // Duration of the course
        required: true,
        trim: true
    },
    instructor: {
        type: String, // Instructor's name
        required: true,
        trim: true
    },
    schedule: {
        type: scheduleSchema, // Embedded schedule schema
        required: true
    }
});

// Create the Course model
export default mongoose.model('Course', courseSchema);