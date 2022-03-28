const express = require("express");
const app = express();
var mysql = require("mysql");
const cors = require("cors");
const {body, validationResult } = require('express-validator');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "root",
  database: "mini_project",
  socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
});

app.get("/getemployee", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log("get complete");
    }
  });
});

app.post("/create-emp", body('email').isEmail() , (req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const cardnumber_id = req.body.cardnumber_id;
  const email = req.body.email;
  const phone_number = req.body.phone_number;
  const gender = req.body.gender;
  const images = req.body.images;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  db.query(
    "INSERT INTO employees (first_name, last_name, cardnumber_id, email, phone_number, gender, images) VALUE(?,?,?,?,?,?,?)",
    [first_name, last_name, cardnumber_id, email, phone_number, gender, images],
    (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result);
            console.log("Value Create!!");
        }
    }
  );
});

app.put("/emp-update", (req, res) => {
    const employee_id = req.body.employee_id;
    const phone_number = req.body.phone_number;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    console.log(req.body);
    // console.log(req.body.phone_number);

    if(phone_number != null && employee_id != null){
      db.query("UPDATE employees SET phone_number = ? WHERE employee_id = ?", [phone_number,employee_id], (err,result) =>{
        if(err){
            console.log(err);
        } else {
            res.send();
            console.log('update phone_number complete');
        }
    });
    }

    if(req.body.first_name != null && employee_id != null){
      db.query("UPDATE employees SET first_name = ? WHERE employee_id = ?", [first_name,employee_id], (err,result) => {
        if(err){
          console.log(err);
        } else {
          res.send();
          console.log('update first_name complete')
        }
      })
    }

    if(req.body.last_name != null && employee_id != null){
      db.query("UPDATE employees SET last_name = ? WHERE employee_id = ?", [last_name,employee_id], (err,result) => {
        if(err){
          console.log(err);
        } else {
          res.send();
          console.log('update last_name complete')
        }
      })
    }

    if(req.body.email != null && employee_id != null){
      db.query("UPDATE employees SET email = ? WHERE employee_id = ?", [email,employee_id], (err,result) => {
        if(err){
          console.log(err);
        } else {
          res.send();
          console.log('update email complete')
        }
      })
    }

})
app.put("/emp-update/:employee_id", (req, res) => {
    const employee_id = req.body.employee_id;
    const phone_number = req.body.phone_number;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    console.log(req.body);
    // console.log(req.body.phone_number);

    if(phone_number != null && employee_id != null){
      db.query("UPDATE employees SET phone_number = ? WHERE employee_id = ?", [phone_number,employee_id], (err,result) =>{
        if(err){
            console.log(err);
        } else {
            res.send();
            console.log('update phone_number complete');
        }
    });
    }

    if(req.body.first_name != null && employee_id != null){
      db.query("UPDATE employees SET first_name = ? WHERE employee_id = ?", [first_name,employee_id], (err,result) => {
        if(err){
          console.log(err);
        } else {
          res.send();
          console.log('update first_name complete')
        }
      })
    }

    if(req.body.last_name != null && employee_id != null){
      db.query("UPDATE employees SET last_name = ? WHERE employee_id = ?", [last_name,employee_id], (err,result) => {
        if(err){
          console.log(err);
        } else {
          res.send();
          console.log('update last_name complete')
        }
      })
    }

    if(req.body.email != null && employee_id != null){
      db.query("UPDATE employees SET email = ? WHERE employee_id = ?", [email,employee_id], (err,result) => {
        if(err){
          console.log(err);
        } else {
          res.send();
          console.log('update email complete')
        }
      })
    }

})

app.delete("/emp-delete/:employee_id", (req, res) => {
    const employee_id = req.params.employee_id;
    db.query("DELETE FROM employees WHERE employee_id = ?", employee_id, (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result);
            console.log("delete summit")
        }
    });
})

app.listen(3002, () => {
  console.log("listen on port 3002");
});
