var BAMAZON = require("./BAMAZON.js");
//var Tablesetteing = require("./Tablesetting.js")
var Table = require("cli-table3");
var inquirer = require("inquirer");
var cycle = "0"
var prodcount = 72

//starts the program, prepares the product list, and sends back the listing amount
function start(callback) {
  console.log("Welcome to BAMAZON!\nWe are pleased to present our product listing!\n")
  let runtime = new BAMAZON;
  runtime.read("SELECT * FROM products", "Now Building List", function (err, res) {
    if (err) return callback("Somthing went wrong!");
    callback(null, res)
    runtime.END()
  })
};

function shop(prodcount, callback) {
  function rangeCheck(val){
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
  
  inquirer.prompt(questions).then(answers => {
    console.log(answers.purchase_id+" "+ answers.purchase_quan)
    var purchase = new BAMAZON
    purchase.shop(answers.purchase_id, answers.purchase_quan,function(err,res){if (err) throw err})

  });
};
// var newclient = new BAMAZON
// var testr2 = "locating"
// var testq2 = "SELECT * FROM products WHERE item_id = 5"
// var testr = "searching"
// var testq = "SELECT * FROM products"
// newclient.read(testq,testr)
// var newclient2 = new BAMAZON
// newclient2.read(testq2,testr2)
// this.read = function (aQuery,req) { "Active qUERY", and "REQuest" } should be all I need for now!
// type: (String) Type of the prompt. Defaults: input - Possible values: input, confirm, list, rawlist, expand, checkbox, password, editor


start(function (err, res) {
  if (err) return err;
  var table = new Table({ head: ["ID#", "Product", "Price"], colWidths: [10, 20] });
  for (tab = 0; tab < res.length; tab++) {
    table.push([res[tab].item_id, res[tab].product_name, res[tab].price])
  };
  console.log(table.toString());
  
  shop(res.length, function (err, res2) {
    if (err) return err;
    
  });
});