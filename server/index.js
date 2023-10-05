const express = require('express'); 
const mysql = require('mysql');
const cors = require('cors');
const session = require('express-session');
// const sql = require('mssql');

const app = express();

app.use(express.json());
app.use(cors());


const db = mysql.createConnection({
    user: "root",
    host: "127.0.0.1",
    password: "password",
    database: "inno"
}) 


db.connect(function(err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
});


app.post('/signup', (reg, res) => {

    const username = reg.body.username;
    const userpassword = reg.body.password;

    db.query(
        "SELECT * FROM Authentication WHERE username = ?",
        [username],
        (err, rows) => {
            if (err) {
                console.log(err);
                res.status(500).json({ success: false, message: 'Server error' });
            } else {
                if (rows.length > 0) {
                    // Username already exists
                    res.status(500).json({ success: false, message: 'same username' });
                } else {
                    // Username is unique, proceed with INSERT
                    db.query(
                        "INSERT INTO Authentication (username, userpassword) VALUES (?,?)",
                        [username, userpassword],
                        (err, result) => {
                            if (err) {
                                console.log(err);
                                res.status(500).json({ success: false, message: 'Server error' });
                            } else {
                                res.status(200).json({ success: true, message: 'Registration successful' });
                            }
                        }
                    );
                }
            }
        }
    );
})



app.post('/login', (reg, res) => {

    const username = reg.body.username;
    const userpassword = reg.body.password;
    

    db.query(
        "SELECT * FROM Authentication WHERE username = ? AND userpassword = ?", 
        [username, userpassword],
        (err, result) => {
            if (err) {
                console.log(err)
                res.status(200).json({success: true, message: 'false'})
            }else {
                console.log("true");
                res.status(200).json({ success: true, message: 'true' })
            }
        }
    )
})

app.listen(3002, () => {
    console.log("server is running")
})



