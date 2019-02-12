function doThis(x){
    (z= x + 2);
    return z
};
function read(x,y){
    console.log(y);
    return doThis(x);

}


var x= 3
var y = 4
console.log(read(x,y))


function test()

function callback(err, res) {}

start(function (err, res) {
  if (err) return err;
  var table = new Table({ head: ["ID#", "Product", "Price"], colWidths: [10, 20] });
  for (tab = 0; tab < res.length; tab++) {
    table.push([res[tab].item_id, res[tab].product_name, res[tab].price])
  };
  console.log(table.toString());
  shop(res.length);
});