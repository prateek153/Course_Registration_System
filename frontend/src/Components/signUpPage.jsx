import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import API_URLs from '../API_URLs';

const SignUp = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });
    const [confirmPassword, setConfirmPassword] = useState(''); // Separate state for confirm password
    const [errors, setErrors] = useState({});
    const [OnceSubmit, setOnceSubmit] = useState(false);

    const imagePath = 'https://img.freepik.com/free-photo/front-view-hardback-books-with-copy-space_23-2148827222.jpg?t=st=1723630784~exp=1723634384~hmac=dc84edde2409c1f787949962d6b8084e80db9c4c230f92d3c899777228180230&w=360'
    const validate = () => {
        // Add your validation logic here
        const validationErrors = {};
        if (!formData.email) validationErrors.email = 'Email is required';
        else if (!formData.email.includes('.com')) validationErrors.email = 'Invalid Email'

        if (!formData.password) validationErrors.password = 'Password is required';
        else if (formData.password.length < 6) validationErrors.password = 'Min. 6 characters required';

        if (!formData.name) validationErrors.name = 'Name is required';
        if (formData.password !== confirmPassword) validationErrors.confirmPassword = 'Passwords do not match';

        return validationErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'confirmPassword') {
            setConfirmPassword(value);
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }

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
            // Construct the data to submit
            const { password, ...dataToSubmit } = formData; // Exclude confirmPassword
            console.log('Form data submitted:', { ...dataToSubmit, password });

            axios.post(API_URLs.user.registration, formData)
                .then((response) => {
                    console.log(response);
                    alert("Sign in success...");
                    navigate('/');

                })
                .catch((error) => {
                    console.log(error);
                    alert("signIn failed....")
                });
        } else {
            console.log(validationErrors);
            setErrors(validationErrors);
        }
    };

    const navigate = useNavigate();

    return (
        <div id='loginContainer' className='container-fluid d-flex justify-content-center align-items-center' >
            <div className='row rounded login-Box border p-4 col-8'>
                <div className='col-md-6 col-sm-12 col-12 p-3' style={{ backgroundColor: "#ffffff" }} id='shadow'>
                    <img src={imagePath}
                        alt="Login image" className='rounded' height='100%' width='100%' />
                </div>
                        {/* <div style={{ height: '90%' }} className='border'></div> */}
                <div className="rounded col-sm-12 col-md-6 col-12 login-container p-4" id='shadow'>
                    <h2 className='text-center mb-4 text-decoration-underline'>Sign Up</h2>
                    <form onSubmit={handleSubmit} className='d-flex flex-column gap-4 '>
                        <div className="form-group">
                            <label>Name</label>
                            <div>
                                <input
                                    type="text" id="name" name="name" maxLength={25}
                                    aria-describedby="nameHelp" placeholder="Enter name"
                                    value={formData.name} onChange={handleChange}
                                    className={errors.name ? 'form-control error' : 'form-control'}
                                />
                                {errors.name && <small className=" text-danger error-message">{errors.name}</small>}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Email address</label>
                            <div>
                                <input
                                    type="email" id="email" name="email" maxLength={25}
                                    aria-describedby="emailHelp" placeholder="Enter email"
                                    value={formData.email} onChange={handleChange}
                                    className={errors.email ? 'form-control error' : 'form-control'}
                                />
                                {errors.email && <small className=" text-danger error-message">{errors.email}</small>}
                            </div>
                        </div>
                        <div className="form-group">
                            <label >Password</label>
                            <div>
                                <input
                                    type="password" placeholder="Password"
                                    id="password" name="password" maxLength={25}
                                    value={formData.password} onChange={handleChange}
                                    className={errors.password ? 'form-control error' : 'form-control'}
                                />
                                {errors.password && <small className=" text-danger error-message">{errors.password}</small>}
                            </div>
                        </div>
                        <div className="form-group">
                            <label >Confirm Password</label>
                            <div>
                                <input
                                    type="password" placeholder="Password"
                                    id="confirmpassword" name="confirmPassword" maxLength={25}
                                    value={confirmPassword} onChange={handleChange}
                                    className={errors.password ? 'form-control error' : 'form-control'}
                                />
                                {errors.confirmPassword && <small className=" text-danger error-message">{errors.confirmPassword}</small>}
                            </div>
                        </div>

                        <button className='btn btn-success mt-3' type="submit">Submit</button>
                    </form>
                    <p className='text-center mt-3'>
                        Already registered ?&nbsp;
                        <Link className=' text-danger' to={'/'}>
                            Log In
                        </Link>
                        {/* not registered */}
                        {/* Register ? */}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\\

// import { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// // import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
// // import 'bootstrap-icons/font/bootstrap-icons.css'; // Ensure Bootstrap Icons CSS is imported if needed

// const SignUp = () => {
//     const [formData, setFormData] = useState({
//         email: '',
//         password: '',
//         name: ''
//     });
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [errors, setErrors] = useState({});
//     const [OnceSubmit, setOnceSubmit] = useState(false);

//     const imagePath = 'https://img.freepik.com/free-photo/front-view-hardback-books-with-copy-space_23-2148827222.jpg?t=st=1723630784~exp=1723634384~hmac=dc84edde2409c1f787949962d6b8084e80db9c4c230f92d3c899777228180230&w=360';
    
//     const validate = () => {
//         const validationErrors = {};
//         if (!formData.email) validationErrors.email = 'Email is required';
//         else if (!formData.email.includes('.com')) validationErrors.email = 'Invalid Email';

//         if (!formData.password) validationErrors.password = 'Password is required';
//         else if (formData.password.length < 6) validationErrors.password = 'Min. 6 characters required';

//         if (!formData.name) validationErrors.name = 'Name is required';
//         if (formData.password !== confirmPassword) validationErrors.confirmPassword = 'Passwords do not match';

//         return validationErrors;
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         if (name === 'confirmPassword') {
//             setConfirmPassword(value);
//         } else {
//             setFormData(prevState => ({
//                 ...prevState,
//                 [name]: value
//             }));
//         }

//         if (OnceSubmit) {
//             const validationErrors = validate();
//             if (Object.keys(validationErrors).length !== 0) setErrors(validationErrors);
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const validationErrors = validate();
//         setOnceSubmit(true);

//         if (Object.keys(validationErrors).length === 0) {
//             const { password, ...dataToSubmit } = formData;
//             console.log('Form data submitted:', { ...dataToSubmit, password });

//             axios.post('http://localhost:3001/user/registration', formData)
//                 .then((response) => {
//                     console.log(response);
//                     alert("Sign in success...");
//                     navigate('/LogIn');
//                 })
//                 .catch((error) => {
//                     console.log(error);
//                     alert("Sign In failed...");
//                 });
//         } else {
//             console.log(validationErrors);
//             setErrors(validationErrors);
//         }
//     };

//     const navigate = useNavigate();

//     return (
//         <div id='loginContainer' className='container-fluid d-flex justify-content-center align-items-center min-vh-100'>
//             <div className='row w-100'>
//                 {/* Image section */}
//                 <div className='col-md-6 col-12 d-flex align-items-center justify-content-center'>
//                     <img src={imagePath} alt="Sign Up" className='img-fluid rounded' />
//                 </div>
//                 {/* Form section */}
//                 <div className='col-md-6 col-12 d-flex flex-column justify-content-center'>
//                     <div className="d-flex flex-column rounded login-container p-4 bg-white">
//                         <h2 className='text-center mb-4 text-decoration-underline'>Sign Up</h2>
//                         <form onSubmit={handleSubmit} className='d-flex flex-column gap-4'>
//                             <div className="form-group">
//                                 <label htmlFor="name">Name</label>
//                                 <input
//                                     type="text" id="name" name="name" maxLength={25}
//                                     placeholder="Enter name"
//                                     value={formData.name} onChange={handleChange}
//                                     className={`form-control ${errors.name ? 'is-invalid' : ''}`}
//                                 />
//                                 {errors.name && <small className="text-danger">{errors.name}</small>}
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor="email">Email address</label>
//                                 <input
//                                     type="email" id="email" name="email" maxLength={25}
//                                     placeholder="Enter email"
//                                     value={formData.email} onChange={handleChange}
//                                     className={`form-control ${errors.email ? 'is-invalid' : ''}`}
//                                 />
//                                 {errors.email && <small className="text-danger">{errors.email}</small>}
//                             </div>
//                             <div className="form-group position-relative">
//                                 <label htmlFor="password">Password</label>
//                                 <input
//                                     type="password" id="password" name="password" maxLength={25}
//                                     placeholder="Password"
//                                     value={formData.password} onChange={handleChange}
//                                     className={`form-control ${errors.password ? 'is-invalid' : ''}`}
//                                 />
//                                 {errors.password && <small className="text-danger">{errors.password}</small>}
//                             </div>
//                             <div className="form-group position-relative">
//                                 <label htmlFor="confirmpassword">Confirm Password</label>
//                                 <input
//                                     type="password" id="confirmpassword" name="confirmPassword" maxLength={25}
//                                     placeholder="Confirm Password"
//                                     value={confirmPassword} onChange={handleChange}
//                                     className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
//                                 />
//                                 {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
//                             </div>
//                             <button className='btn btn-success mt-3' type="submit">Submit</button>
//                         </form>
//                         <p className='text-center mt-3'>
//                             Already registered?&nbsp;
//                             <Link className='text-danger' to={'/LogIn'}>
//                                 Log In
//                             </Link>
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SignUp;
