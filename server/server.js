// Import necessary modules
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bodyParser = require('body-parser');

// Create express app
const app = express();

// Create connection to the database
const db = new sqlite3.Database('table.sqlite');

// Create table if it doesn't exist
db.run('CREATE TABLE IF NOT EXISTS users (name TEXT, password TEXT, email TEXT)');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse request bodies as JSON
app.use(express.json());

// Define route handlers
app.get('/', (req, res) => {
  // Serve the login html file
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/home', (req, res) => {
  // Serve the home html file
  res.sendFile(path.join(__dirname, 'public', 'main_page.html'));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Log the user data to the console for debugging
  console.log(`username: ${username}`);
  console.log(`password: ${password}`);  

    // Check if user exists in database
    db.get('SELECT * FROM users WHERE name = ?', [username], (err, row) => {
      if (err) {
        res.status(500).send('Error querying database');
      } else if (row) {
        // Compare the password with the password stored in the database
        bcrypt.compare(password, row.password, function(err, result) {
          if (result) {
            // Passwords match
            res.status(200).send('Login successful');
          } else {
            // Passwords don't match
            res.status(401).send('Incorrect password');
          }
        });
      } else {
        // User doesn't exist
        res.status(401).send('User not found');
      }
    });
  });  

 app.use(bodyParser.urlencoded({ extended: false }));
  
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  // Log the user data to the console for debugging
  console.log(`username: ${username}`);
  console.log(`email: ${email}`);
  console.log(`password: ${password}`);

  // Check if user already exists in database
  db.get('SELECT * FROM users WHERE name = ?', [username], (err, row) => {
    if (err) {
      res.status(500).send('Error querying database');
    } else if (row) {
      res.status(409).send('Username already exists');
    } else {
          // Insert user data into the database
          db.run('INSERT INTO users (name, password, email) VALUES (?, ?, ?)', [username, password, email], (err) => {
            if (err) {
              res.status(500).send('Error inserting user');
            } else {
              res.status(200).send('Account created successfully');
            }
          });
        }
      });
    });  

// Handle 404 errors
app.use(function(req, res, next) {
  res.status(404).send('Not found');
});

// Handle other errors
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Server error');
});

// Start server
const port = 3000;
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
