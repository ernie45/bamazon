/** Require dependencies */
var mysql = require("mysql");
var inquirer = require("inquirer");

var choice;

/** Create connection to the database */
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "bamazon1"
});
/** Upon connecting to the database */
connection.connect(function(error){
	if (error) throw error;
	/** Prompt the user a message */
	inquirer.prompt([
		{
			/** Name of the prompt */
			name: "option",
			/** The type is a list to choose from */
			type: "list",
			/** Instructions to the user */
			message: "Choose an Action",
			/** Choices to choose from */
			choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
		}
	]).then(function(options){
		/** Toggle between options from the prompt named option */
		switch (options.option){
			case "View Products for Sale": viewForSale();
			break;
			case "View Low Inventory": viewLowInventory();
			break;
			case "Add to Inventory": addToInventory();
			break;
			case "Add New Product": addNewProduct();
		}
	});
});
function viewForSale(){
	/** Select all the database entries */
	connection.query("SELECT * FROM products", function(error, results){
		if (error) throw error;
		/** Display all the entries */
		console.log(results);
	});
};
function viewLowInventory(){
	/** Select from all the entries */
	connection.query("SELECT * FROM products", function(error, results){
		if (error) throw error;
		/** Filter the products with a stock quantity less than 10 and display them */
		console.log(results.filter(product => {return product.stock_quantity <= 10})
							.map(product => {return product}));
	});
};
function addToInventory(){
	/** Prompt the user a message */
	inquirer.prompt([
		{
			/** The name of this prompt */
			name: "product",
			/** The user may input info */
			type: "input",
			/** Message to the user */
			message: "What Product Would You Like to Update?"
		},
		{
			/** Name of second message */
			name: "quantity",
			/** Also accepts input */
			type: "input",
			/** Message for the user */
			message: "How Much of the Product Would You Like to Add to Inventory?"
		}
	]).then(function(update){
		var quant;
		/** Access all elements in database */
		connection.query("SELECT * FROM products", function(error, results){
			if (error) throw error;
			/** Traverse the results */
			for (var i = 0; i < results.length; i++){
				/** If the user's input matches an item in inventory */
				if (update.product === results[i].product_name){
					/** Add the quantity being added to the current quantity in the inventory */
					quant = parseInt(results[i].stock_quantity) + parseInt(update.quantity);
					/** Update the stock quantity where the name is the item to update */
					connection.query("UPDATE products SET ? WHERE ?",
					[
						{
							stock_quantity: quant
						},
						{
							product_name: results[i].product_name
						}
					], 
					function (e, r){
						console.log("Successfully Updated Quantity");
					});
				}
			}
		});
	});
};
function addNewProduct(){
	/** Prompt user a message */
	inquirer.prompt([
					{
						/** Name of this prompt */
						name: "product",
						/** Takes in input from user */
						type: "input",
						/** Instructions */
						message: "input product_name"
					},
					{
						/** Name of this prompt */
						name: "department",
						/** Takes input from user */
						type: "input",
						/** Instructions */
						message: "input department_name"
					},
					{
						/** Name of this prompt */
						name: "price",
						/** Takes input from user */
						type: "input",
						/** Instructions */
						message: "input price"
					},
					{
						/** Name of prompt */
						name: "quantity",
						/** Takes input from user */
						type: "input",
						/** Instructions */
						message: "input stock_quantity"
					}
				]).then(function(resp){
					/** Insert new inventory into the database */
					connection.query("INSERT INTO products SET ?",
						{
							product_name: resp.product,
							department_name: resp.department, 
							price: resp.price, 
							stock_quantity: resp.quantity
						}, 
						function(error, results){
							if (error) throw error;
							console.log("Successfully Added New Product to Inventory!");
						});
				});
};