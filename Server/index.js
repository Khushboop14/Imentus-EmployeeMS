import express from "express";// Express framework for building web applications
import cors from 'cors'  // Middleware to enable CORS
import {adminRouter} from "./Routes/AdminRoutes.js";  // Importing admin routes
const app = express()
app.use(cors({
    origin: ["http://localhost:5173"],
    method: ['GET', 'POST', 'PUT'],
    credentials: true

}))
// app.get('/adminlogin', (req, res) => {
//     res.send('Welcome to the Server!');
// });

app.use(express.json()) //to converet our data into json formate
app.use('/auth', adminRouter);
// Starting the server and listening on port 3000
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

// app.listen(3000, () => {
//     console.log("Server is running")
// })