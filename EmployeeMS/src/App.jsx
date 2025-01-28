
// export default App
import Login from './Components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import Dashboard from './Components/Dashboard';
import Employee from './Components/Employee';
import Department from './Components/Department';
import Logout from './Components/Logout';
import Profile from './Components/Profile';
import { AddDepartment } from './CRUD/AddDepartment';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to admin login */}
        <Route path="/" element={<Navigate to="/adminlogin" replace />} />
        
        {/* Admin login route */}
        <Route path="/adminlogin" element={<Login />} />
        
        {/* Dashboard and nested routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="/dashboard/employee" element={<Employee />} />
          <Route path="/dashboard/department" element={<Department />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/logout" element={<Logout />} />
          <Route path="/dashboard/add_department" element={<AddDepartment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
