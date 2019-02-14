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
    let products = new Table({ head: ["ID#", "Product", "Price", "Department", "Quantity"], style: { header: [] }, wordWrap: true });
    products.push([{ colSpan: 5, hAlign: "center", content: ("LOW QUANTITY ALERTS!") }])
    for (tab = 0; tab < res.length; tab++) {
      products.push([res[tab].item_id, res[tab].product_name, res[tab].price, res[tab].department_name, res[tab].stock_quantity])
    };
    let noducts = new Table({ head: ["No quantity alerts at this time!"], style: { header: [] }, wordWrap: true });
    if (res.length > 0) {
      Log(products.toString());
    } else {
      Log(noducts.toString());
    }
    let tailer = new Table({ style: { header: [] } });
    tailer.push(
      [{ colSpan: 2, content: ("Select from the options below.") }],
      { R: "Return to Main Menu" },
      { A: "Add to Inventory" },
      { X: "eXit" }
    );
    inquirer
      .prompt([
        {
          type: "list",
          name: "selection",
          message: ("\n" + tailer.toString() + "\n"),
          choices: ["R", "A", "X"],
          default: ["R"],
        }
      ])
      .then(answers => {
        if (answers.selection === "R") {
          start()
        } else if (answers.selection === "A") {
          Add()
        }
        clockIn.END(callMe);
      });
  });
};

function Add() {
  var clockIn = new BAMAZON;
  var aQuery = "SELECT * FROM products ORDER BY stock_quantity";
  var req = "Now Building List";
  clockIn.readMe(aQuery, req, function (err, res) {
    if (err) throw err;
    let products = new Table({ head: ["ID#", "Product", "Price", "Department", "Quantity"], style: { header: [] }, wordWrap: true });
    products.push([{ colSpan: 5, hAlign: "center", content: ("STOCK QUANTITY ORDERED BY LOWEST VALUES") }])
    for (tab = 0; tab < res.length; tab++) {
      products.push([res[tab].item_id, res[tab].product_name, res[tab].price, res[tab].department_name, res[tab].stock_quantity])
    };
    Log(products.toString());
    let tailer = new Table({ style: { header: [] } });
    tailer.push(
      [{ colSpan: 2, content: ("Select from the options below.") }],
      { R: "Return to Main Menu" },
      { A: "Add Stock" },
      { X: "eXit" }
    );
    inquirer
      .prompt([
        {
          type: "list",
          name: "selection",
          message: ("\n" + tailer.toString() + "\n"),
          choices: ["R", "A", "X"],
          default: ["R"],
        }
      ])
      .then(answers => {
        if (answers.selection === "R") {
          start()
        } else if (answers.selection === "A") {
          inquirer
            .prompt([
              {
                name: "modifying",
                message: ("What Item? [Choose by ID#, or Default:[0] cancels]"),
                default: [0],
                validate: function (value) {
                  var valid = !isNaN(parseInt(value));
                  if (valid > res.length);
                  return valid || 'Please enter a number';
                },
              }
            ]).then(itemMod => {
              if (itemMod.modifying === 0) {
                Add()
              }
              inquirer
                .prompt([
                  {
                    name: "amount",
                    message: ("Order how much?"),
                    default: [0],
                    validate: function (value) {
                      var valid = !isNaN(parseInt(value));
                      return valid || 'Please enter a number';
                    },
                  }
                ])
                .then(modAmount => {
                  let quan = (res[itemMod.modifying].stock_quantity+modAmount.amount)
                  Log(quan)
                  aQuery = "UPDATE products SET stock_quantity = " + quan + " WHERE item_id = " + itemMod.modifying + ";";
                  req = "Now Updating Inventory"
                  clockIn.updateMe(aQuery, req, function (err, res) {
                    if (err) throw err;
                    Add()
                  })
                })
            })
        }else{
        clockIn.END(callMe);
        };
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