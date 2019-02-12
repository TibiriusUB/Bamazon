var Table = require("cli-table3");

 

// var table = new Table({
//     head: ['TH 1 label', 'TH 2 label']
//   , colWidths: [100, 200]
// });
 

// table.push(
//     ['First value', 'Second value']
//   , ['First value', 'Second value']
// );
 
// console.log(table.toString());

var table = new Table({ head: ["ID#", "Product", "Price"], colWidths: [10, 20] });
for (tab = 0; tab < res.length; tab++) {
    table.push([res[tab].item_id, res[tab].product_name, res[tab].price])
};
console.log(table.toString());

module.exports = Tablesetting;