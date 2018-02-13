/** Require dependencies */
var mysql = require("mysql");
var inquirer = require("inquirer");

/** Declare variables */
var id;
var quantity;
var total = 0.0;
var insufficientQuantity = false;

/** Create a connection to the database */
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "bamazon1"
});
/** Upon proper connection */
connection.connect(function (error) {
	if (error) throw error;
	/** Dig into database and access everything in the products table */
	connection.query("SELECT * FROM products", function (error, results) {
		if (error) throw error;
		/** Display the contents in the database */
		console.log(results);
		askUserForID(results);
	});
});
function askUserForID(results) {
	/** Prompt the user a message */
	inquirer.prompt([
		{
			/** The name of this message */
			name: "itemIdentification",
			/** The message to display to the user */
			message: "Choose the I.D. of the item you would like to choose",
			/** Takes in input */
			type: "input"
		},
		{
			/** Name of this message */
			name: "itemQuantity",
			/** The message to display to the user */
			message: "Enter amount of items you would like to purchase",
			/** Takes in an input */
			type: "input"
		}
	]).then(function (customer) {
		/** Refer to the itemIdentification input */
		id = customer.itemIdentification;
		/** Refer to the itemQuantity input */
		quantity = customer.itemQuantity;
		/** Display the item id and the quantity available of that product */
		console.log(`id: ${id} quantity: ${quantity}`);
		checkQuantity(results, customer.itemQuantity);
	});
};
/** Takes in results and number */
function checkQuantity(results, no) {
	/** Traverse the length of the results */
	for (var i = 0; i < results.length; i++) {
		/** If the itemId in the results matches the id of what the item customer wants */
		if (parseInt(results[i].item_id) === parseInt(id)) {
			/** And if there are still items in stock */
			/** Making sure that the amount the user wants is less than or equal to the available stock */
			if (results[i].stock_quantity > 0 && (results[i].stock_quantity - quantity) >= 0) {
				/** Display that there are enough items for that purchase */
				console.log("We have plenty");
				/** Subtract the user's desired quantity from the stock quantity */
				var quant = results[i].stock_quantity - quantity;
				/** Calculate the total price for the purchase */
				/** By mulitiplying unit price of item by the number of items being purchased */
				total += parseFloat(results[i].price) * parseFloat(no);
				/** Update the stock quantity */
				/** Setting the new stock_quantity where the product name matches */
				connection.query("UPDATE products SET ? WHERE ?",
					[
						{
							stock_quantity: quant
						},
						{
							product_name: results[i].product_name
						}
					], function (error, res) {
						displayTotal();
					}
				);
			}
			/** If not enough items in inventory */
			else {
				insufficientQuantity = true;
				console.log("Insufficient Quantity! \n Please try another quantity");
				process.exit(1);
			}
		}
	}
};
function displayTotal() {
	console.log("Your total price: " + total);
};