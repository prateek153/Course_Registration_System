import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const navigate = useNavigate();

    if (isLoggedIn)
        return children;
    else {
        navigate('/');
        alert("Sign In first...")
    }
}

export default ProtectedRoute;