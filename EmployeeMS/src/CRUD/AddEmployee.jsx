import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Department from '../Components/Department';
import { useNavigate } from 'react-router-dom';
const AddEmployee = () => {

  const [department, setDepartment] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/department")
      .then((result) => {
        if (result.data.Status) {
          setDepartment(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);


  const [employee, setEmployee] = useState({
    name: "",
    department: "",
    salary: "",
    mail: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', employee.name);
    formData.append('department', employee.department);
    formData.append('salary', employee.salary);
    formData.append('mail', employee.mail);

    axios
      .post('http://localhost:3000/auth/add_employee', employee)
      .then(result => {
        if (result.data.Status) {
          navigate('/dashboard/employee')
        } else {
          alert(result.data.Error)
        }
      })
      .catch(err => console.log(err))
  };


  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          {/* name field */}
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>

          {/* Department field */}
          <div className="col-12">
            <label htmlFor="department" className="form-label">
              Department
            </label>
            <select
              name="department"
              id="department"
              className="form-select"
              onChange={(e) => setEmployee({ ...employee, department: e.target.value })
              }>

              {department.map((c) => {
                return <option  key={c.id} value={c.id}>{c.department}
                </option>
              })}
            </select>
          </div>

          {/* salary field */}
          <div className="col-12">
            <label htmlFor="inputSalary" className="form-label">
              Salary
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Enter Salary"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
            />
          </div>

          {/* email field */}
          <div className="col-12">
            <label htmlFor="inputEmail4" className="form-label">
              mail
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, mail: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default AddEmployee
