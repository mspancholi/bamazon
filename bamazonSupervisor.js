var mysql = require("mysql");
var inquirer = require("inquirer");
const {Table} = require('console-table-printer');

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
            choices: ["View Product Sales by Department", "Create New Department"]
        }
    ]).then(function (userChoice) {
        if (userChoice.Menu == "View Product Sales by Department") {
            displayProductSalesbyDept();

        }
        else if (userChoice.Menu == "Create New Department") {
            newDepartment();
        }

    })
}

function displayProductSalesbyDept() {
    var query = connection.query("SELECT T1.department_name, department_id, over_head_costs, SUM(product_sales) total FROM departments AS T1 INNER JOIN products AS T2 ON T1.department_name = T2.department_name GROUP BY department_name, department_id, over_head_costs", 
    function (err, res) {
        //console.log("SQL: " + query.sql);
        if (err) throw err;

        var profit = 0.0;
        const p = new Table();
        for (var i = 0; i < res.length; i++) {
            profit = res[i].total - res[i].over_head_costs;
            p.addRow({ department_id: res[i].department_id, department_name: res[i].department_name, over_head_cost: res[i].over_head_costs, product_sales: res[i].total, total_profits: profit});
        }
        p.printTable();

        //console.log(res);
        //console.log("-------------------------");
        /*for (var i = 0; i < res.length; i++) {
            console.log("Item " + i + " ID: " + res[i].item_id);
            console.log("Name:  " + res[i].product_name);
            console.log("Price: $" + res[i].price.toFixed(2));
            console.log("Quantity: " + res[i].stock_quantity);
            console.log("Product Sales: " + res[i].product_sales.toFixed(2));
            console.log("-------------------------");
        }*/

        connection.end();
    });
}


function newDepartment() {
    inquirer.prompt([

        {
            type: "input",
            name: "newDepartment",
            message: "Enter New Department"
        },
        {
            type: "input",
            name: "overhead",
            message: "Enter Overhead Costs"
        }
    ]).then(function (userChoice) {
        insertNewDepartment(userChoice);
    });
}

function insertNewDepartment(userChoice) {
    console.log("Inserting a new department...\n");
    var query = connection.query(
        "INSERT INTO departments SET ?",
        {
            department_name: userChoice.newDepartment,
            over_head_costs: parseFloat(userChoice.overhead)
        },
        function (err, res) {
            if (err) throw err;

            console.log(res.affectedRows + " department inserted!\n");
            connection.end();
        }

    );

}