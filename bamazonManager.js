var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,

    user: "root",

    password: "root",
    database: "bamazon_db"
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    Menu();

});

function Menu() {
    inquirer.prompt([
        {
            type: "list",
            name: "Menu",
            message: "Please make your selection",
            choices: ["View Products for Sale", "View Low Inventory", "Add To Inventory", "Add to New Product"]
        }
    ]).then(function (userChoice) {
        if (userChoice.Menu == "View Products for Sale") {
            displayInventory();

        }
        else if (userChoice.Menu == "View Low Inventory") {
            lowInventory();
        }
        else if (userChoice.Menu == "Add To Inventory") {
            addInventory();
        }
        else if (userChoice.Menu == "Add to New Product") {
            newInventory();
        }
        else {
            console.log("This choice doesn't exist")
        }
    })
}

function displayInventory() {
    console.log("displayInventory");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        //console.log(res);
        for (var i = 0; i < res.length; i++) {
            console.log("item_id: " + res[i].item_id);
            console.log("product_name: " + res[i].product_name);
            console.log("price: " + res[i].price.toFixed(2));
            console.log("stock_quantity: " + res[i].stock_quantity);
            console.log("-----------------------------");
        }
        connection.end();
    });
};

function lowInventory() {
    console.log("lowInventory");
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
        if (err) throw err;
        //console.log(res);
        for (var i = 0; i < res.length; i++) {
            console.log("item_id: " + res[i].item_id);
            console.log("product_name: " + res[i].product_name);
            console.log("price: " + res[i].price.toFixed(2));
            console.log("stock_quantity: " + res[i].stock_quantity);
            console.log("-----------------------------");
        }
        connection.end();

    });
}

function addInventory() {
    inquirer.prompt([

        {
            type: "input",
            name: "id",
            message: "Enter Item Id"
        },
        {
            type: "input",
            name: "quantity",
            message: "Enter Quantity"
        },

    ]).then(function (userChoice) {
        updateQuantity(userChoice);
    });

};


function updateQuantity(userChoice) {
    connection.query("SELECT * FROM products WHERE item_id = ?", parseInt(userChoice.id), function (err, res) {
        if (err) throw err;
        var newQuantity = res[0].stock_quantity + parseInt(userChoice.quantity);
        var query = connection.query(
            "UPDATE products SET ? WHERE ?",
            [
                {
                    stock_quantity: newQuantity
                },
                {
                    item_id: userChoice.id
                }
            ],

            function (err1, resUpdate) {
                if (err1) throw err1
                console.log("updated item id " + userChoice.id + " with new quantity " + newQuantity);
                connection.end();

            }
        );
    });
}

function newInventory() {
    inquirer.prompt([

        {
            type: "input",
            name: "product",
            message: "Enter Product Name"
        },

        {
            type: "input",
            name: "department",
            message: "Enter Department"
        },

        {
            type: "input",
            name: "price",
            message: "Enter Price"
        },

        {
            type: "input",
            name: "quantity",
            message: "Enter Quantity"
        },
    ]).then(function (userChoice) {
        insertNewProduct(userChoice);
    });

    

};

function insertNewProduct(userChoice){
        console.log("Inserting a new product...\n");
        var query = connection.query(
          "INSERT INTO products SET ?",
          {
            product_name: userChoice.product,
            department_name: userChoice.department,
            price: parseFloat(userChoice.price),
            stock_quantity: parseInt(userChoice.quantity),
          },
          function(err, res) {
            console.log(res.affectedRows + " product inserted!\n");
            connection.end();
          }

        );

}

