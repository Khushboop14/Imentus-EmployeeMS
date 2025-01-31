import express from 'express';
import con from '../utils/db.js';  
import jwt from 'jsonwebtoken';


const router = express.Router();

// Route for Admin login 

router.post('/adminlogin', (req, res) => {
    console.log('Received data:', req.body); // Log the received data
 
    const sql = "SELECT * FROM adminlogin WHERE email = $1 AND password = $2";  // Use parameterized query for PostgreSQL
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) {
            console.error('Database query error:', err); // Log the error
            return res.status(500).json({ loginStatus: false, Error: "Query error" });
        }
        console.log('Query result:', result.rows); // Log the result (PostgreSQL stores rows in 'result.rows')
 
        if (result.rows.length > 0) {
            const email = result.rows[0].email; // Access rows array
            const token = jwt.sign(
                { role: "admin", email: email },
                "jwt_secret_key",  // Consider using process.env.JWT_SECRET for better security
                { expiresIn: '1d' }
            );

            res.cookie('token', token);
            return res.json({ loginStatus: true, Error: "Login successful", token });
        } else {
            return res.json({ loginStatus: false, Error: "Invalid email or password" });
        }
    });
});

//Route to show list of department
router.get('/department', (_req, res) => {
    const sql = "SELECT * FROM department"; // Your query to fetch departments

    con.query(sql, (err, result) => {
        if (err) {
            console.error("Database Query Error:", err); // Debug database errors
            return res.status(500).json({ Status: false, Error: "Database Query Error" });
        } else {
            // Ensure that the result is in the expected format
            return res.json({ Status: true, Result: result.rows }); // Use result.rows to return the array of rows
        }
    });
});

// Route for adding a Department
router.post('/add_department', (req, res) => {
    const sql = "INSERT INTO department (department) VALUES ($1) RETURNING *";
    const values = [req.body.department];

    console.log("Request Body:", req.body); // Debug the incoming data

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error("Database Query Error:", err); // Debug database errors
            return res.status(500).json({ Status: false, Error: "Database Query Error" });
        }
        console.log("Inserted Row:", result.rows[0]); // Confirm successful insertion
        res.json({
            Status: true,
            Message: "Department added successfully!",
            Data: result.rows[0],
        });
    });
});


// Route for adding an Employee
router.post('/add_employee', (req, res) => {
    console.log('Request Body:', req.body); // Check if data is correct
    const sql = "INSERT INTO employee (name, department, salary, mail) VALUES ($1, $2, $3, $4) RETURNING *";
    // const employee = [
    //     req.body.employee.name,
    //     req.body.employee.department,
    //     req.body.employee.salary,
    //     req.body.employee.mail
    // ];
    const employee = [
        req.body.name,        // Directly access req.body
        req.body.department,
        req.body.salary,
        req.body.mail
    ];
   
    con.query(sql, values, (err, result) => {
        if (err) {
            console.error("Database Query Error:", err);
            return res.status(500).json({ Status: false, Error: "Database Query Error" });
        }
        console.log("Inserted Row:", result.rows[0]); // Confirm successful insertion
        res.json({
            Status: true,
            Message: "Employee added successfully!",
            Data: result.rows[0],
        });
    });
});


//Route for Showing Employee
router.get('/auth/employee', (req, res) => {
    const sql = "SELECT * FROM employee"; // Your query to fetch departments

    con.query(sql, (err, result) => {
        if (err) {
            console.error("Database Query Error:", err); // Debug database errors
            return res.status(500).json({ Status: false, Error: "Database Query Error" });
        } else {
            // Ensure that the result is in the expected format
            return res.json({ Status: true, Result: result.rows }); // Use result.rows to return the array of rows
        }
    });
});

//Route to update employee

// router.put('/edit_employee/:id', (req, res) => {
//     const id = req.params.id;
//     const { name, department, salary, mail } = req.body;

//     const sql = `UPDATE employee 
//        SET name = $1, department = $2, salary = $3, mail = $4 
//        WHERE id = $5`;
//     const values = [
//         req.body.name,
//         req.body.department,
//         req.body.salary,
//         req.body.mail
//     ]
//     con.query(sql,[...values, id], (err, result) => {
//         if(err) return res.json({Status: false, Error: "Query Error"+err})
//         return res.json({Status: true, Result: result})
//     })
// })
router.put('/edit_employee/:id', (req, res) => {
    const id = req.params.id;
    const { name, department, salary, mail } = req.body;

    const sql = "UPDATE employee SET name = $1, department = $2, salary = $3, mail = $4 WHERE id = $5";
    const values = [name, department, salary, mail];

    con.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ Status: false, Error: "Query Error" + err });
        }
        return res.json({ Status: true, Result: result.rows });
    });
});


//Route to delete employee
router.delete('/delete_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "delete from employee where id = $1"
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

//Route to logout
router.get('/logout', (req,res) => {
    res.clearCookie('token')
    return res.json({Status: true})
})

export { router as adminRouter };
