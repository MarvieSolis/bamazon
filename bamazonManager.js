var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bamazon"
});

var userInput = function () {
    inquirer.prompt([
        {
            type: "list",
            message: "Manager Options:",
            name: "action",
            choices: ["View products for sale", "View low inventory items", "Add more inventory", "Add new product"]
        },

    ]).then(function (inquirerResponse) {
        if (inquirerResponse.action === "View products for sale") {
            saleItems();
        }
        else if (inquirerResponse.action === "View low inventory items") {
            lowInventory();
        }
        else if (inquirerResponse.action === "Add more inventory") {
            addInventory();
        }
        else if (inquirerResponse.action === "Add new product") {
            addProduct();
        }
    });
}

var saleItems = function () {
    connection.query("SELECT * FROM products", function (err, res, fields) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            console.log("\n\n-----------------------------\n" + "Item ID: " + res[i].item_id + "\nProduct: " + res[i].product_name + "\nDepartment: " + res[i].department_name + "\nPrice: " + res[i].price + "\nIn Stock: " + res[i].stock_quantity + "\n-----------------------------\n\n");
        }
    });
    connection.end();
}

var lowInventory = function () {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res, fields) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            console.log("\n\n-----------------------------\n" + "Item ID: " + res[i].item_id + "\nProduct: " + res[i].product_name + "\nDepartment: " + res[i].department_name + "\nPrice: " + res[i].price + "\nIn Stock: " + res[i].stock_quantity + "\n-----------------------------\n\n");
        }
    });
    connection.end();
}

var addInventory = function () {
    inquirer.prompt([
        {
            type: "input",
            message: "Select an item you would like to add more of (Enter item ID)",
            name: "itemID",
        },
        {
            type: "input",
            message: "How many would you like to add?",
            name: "quantity",
        },

    ]).then(function (inquirerResponse) {

        connection.query("SELECT * FROM products", function (err, res, fields) {
            if (err) throw err;

            var newQuantity = parseInt(res[inquirerResponse.itemID - 1].stock_quantity) + parseInt(inquirerResponse.quantity);

            var item = res[inquirerResponse.itemID - 1].item_id;


            if (inquirerResponse.quantity < 0) {
                console.log("Invalid Entry");
                userInput();
            }
            else {
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: newQuantity
                        },
                        {
                            item_id: item
                        }
                    ],
                    function () {
                        console.log('\nIn Store stock has been updated!\n');
                    }
                );
                connection.end();

            }

        });
    });
}

var addProduct = function () {

    inquirer.prompt([
        {
            type: "input",
            message: "Enter product name",
            name: "product",
        },
        {
            type: "input",
            message: "Enter department name",
            name: "department",
        },
        {
            type: "input",
            message: "Enter the initial amount in stock",
            name: "amount",
        },
        {
            type: "input",
            message: "Enter price of item",
            name: "productPrice",
        },

    ]).then(function (inquirerResponse) {

        if (inquirerResponse) {
            connection.query(
                "INSERT INTO products SET ?",
                {
                    product_name: inquirerResponse.product,
                    department_name: inquirerResponse.department,
                    stock_quantity: inquirerResponse.amount,
                    price: inquirerResponse.productPrice
                },
                function (err, res) {
                    console.log(res.affectedRows + ' item inserted!\n\n');
                }
            );
            connection.end();
        }

    });
}

userInput();