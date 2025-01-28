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



export { router as adminRouter };
