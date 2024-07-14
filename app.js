
const express = require('express');
const mysql = require('mysql');


const db = mysql.createPool({
  host: 'localhost',
  user: 'root', 
  password: 'aryan',
  database: 'expense_tracker'
});


const app = express();


app.use(express.json());


app.post('/transactions', function(req, res) {
  const { amount, description, type } = req.body;
  const sql = 'INSERT INTO transactions (amount, description, type) VALUES (?, ?, ?)';
  db.query(sql, [amount, description, type], function(err, result) {
    if (err) {
      console.error(err);
      res.status(500).send('Error adding transaction');
    } else {
      res.status(201).send('Transaction added successfully');
    }
  });
});


app.get('/transactions', function(req, res) {
  db.query('SELECT * FROM transactions', function(err, rows) {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching transactions');
    } else {
      res.json(rows);
    }
  });
});


app.listen(4000);
