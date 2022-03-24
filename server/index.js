const express = require("express");
const app = express();
var mysql = require("mysql");
const cors = require("cors");

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

app.post("/create-emp", (req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const cardnumber_id = req.body.cardnumber_id;
  const email = req.body.email;
  const phone_number = req.body.phone_number;
  const gender = req.body.gender;

  db.query(
    "INSERT INTO employees (first_name, last_name, cardnumber_id, email, phone_number, gender) VALUE(?,?,?,?,?,?)",
    [first_name, last_name, cardnumber_id, email, phone_number, gender],
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
    db.query("UPDATE employees SET phone_number = ? WHERE employee_id = ?", [phone_number,employee_id], (err,result) =>{
        if(err){
            console.log(err);
        } else {
            res.send();
            console.log('update complete');
        }
    });
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

app.listen(3001, () => {
  console.log("listen on port 3001");
});
