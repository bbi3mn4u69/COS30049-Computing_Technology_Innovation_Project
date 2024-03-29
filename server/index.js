const express = require('express'); 
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();


app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))


const db = mysql.createPool({
    user: "root",
    host: "127.0.0.1",
    password: "password",
    database: "inno",
})


app.post('/signup', (reg, res) => {

    const username = reg.body.username;
    const userpassword = reg.body.password;

    db.query( 
        "SELECT * FROM Authentication WHERE username = ?",
        [username],
        (err, rows) => {
            if (err) {
                console.log(err);
                res.status(200).json({ success: false, message: 'Server error' });
            } else {
                if (rows.length > 0) {
                    // Username already exists
                    res.status(200).json({ success: false, message: 'same username' });
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
                                // create table contain user buy order and sell order detail
                                db.query(
                                    "CREATE TABLE IF NOT EXISTS " + username + " (TradeID INT NOT NULL AUTO_INCREMENT PRIMARY KEY, Price INT NOT NULL, Amount INT NOT NULL, Total INT NOT NULL, TradeType VARCHAR(255), TradeDate VARCHAR(255), TradeTime VARCHAR(255))"
                                ), [username] , (err, result) => { console.log(err) };
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
    // valid login ?
    db.query(
        "SELECT * FROM Authentication WHERE username = ? AND userpassword = ?", 
        [username, userpassword],
        (err, rows ) => {
            if (rows.length == 0) {
                res.status(200).json({ message: 'false'})
            }else {
                res.status(200).json({success: true, message: 'true' }); 
            }
        }
    )
})

app.post('/api/data/remove', (reg, res) => {
 
    const index = reg.body.index
    const username = reg.body.username
    // remove the order from the data base ?
    db.query(
        "DELETE FROM ?? WHERE TradeID = ?",[username, index],
         (err, result) => {
            if(err){
                console.log(err)
                res.send('err')
            } else {
                console.log('ok')
            }
        }
    )
})

app.post('/api/usertrade/data', (reg, res) => {
    // const username = reg.body.username
    const username = reg.body.username;
    // get the trade data 
    db.query(
        "SELECT * FROM ?? ",[username], (err, result) => {
          res.send(result)
        }
    )

})

app.post('/api/usertrade', (reg, res) => {

    const Price = reg.body.Price;
    const username = reg.body.username;
    const Amount = reg.body.Amount;
    const tradeType = reg.body.tradeType;
    const total = Price * Amount;
    const tradeDate = new Date().toLocaleDateString('en-GB');
    const tradeTime = new Date().toLocaleTimeString();

    if( Price != null && Amount != null) {
        // record the order that the user place if completeted ?
        db.query(
            "INSERT INTO ?? (Price, Amount, Total, TradeType, TradeDate, TradeTime) VALUES (?,?,?,?,?,?)",
            [username, Price, Amount, total, tradeType, tradeDate, tradeTime],
            (err) => {
                if (err) {
                    res.status(200).json({success: false, message: 'false'})
                }else {
                    res.status(200).json({ success: true, message: 'true' })
                }
            }
        )
    } 
})


app.get('/api/get/assestlist', (reg, res) => {
    db.query(
        "SELECT * FROM assest_list",
        (err, result) => {
            if (err) {
                res.status(200).json({success: false, message: 'false'})
            }else {
                res.send(result)
            }
        }
    ) 


})


app.listen(3002, () => {
    console.log("server is running")

    db.query(
        "CREATE TABLE IF NOT EXISTS Authentication (UserId INT NOT NULL AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) NOT NULL, userpassword VARCHAR(255) NOT NULL )"
    ),(err, result) => {
        if (err){
            console.log(err);
        }else{
            console.log(result)
        }
    }

    db.query(
        "CREATE DATABASE IF NOT EXISTS inno;"
    ), (err, result) => {
        if (err){
            console.log(err);
        }else {
            console.log(result)
        }
    }

    db.query(
        "CREATE TABLE IF NOT EXISTS assest_list(Assest_ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY, assest_name VARCHAR(255) NOT NULL, assest_price DOUBLE NOT NULL, assest_change VARCHAR(255) NOT NULL, assest_change_values VARCHAR(255) NOT NULL )"
    ), (err, result) => {
        if (err){
            console.log(err);
        }else {
            console.log(result)
        }
    }



})
    


