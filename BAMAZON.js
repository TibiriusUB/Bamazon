var mysql = require("mysql");
require('dotenv').config();

var BAMAZON = function () {

    this.connection = mysql.createConnection({
        host: process.env.DB_host,
        port: process.env.DB_port,
        user: process.env.DB_user,
        password: process.env.DB_password,
        database: process.env.DB_database
    });

    this.callme = function () {
        this.connection.connect(function (err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
        });
    };
    this.read = function (aQuery, req, callback) {
        //this.callme();
        console.log(req + "\n");
        var query = this.connection.query(aQuery, function (err, res) {
            if (err) return callback(err);
            callback(null, res)
        })

    };
    this.shop = function (id, quan, callback) {
        //this.callme();
        console.log(id + " take 2! " + quan)
        var query = this.connection.query("SELECT * FROM products WHERE item_id = " + id, function (err, res) {
            if (err) return callback(err);
            if (res[0].stock_quantity < quan) {
                return console.log("We are sorry, your order cannot be completed at this time.");
            };
            callback(null, (res[0].stock_quantity - quan));
        })
    };
    this.buy = function (id,prodsale) {
    // this.callme()
     var query = this.connection.query("UPDATE products SET stock_quantity = " + prodsale + " WHERE item_id = " + id, function (err, res) {
         console.log("Items Purchased!");
     }
     )
    }






this.END = function () {
    this.connection.end()
};
};
module.exports = BAMAZON;
// var testr = "Now Building List"
// var testq = "SELECT * FROM products"
// var test = new BAMAZON()

// var callback = function(x){
//     console.log(x)
// };

// function rightous(callback){ 
// test.read(testq, testr, function(err,res){
//     if (err) return callback("Somthing went wrong");
//     callback(null,res)
// })
// }

// rightous(function(err,res){
//  console.log(res);
// });

