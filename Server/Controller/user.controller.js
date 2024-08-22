import Course from "../Model/course.model.js";
import User from "../Model/user.model.js";
import jwt from "jsonwebtoken";

export const userRegistration = async (req, res, next) => {
  try {
    let { email } = req.body;    // Find user by email
    let userData = await User.findOne({ email });

    if (userData) // Check user already exists or not
      return res.status(404).json({ Message: "User already exists" });

    // User data added to userList
    userData = await User.create(req.body);
    return res.status(200).json({ Message: "User Registration scussefully", userData })

  } catch (error) {
    console.log(error);
    return res.status(500).json({ Error: "Internal server error" });
  }
};

export const userLogIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Validate input
    if (!email || !password)
      return res.status(400).json({ error: 'Email and password are required' });

    // Find user by email
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ error: 'User not found' });

    // Compare the provided password with the stored password
    const isMatch = user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ error: 'Invalid password' });

    // Generate JWT token

    const payload = { userId: user._id, email: user.email };
    const token = jwt.sign(payload, process.env.UserSECRET_KEY, { expiresIn: '1d' });

    return res.status(200).json({
      message: 'Login successful', userId: user._id,
      token
    });

  } catch (err) {
    console.error('Login error:', err); // Improved logging
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const registeredCourses = async (request, response, next) => {
  const { _id } = request.body;
  try {
    let result = await User.findOne({ _id }, 'registeredCourses').exec()
    let courseArray = [];

    for (const courseId of result.registeredCourses) {
      let courseObj = await Course.findOne({ _id: courseId });
      courseArray.push(courseObj);
    }

    return response.status(200).json({ Message: "All Registerd course", data: courseArray });

  } catch (error) {
    console.log(error);
    return response.status(500).json({ Error: "Internal server error" })
  }
}