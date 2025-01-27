import { Component } from 'react'
import Login from './Components/Login';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import  Dashboard  from './Components/Dashboard';
import Employee  from './Components/Employee';
import Department from './Components/Department';
import Logout from './Components/Logout';
import Profile from './Components/Profile';
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/adminlogin" replace />} />
      <Route path='/adminlogin' element={<Login />}> </Route>
      {/* <Route path='/dashboard' element={<Dashboard />}></Route> */}
      <Route path='/dashboard' element={<Dashboard />}> 
        <Route path='employee' element={<Employee />}></Route>
        <Route path='department' element={<Department />}></Route>
        <Route path='profile' element={<Profile />}></Route>
        <Route path='logout' element={<Logout />}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
