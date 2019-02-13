var BAMAZON = require("./BAMAZON2.js");
var Table = require("cli-table3");
var inquirer = require("inquirer");
//const chalkPipe = require('chalk-pipe');

function callMe(err, res) {
  if (err) throw err;
  return res
}

function Log(x) {
  console.log(x)
}

function View() {
  let clockIn = new BAMAZON;
  let aQuery = "SELECT * FROM products";
  let req = "Now Building List";
  clockIn.readMe(aQuery, req, function (err, res) {
    if (err) throw err;
    let products = new Table({ head: ["ID#", "Product", "Price", "Department", "Quantity", "Sales"], style: { header: [] }, wordWrap: true });
    for (tab = 0; tab < res.length; tab++) {
      products.push([res[tab].item_id, res[tab].product_name, res[tab].price, res[tab].department_name, res[tab].stock_quantity, ((res[tab].product_sales * res[tab].price).toFixed(2))])
    }
    Log(products.toString());
    let tailer = new Table({ head: ["Return to Main Menu? [Default: Yes, No = Exit]"], style: { header: [] } });
    inquirer
      .prompt([
        {
          type: "confirm",
          name: "listend",
          message: ("\n" + tailer.toString() + "\n"),
          default: true,
        }
      ])
      .then(answers => {
        if (answers.listend) {
          start()
        }
        clockIn.END(callMe);
      });
  });
};

function Low() {
  var clockIn = new BAMAZON;
  var aQuery = "SELECT * FROM products WHERE stock_quantity < 5";
  var req = "Now Building List";
  clockIn.readMe(aQuery, req, function (err, res) {
    if (err) throw err;
    
    let products = new Table({ head: ["ID#", "Product", "Price", "Department", "Quantity", "Sales"], style: { header: [] }, wordWrap: true });
    for (tab = 0; tab < res.length; tab++) {
      products.push([res[tab].item_id, res[tab].product_name, res[tab].price, res[tab].department_name, res[tab].stock_quantity, ((res[tab].product_sales * res[tab].price).toFixed(2))])
    }
    Log(products.toString());
    let tailer = new Table({ head: ["Return to Main Menu? [Default: Yes, No = Exit]"], style: { header: [] }});
    inquirer
      .prompt([
        {
          type: "confirm",
          name: "listend",
          message: ("\n" + tailer.toString() + "\n"),
          default: true,
        }
      ])
      .then(answers => {
        if (answers.listend) {
          start()
        }
        clockIn.END(callMe);
      });
  });
};

start = function () {
  let table = new Table({ head: [{ hAlign: 'center', colSpan: 2, content: "WELCOME TO BAMAZON!" }], style: { header: [] }, colWidths: [3, 25], wordWrap: true });

  table.push(
    [{ colSpan: 2, content: ("Select from the options below.") }],
    { V: "View Product List" },
    { L: "View Low Inventory" },
    { A: "Add to Inventory" },
    { N: "Add New Product" },
    { X: "eXit" }
  );

  inquirer
    .prompt([
      {
        type: "list",
        name: "selection",
        message: ("\n" + table.toString() + "\n"),
        choices: ["V", "L", "A", "N", "X"],
        //  choices:[
        //   {
        //     key: "v",
        //     name: "View Product List",
        //     value: "V"
        //   },
        //   {
        //     key: "l",
        //     name: "View Low Inventory",
        //     value: "L"
        //   },
        //   {
        //     key: "a",
        //     name: "Add to Inventory",
        //     value: "A"
        //   },
        //   {
        //     key: "n",
        //     name: "Add New Product",
        //     value: "N"
        //   }
        // ]
      }
    ])
    .then(answers => {
      switch (answers.selection) {
        case "V":
          View();
          break;
        case "L":
          Low();
          break;
        case "A":
          Add();
          break;
        case "N":
          New();
          break;
        default:
          Log("Goodbye, and Happy Sales!");
      }
    });
};
start()