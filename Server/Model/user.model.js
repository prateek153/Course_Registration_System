import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

// Define the User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true,
        set(value) {
            // Hash the password before saving it
            const saltKey = bcrypt.genSaltSync(10);
            const encryptedPassword = bcrypt.hashSync(value, saltKey);
            return encryptedPassword;
        }
    },
    registeredCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "courses"
        }
    ]
}, {
    timestamps: false
});

// Method to compare passwords (useful for login)
userSchema.methods.comparePassword = function (password) {
    return !!bcrypt.compareSync(password, this.password);
};

// Create a model from the schema
export default mongoose.model('User', userSchema);