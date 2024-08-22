/* eslint-disable no-unused-vars */
import { Route, Routes } from 'react-router-dom'
import './App.css'
import SignUp from './Components/signUpPage'
import LoginPage from "./Components/loginPage";
import ProtectedRoute from './Components/protectedRoute';
import Dashboard from './Components/Dashboard/Dashboard';
import CourseCardDetails from './Components/Dashboard/CourseTab/CourseCardDetails';
import Swal from 'sweetalert2';
import { createContext } from 'react';

export const MessageContext = createContext();
// error, info, question, success, warning
function App() {

  const showMessage = (title, text, icon) => {
    Swal.fire({ title, text, icon });
  }

  return (
    <>
      <MessageContext.Provider value={showMessage}>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/Dashboard' element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>} />
          <Route path='/CourseCardDetails' element={
            <ProtectedRoute>
              <CourseCardDetails />
            </ProtectedRoute>} />
        </Routes>
      </MessageContext.Provider>
    </>
  )
}

export default App
