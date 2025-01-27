// Importing the pg module (PostgreSQL client for Node.js)


import pkg from 'pg';
const {Client} = pkg; // Extracting the Client class for database connection

// Creating a new PostgreSQL client instance with connection details
const con = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'root',
  port: 5432,
});

// Connecting to the PostgreSQL database
con.connect((err) => {
    if (err) {
        console.error('Connection error:', err.stack);
    } else {
        console.log('Connected to PostgreSQL');
    }
});

// Exporting the connection object to use in other parts of the application
export default con;
