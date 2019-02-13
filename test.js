var mysql = require("mysql");
require('dotenv').config();
var Table = require("cli-table3");

var inquirer = require('inquirer');

console.log('Hi, welcome to Node Pizza');

var questions = [
  {
    type: 'confirm',
    name: 'toBeDelivered',
    message: 'Is this for delivery?',
    default: false
  },
  {
    type: 'input',
    name: 'phone',
    message: "What's your phone number?",
    validate: function(value) {
      var pass = value.match(
        /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
      );
      if (pass) {
        return true;
      }

      return 'Please enter a valid phone number';
    }
  },
  {
    type: 'list',
    name: 'size',
    message: 'What size do you need?',
    choices: ['Large', 'Medium', 'Small'],
    filter: function(val) {
      return val.toLowerCase();
    }
  },
  {
    type: 'input',
    name: 'quantity',
    message: 'How many do you need?',
    validate: function(value) {
      var valid = !isNaN(parseFloat(value));
      return valid || 'Please enter a number';
    },
    filter: Number
  },
  {
    type: 'expand',
    name: 'toppings',
    message: 'What about the toppings?',
    choices: [
      {
        key: 'p',
        name: 'Pepperoni and cheese',
        value: 'PepperoniCheese'
      },
      {
        key: 'a',
        name: 'All dressed',
        value: 'alldressed'
      },
      {
        key: 'w',
        name: 'Hawaiian',
        value: 'hawaiian'
      }
    ]
  },
  {
    type: 'rawlist',
    name: 'beverage',
    message: 'You also get a free 2L beverage',
    choices: ['Pepsi', '7up', 'Coke']
  },
  {
    type: 'input',
    name: 'comments',
    message: 'Any comments on your purchase experience?',
    default: 'Nope, all good!'
  },
  {
    type: 'list',
    name: 'prize',
    message: 'For leaving a comment, you get a freebie',
    choices: ['cake', 'fries'],
    when: function(answers) {
      return answers.comments !== 'Nope, all good!';
    }
  }
];

inquirer.prompt(questions).then(answers => {
  console.log('\nOrder receipt:');
  console.log(JSON.stringify(answers, null, '  '));
});

// connection = mysql.createConnection({
//     host: process.env.DB_host,
//     port: process.env.DB_port,
//     user: process.env.DB_user,
//     password: process.env.DB_password,
//     database: process.env.DB_database
// });
// var targ =""
// function callMe(cb){
//     function (x,y){
//         if (x) throw err;
//             console.log(res[0].item_id);
//             return res;
//     }
//     return res
//     // listen = function(err,res,){
//     //     if (err) throw err;
//     //     console.log(res[0].item_id);
//     //     return res;
//     // };
//     // listen(function (res){
//     //     return res
//     // })
    

//     //if (err) throw err;
//     //console.log(res[0].item_id);
    
// }

// function readMe  (aQuery, req, callback) {
//     console.log(req);
//     var query = connection.query(aQuery, function (err, res) {
//         if (err) return callback(err);
//         callback(null,res)
//     })

// };

// function test(x,y, z ) {
//    readMe(x,y,z);
  
// }
// x=""
// readMe ( "SELECT * FROM products", "Now Building List", callMe(function (x){
//     console.log(x);
// }) )

   



//   // expected output: 42
  
// // var table = new Table({ head: ["ID#", "Product", "Price"], colWidths: [10, 20] });
// //   for (tab = 0; tab < res.length; tab++) {
// //     table.push([res[tab].item_id, res[tab].product_name, res[tab].price])
// //   };
// //   console.log(table.toString());
// // function doHomework(subject, callback) {
// //     alert(`Starting my ${subject} homework.`);
// //     callback();
// //   }
// //   function alertFinished(){
// //     alert('Finished my homework');
// //   }
// //   doHomework('math', alertFinished);
