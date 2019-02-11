# bamazon
Week12_Node.js_MySQL


## Overview

This app called bamazon is like a storefront and uses MySQL.  The app takes in orders from customers and deplete stock from the store's inventory.  Also, this app allows the manager and/or supervisor to track product sales across your store's departments and then provide a summary of the highest-grossing departments in the store.   
Here is a link to the video of the app in two parts that demonstrate what the app does:
    Part one:  https://drive.google.com/file/d/1PneqhDaHCzoESySXs3lYjOeOSO_-gA3m/view?usp=sharing
    Part two:  https://drive.google.com/file/d/1cu2dNa5gjEfSz6aZhD5HNmEZRHywsrti/view?usp=sharing
    
### As a Customer below is the description of what the app allows:

The app should then prompt users with two messages.

* The first should ask them the ID of the product they would like to buy.
* The second message should ask how many units of the product they would like to buy.

Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

* If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

However, if your store _does_ have enough of the product, you should fulfill the customer's order.
* This means updating the SQL database to reflect the remaining quantity.
* Once the update goes through, show the customer the total cost of their purchase.

- - -

### As a Manager below is the descriptions what the app allows:

The manager can select the following choices below from the menu.

*  `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

* `View Low Inventory`, then it should list all items with an inventory count lower than five.

*  `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

*  `Add New Product`, it should allow the manager to add a completely new product to the store.

- - -

### As a Supervisor below is the descriptions what the app allows:

The supervisor can select the following choices below from the menu.

* 'View Product Sales by Department', the app should list products sale by departments.

* 'Create New Department', the should allow the supervisor to add a new department.

If selected  `View Product Sales by Department`, the app should display a summarized table in their terminal/bash window. 

The `total_profit` column should be calculated and displayed in the table in the terminal/bash window.

