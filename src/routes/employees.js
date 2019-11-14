const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

// GET all Employees
router.get('/Employees/', (req, res) => {
    mysqlConnection.query('SELECT * FROM employee', (err, rows, fields) => {
      if(!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });  
  });

// GET An Employee
router.get('/Employees/:id', (req, res) => {
    const { id } = req.params; 
    mysqlConnection.query('SELECT * FROM employee WHERE id = ?', [id], (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        console.log(err);
      }
    });
  });

// INSERT An Employee
router.post('/Employees', (req, res) => {
    const {id, name, salary} = req.body;
    const query = `
      CALL employeeAddOrEdit(?, ?, ?);
    `;
    mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Employeed Saved'});
      } else {
        console.log(err);
      }
    });
  });

// DELETE An Employee
router.delete('/Employees/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM employee WHERE id = ?', [id], (err, rows, fields) => {
        if(!err) {
        res.json({status: 'Employee Deleted'});
        } else {
        console.log(err);
        }
    });
});

router.put('/Employees/:id', (req, res) => {
    const { name, salary } = req.body;
    const { id } = req.params;
    const query = `
        CALL employeeAddOrEdit(?, ?, ?);
    `;
    mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
        if(!err) {
        res.json({status: 'Employee Updated'});
        } else {
        console.log(err);
        }
    });
});


module.exports = router;