import express from 'express';
import con from '../utils/db.js';  
import jwt from 'jsonwebtoken';

const router = express.Router();

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

export { router as adminRouter };
