import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'




 const EditEmployee = () => {

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
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
    <div className="p-3 rounded w-50 border">
      <h3 className="text-center">Add Employee</h3>
      <form className="row g-1">
        {/* name field */}
        <div className="col-12">
          <label htmlfor="inputName" className="form-label">
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
          <label htmlfor="department" className="form-label">
            Department
          </label>
          <select
            name="department"
            id="department"
            className="form-select"
            onChange={(e) => setEmployee({ ...employee, department: e.target.value })
            }>

            {department.map((c) => {
              return <option value={c.id}>{c.department}
              </option>
            })}
          </select>
        </div>

        {/* salary field */}
        <div className="col-12">
          <label htmlfor="inputSalary" className="form-label">
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
          <label htmlfor="inputEmail4" className="form-label">
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
































// ===================== OLD =====================================
// import React from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { useEffect, useState } from 'react'


// const EditEmployee = () => {
//     const {id} = useParams()
//     // const navigate = useNavigate();
//     const [department, setDepartment] = useState([])
//       const [employee, setEmployee] = useState({
//         name: "",
//         department: "",
//         salary: "",
//         mail: "",
//       });


//     //   useEffect(() => {
//     //     axios.get('http://localhost:3000/auth/department')
//     //       .then(result => {
//     //         if (result.data.Status) {
//     //           setDepartment(result.data.Result);
//     //         } else {
//     //           alert(result.data.Error);
//     //         }
//     //       }).catch(err => {
//     //         console.log("error fetching departments:", err);
//     //       });

//       //     //Fetch employee details
//       //     axios.get('http://localhost:3000/auth/edit_employee/:id')
//       //     .then(result => {
//       //       //  const employeedata = result.data.Result[0];
//       //         setEmployee(prevState => ({
//       //             ...prevState,
//       //             name: result.data.Result[0].name,
//       //             department: result.data.Result[0].department,
//       //             salary: result.data.Result[0].salary,
//       //             mail: result.data.Result[0].mail,
//       //         }))
//       //     }).catch(err => console.log(err))
//       // }, []);
    
//     //   const handleSubmit = (e) => {
//     //     e.preventDefault()

//     //     //update employee
//     //     axios.put('http://localhost:3000/auth/edit_employee/:id', employee)
//     //     .then(result => {
//     //         if(result.data.Status) {
//     //             navigate('/dashboard/employee')
//     //         } else {
//     //             alert(result.data.Error)
//     //         }
//     //     }).catch(err => console.log(err))
//     // }
    
//     return (
//         <div className="d-flex justify-content-center align-items-center mt-3">
//           <div className="p-3 rounded w-50 border">
//             <h3 className="text-center">Edit Employee</h3>
//             {/* <form className="row g-1"onSubmit={handleSubmit}> */}
//             <form className="row g-1">

//               {/* name field */}
//               <div className="col-12">
//                 <label for="inputName" className="form-label">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control rounded-0"
//                   id="inputName"
//                   placeholder="Enter Name"
//                   value={employee.name}
//                   onChange={(e) =>
//                     setEmployee({ ...employee, name: e.target.value })
//                   }
//                 />
//               </div>
    
//               {/* Department field */}
//               <div className="col-12">
//                 <label for="department" className="form-label">
//                   Department
//                 </label>
//                 <select
//                   name="department"
//                   id="department"
//                   className="form-select"
//                   onChange={(e) => setEmployee({ ...employee, department: e.target.value })
//                   }>
//                   {department.map((c) => {
//                     return <option key = {c.id}value={c.id}>{c.department}
//                     </option>
//                   })}
//                 </select>
//               </div>
    
//               {/* salary field */}
//               <div className="col-12">
//                 <label for="inputSalary" className="form-label">
//                   Salary
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control rounded-0"
//                   id="inputSalary"
//                   placeholder="Enter Salary"
//                   autoComplete="off"
//                   value={employee.salary}
//                   onChange={(e) =>
//                     setEmployee({ ...employee, salary: e.target.value })
//                   }
//                 />
//               </div>
    
//               {/* email field */}
//               <div className="col-12">
//                 <label for="inputEmail4" className="form-label">
//                   mail
//                 </label>
//                 <input
//                   type="email"
//                   className="form-control rounded-0"
//                   id="inputEmail4"
//                   placeholder="Enter Email"
//                   autoComplete="off"
//                   value={employee.mail}
//                   onChange={(e) =>
//                     setEmployee({ ...employee, mail: e.target.value })
//                   }
//                 />
//               </div>
    
//               <div className="col-12">
//                 <button type="submit" className="btn btn-primary w-100">
//                   Update Employee
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )
  
// }
export default EditEmployee