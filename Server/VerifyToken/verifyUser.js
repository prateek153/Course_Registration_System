import pkg from 'jsonwebtoken';
const { verify } = pkg;

export const verifyUser = async (request, response, next) => {
    try {

        let token = request.headers.authorization;
        console.log(token);
        token = token.split(' ')[1];
        console.log(token);

        // verify(token, process.env.SECRET_KEY);
        // console.log(token);
        // return response.status(200).json({ token });

    } catch (error) {
        console.log(error);
        return response.status(500).json({ Error: "Internal server error...." })
    }
}

export const verifyInstructor = async (request, response, next) => {
    try {
        let token = request.headers.authorization;
        token = token.split(' ')[1];

        let isAuthorized = verify(token, process.env.InstructorSECRET_KEY);

        if (!isAuthorized)
            return response.status(200).json({ Message: "Instructor is unAuthorized" });
        next();

    } catch (error) {
        console.log(error);
        return response.status(500).json({ Error: "Internal server error...." })
    }
}