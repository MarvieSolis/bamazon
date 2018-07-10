var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bamazon"
});



var readList = function () {
  connection.query("SELECT * FROM products", function (err, res, fields) {
    if (err) throw err;

    for (var i = 0; i < res.length; i++) {
      console.log("\n\n-----------------------------\n" + "Item ID: " + res[i].item_id + "\nProduct: " + res[i].product_name + "\nDepartment: " + res[i].department_name + "\nPrice: " + res[i].price + "\nIn Stock: " + res[i].stock_quantity + "\n-----------------------------\n");
    }
  });
}

var userShopping = function () {
  inquirer.prompt([
    {
      type: "input",
      message: "What item would you like to purchase? (Enter item ID)",
      name: "itemID",
    },
    {
      type: "input",
      message: "How many of the item would you want to purchase?",
      name: "itemQuantity",
    }

  ]).then(function (inquirerResponse) {

    connection.query("SELECT * FROM products", function (err, res, fields) {
      if (err) throw err;

      var difference = res[inquirerResponse.itemID - 1].stock_quantity - inquirerResponse.itemQuantity;

      var item = res[inquirerResponse.itemID - 1].item_id;

      var product = res[inquirerResponse.itemID - 1].product_name;

      var purchased = inquirerResponse.itemQuantity;

      var product_price = res[inquirerResponse.itemID - 1].price;

      var totalPrice = purchased * product_price;


      if (difference < 0) {
        console.log("Not enough items in stock to satisfy your request!");
        userShopping();
      }
      else if (res.length < inquirerResponse.itemID) {
        console.log("Invalid item ID");
        userShopping();
      }
      else {
        connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              stock_quantity: difference
            },
            {
              item_id: item
            }
          ],
          function () {
            console.log('\nIn Store stock has been updated!\n');
            console.log("You have purchased " + purchased + " " + product + "(s) for $" + totalPrice);
            

          }
        );
        connection.end();

      }

    });

  });
}


connection.connect(function (err) {
  if (err) throw err;

  readList();
  userShopping();

});