import React from 'react'
import { Link, useNavigate, Outlet } from 'react-router-dom'
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from 'axios';

const Dashboard = () => {

  const navigate = useNavigate(); // Initialize `navigate`
  // const handleLogout = () => {
	// 	axios.get('http://localhost:3000/auth/logout')
	// 	.then(res => {
  //     console.log('Logout Successful');
	// 		navigate('/')
	// 	}).catch(err => console.log(err));
	// };
  axios.defaults.withCredentials=true
  const handleLogout = () => {
    axios.get('http://localhost:3000/auth/logout')
    .then(result => {
      if(result.data.Status) { 
        localStorage.removeItem("valid")
        navigate('/adminlogin')
      }
    })
  }

  return (
    <div className="container-fluid">

      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">

          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link
              to="/dashboard"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 fw-bolder d-none d-sm-inline">
                Khushboo Parmar
              </span>
            </Link>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              {/* dashboard
              <li className="w-100">
                <Link
                  to="/dashboard"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-speedometer2 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li> */}

              {/* Manage Employees */}
              <li className="w-100">
                <Link
                  to="/dashboard/employee"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-people ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Manage Employees
                  </span>
                </Link>
              </li>

              {/* Department */}
              <li className="w-100">
                <Link
                  to="/dashboard/department"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-columns ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Department</span>
                </Link>
              </li>

              {/* Profile */}
							<li>
								<Link to="/dashboard/profile" className="nav-link px-0 align-middle text-white">
									<i className="fs-4 bi-person"></i> <span className="ms-1 d-none d-sm-inline">Profile</span></Link>
							</li>

              {/* Logout */}
							<li onClick={handleLogout}>
								<a href="#" className="nav-link px-0 align-middle text-white">
									<i className="fs-4 bi-power"></i> <span className="ms-1 d-none d-sm-inline">Logout</span></a>
							</li>
            </ul>
          </div>
        </div>
        <div className="col p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow">
            <h3> Employees Managment System</h3>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
export default Dashboard;