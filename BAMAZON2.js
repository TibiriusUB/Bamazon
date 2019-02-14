var mysql = require("mysql");
require('dotenv').config();

function Log(x){
    console.log(x)
};

var BAMAZON = function () {

    this.connection = mysql.createConnection({
        host: process.env.DB_host,
        port: process.env.DB_port,
        user: process.env.DB_user,
        password: process.env.DB_password,
        database: process.env.DB_database
    });

    this.createMe = function (aQuery, req, callback)  {
        var query = this.connection.query(aQuery, function (err, res) {
            if (err) return callback(err)
            callback(null, res)
        });
    };
    this.readMe = function (aQuery, req, callback) {
        Log(req)
        var query = this.connection.query(aQuery, function (err, res) {
            if (err) return callback(err);
            callback(null, res)
        })

    };
    this.updateMe = function (aQuery, req, callback) {
        Log(req)
        var query = this.connection.query(aQuery, function (err, res) {
            if (err) return callback(err);
            callback(null, res);
        })
    };
    this.deleteMe = function (aQuery, req, callback) {
        var query = this.connection.query(aQuery, function (err, res) {
           callback(null, prodsale)
        })
    }
    this.END = function (callback) {
        this.connection.end()
    };
};
module.exports = BAMAZON;
