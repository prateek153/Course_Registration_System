import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
import API_URLs from '../API_URLs';
import { MessageContext } from '../App';

const Login = () => {
    const showMessage = useContext(MessageContext);

    const [formData, setFormData] = useState({ email: '', password: '', });

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errors, setErrors] = useState({});
    const [OnceSubmit, setOnceSubmit] = useState(false);

    const imagePath = "https://img.freepik.com/free-vector/boy-learning-from-home-electronic-device_1308-76080.jpg?t=st=1723617309~exp=1723620909~hmac=d37bff5983cb79b74246d6f845b610d14637f9cce1640b87b5456f30ddb9eca1&w=740";
    const validate = () => {
        // Add your validation logic here
        const validationErrors = {};
        if (!formData.email) validationErrors.email = 'Email is required';
        else if (!formData.email.includes('.com')) validationErrors.email = 'Invalid Email'
        if (!formData.password) validationErrors.password = 'Password is required';
        else if (formData.password.length < 5) validationErrors.password = 'Min. 6 characters required';

        return validationErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (OnceSubmit) {
            const validationErrors = validate();
            if (Object.keys(validationErrors).length !== 0) setErrors(validationErrors);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setOnceSubmit(true);

        if (Object.keys(validationErrors).length === 0) {
            const { password, ...dataToSubmit } = formData; // Exclude confirmPassword
            console.log('Form data submitted:', { ...dataToSubmit, password });

            axios.post(API_URLs.user.logIn, formData)
                .then((response) => {
                    showMessage("Great", response.data.message, "success")
                    navigate('/Dashboard');

                    sessionStorage.setItem("isLoggedIn", "true");
                    sessionStorage.setItem("token", response.data.token);
                    sessionStorage.setItem("UserId", response.data.userId);

                })
                .catch((error) => {
                    console.log(error);
                    if (error.response.status === 404) {
                        showMessage("Oops...", error.response.data.error, "error")
                        navigate('/SignUp');
                    }
                    else {
                        showMessage("Oops...", error.response.data.error, "error")
                    }

                });
        } else {
            console.log(validationErrors);
            setErrors(validationErrors);
        }
    };

    const navigate = useNavigate();

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div id='loginContainer' className='container-fluid d-flex justify-content-center align-items-center' >
            <div className='row rounded login-Box border p-4 col-8'>
                <div className='col-md-6 col-sm-12 col-12 p-3' style={{ backgroundColor: "#ffffff" }} id='shadow'>
                    <img src={imagePath}
                        alt="Login image" className='rounded' height='100%' width='100%' />
                </div>
                {/* <div style={{ height: '90%' }} className='border'></div> */}
                <div className="rounded col-sm-12 col-md-6 col-12 login-container p-4" id='shadow'>
                    <h2 className='text-center mb-4 text-decoration-underline'>Log In</h2>
                    <form onSubmit={handleSubmit} className='d-flex flex-column gap-4 '>
                        <div className="form-group">
                            <label>Email address</label>
                            <div>
                                <input
                                    type="email" id="email" name="email" maxLength={25}
                                    aria-describedby="emailHelp" placeholder="Enter email"
                                    value={formData.email} onChange={handleChange}
                                    className={errors.email ? 'form-control error' : 'form-control'}
                                />
                                {errors.email && <p className="text-danger error-message">{errors.email}</p>}
                            </div>
                        </div>
                        {/* <div className="form-group">
                            <label >Password</label>
                            <div>
                                <input
                                    type="password" placeholder="Password"
                                    id="password" name="password" maxLength={12}
                                    value={formData.password} onChange={handleChange}
                                    className={errors.password ? 'form-control error' : 'form-control'}
                                />
                                {errors.password && <p className="text-danger error-message">{errors.password}</p>}
                            </div>
                        </div> */}
                        <div className="form-group position-relative">
                            <label htmlFor="password">Password</label>
                            <div className="d-flex">
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    id="password" name="password" maxLength={12}
                                    placeholder="Password"
                                    value={formData.password} onChange={handleChange}
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                />
                                <button
                                    type="button" style={{ top: '40px', border: 'none' }}
                                    className="btn position-absolute end-0 translate-middle-y"
                                    onClick={togglePasswordVisibility}
                                    aria-label={passwordVisible ? "Hide password" : "Show password"}
                                >
                                    {passwordVisible ? (
                                        <i className="bi bi-eye-slash"></i> // Eye-slash icon for hiding password
                                    ) : (
                                        <i className="bi bi-eye"></i> // Eye icon for showing password
                                    )}
                                </button>
                            </div>
                            {errors.password && <p className="text-danger">{errors.password}</p>}
                        </div>
                        <button className='btn btn-success mt-3' type="submit">Submit</button>
                    </form>
                    <p className='text-center mt-3'>
                        Don{"'"}t have an Account ?&nbsp;
                        <Link className=' text-danger' to={'/SignUp'}>
                            Sign Up
                        </Link>
                        {/* not registered */}
                        {/* Register ? */}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
