var BAMAZON = require("./BAMAZON.js");
var Table = require("cli-table3");
var inquirer = require("inquirer");


//starts the program, prepares the product list, and sends back the listing amount
function start(callback) {
  console.log("Welcome to BAMAZON!\nWe are pleased to present our product listing!\n")
  let runtime = new BAMAZON;
  runtime.read("SELECT * FROM products", "Now Building List", function (err, res) {
    if (err) return callback("Somthing went wrong!");
    callback(null, res)
  })
};

//inquirer questions to get user input
function shop(prodcount, callback) {
  function rangeCheck(val) {
    if ((Number.isInteger(val)) && (val > 0) && (val <= prodcount)) {
      return true
    }
    return false
  };
  var questions = [
    {
      type: "input",
      name: "purchase_id",
      message: "What would you like to purchase today? [Enter ID Number]:",
      //validate: rangeCheck()
    },
    {
      type: "input",
      name: "purchase_quan",
      message: "How many would you like to purchase today? [Enter Quantity (Default: 1)]:",
      // validate: function (val) {
      //   if (Number.isInteger(val)) {
      //     return true
      //   };
      // },
      // default: function () {
      //   return 1
      //}
    }
  ];
//mire of callbacks, ugly but functional. researching ways to clean up the code.
  inquirer.prompt(questions).then(answers => {
    var purchase = new BAMAZON
    purchase.shop(answers.purchase_id, answers.purchase_quan, function (err, res) {
      if (err) throw err;
      purchase.buy(res, function (err, res) {
        if (err) throw err;
        var table = new Table({ head: ["ID#", "Product", "Quantity", "Final Price"], colWidths: [10, 20] });
        table.push([res[1][0].item_id, res[1][0].product_name, res[2], (res[2] * res[1][0].price)])
        console.log(table.toString());
        purchase.END(function(err,res){
          if (err) throw err;
          if (res) {
            inquirer.prompt([
              {
              type: "confirm",
              name: "again",
              message:"would you like to make another purchase?"
              }
            ]).then(redo => {
              if (redo.again){ startagain()}
              console.log("Thank you for shopping with us! :)");
             })
          }
        })
      })
    })

  });
};

//simple restart
function startagain(){
  start(function (err, res) {
    if (err) return err;
    var table = new Table({ head: ["ID#", "Product", "Price"], colWidths: [10, 20] });
    for (tab = 0; tab < res.length; tab++) {
      table.push([res[tab].item_id, res[tab].product_name, res[tab].price])
    };
    console.log(table.toString());
  
    shop(res.length, function (err, res2) {
      if (err) return err;
      console.log(res2)
  
    });
  });
}
//AANNNND WE'RE OFF!
start(function (err, res) {
  if (err) return err;
  var table = new Table({ head: ["ID#", "Product", "Price"], colWidths: [10, 20] });
  for (tab = 0; tab < res.length; tab++) {
    table.push([res[tab].item_id, res[tab].product_name, res[tab].price])
  };
  console.log(table.toString());
//jumps to a different set questions. Initially, this was part of a modular design, hence the BAMAZON.js file containing the MySQL code.
  shop(res.length, function (err, res2) {
    if (err) return err;
    console.log(res2)

  });
});