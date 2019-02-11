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
  displayInventory();
});

function displayInventory() {
  console.log("displayInventory");
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    //console.log(res);
    for (var i = 0; i < res.length; i++) {
      console.log("item_id: " + res[i].item_id);
      console.log("product_name: " + res[i].product_name);
      console.log("price: " + res[i].price.toFixed(2));
      console.log("-----------------------------");
    }
    promptQuestion();
  });
};

function promptQuestion() {
  inquirer.prompt([
    {
      type: "input",
      name: "id",
      message: "What is the id of the product?"
    },
    {
      type: "input",
      name: "units",
      message: "How many units of the product would you like to buy?"
    }
  ]).then(function (userAnswer) {
    findItemID(userAnswer);

  });


}

function findItemID(userAnswer) {
  connection.query("SELECT * FROM products WHERE item_id = ?", parseInt(userAnswer.id), function (err, res) {
    if (err) throw err;

    if (userAnswer.units > res[0].stock_quantity) {
      console.log("Insufficient quantity!");
      connection.end();

    }
    else {
      updateInventory(userAnswer, res[0]);
    }



  });
}

function updateInventory(userAnswer, res) {
  var quantity = res.stock_quantity - parseInt(userAnswer.units);
  var productSales = res.product_sales + (parseInt(userAnswer.units) * res.price);
  console.log("quantity = " + quantity);
  console.log("id: " + userAnswer.id + " units: " + userAnswer.units);
  console.log("stock_quantity: " + res.stock_quantity + " price: " + res.price);
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: quantity,
        product_sales: productSales
      },
      {
        item_id: userAnswer.id
      }
    ],

    function (err, resUpdate) {
      if (err) throw err
      
      //console.log("Total Cost: $" + productSales.toFixed(2));

      connection.end();

    }
  )
}

