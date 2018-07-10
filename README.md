# bamazon

## The Function of This Program
The applications 'bamazonCustomer.js' and 'bamazonManager.js' are ran through **Node**. They are dependent on information taken from 'bamazon.sql'. In order for the applications to function properly, a connection must be established between Node and **MySQL** first. Once a connection is established, 'bamazon.sql' will provide the data table for the two node applications.

### bamazonCustomer.js
'bamazonCustomer.js' utilizes the **inquirer package** and the **mysql package**. Its only two functions are to display the items listed for sale and to conduct a purchase.

#### Listing Sale Items
The "readList()" function loops through a query response that collects all the data from 'bamazon.sql', and displays the information on the terminal via console.logs. This information consists of item_id (which auto increments), product_name, department_name, stock_quantity, and price. 

#### Conducting a Purchase
The "userShopping()" function uses inquirer to ask the user what item they would like to purchase and how much of that item would they want to buy. The user enters the item's ID number then the quantity. The user's input is then used to navigate the response array to pinpoint the desired item. The quantity that the customer wants to buy is then subtracted from the stock_quantity value. If the outcome of that computation is a negative number, the user is alerted that there are not enough items in stock to satisfy their request. The "userShopping()" function then resets. If the item exists and the quantity desired is reasonable, the item's quantity will be updated from the database and the user will be alerted the price of their purchase.

### bamazonManager.js
'bamazonCustomer.js' utilizes the **inquirer package** and the **mysql package** as well. Its four functions are to display the items listed for sale, view low inventory items, add more to an items inventory, and add a new product.

#### Listing Sale Items
Similarly to the "readList()" function, the "saleItems()" function loops through a query response that collects all the data from 'bamazon.sql', and displays the information on the terminal via console.logs. This information consists of item_id (which auto increments), product_name, department_name, stock_quantity, and price. 

#### Listing Low Inventory Items
Again, just like the "readList()" and "saleItems", the "lowInventory()" function loops through a query response that collects all the data from 'bamazon.sql', and displays the information on the terminal via console.logs. The main difference however, is that the parameter of any item with a stock quantity of less that 5 is only displayed. This is done by adding '''WHERE stock_quantity < 5" to the query'''.

#### Adding to Inventory
Adding more stock to an existing item is done using inquirer and mysql. The application will ask what item would they like to add more of. The user will then enter the corresponding item_id. The user is then prompted to enter the amount they would like to add. Upon doing so, the information in the database should update.

#### Adding a New Product
Adding a new product utilizes an INSERT command in the query. The information is collected using inquirer where a prompt will ask the user to enter the product_name, department_name, stock_quantity, and price. After the user enters all that information, the item_id is automatically generated and the table is then updated.

### Demo videos
[bamazonCustomer.js](https://www.youtube.com/watch?v=xur6h4yzXMA)

[bamazonManager.js](https://www.youtube.com/watch?v=Gq91xLrHwtQ)


## The Usefulness
This program emphasizes on using information obtained from a database in MySQL, and being able to access and manipulate the information in Node applications.


## Getting started
People can learn more about using Node.js by looking through websites such as [Node JS](https://nodejs.org/en/). To learn more about inquirer, visit [this](https://www.npmjs.com/package/inquirer) link. Lastly, to learn more about MySQL, visit [this](https://www.mysql.com/) link.

