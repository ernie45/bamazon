var mysql = require("mysql");
var inquirer = require("inquirer");
var choice;
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "bamazon1"
});
connection.connect(function(error){
	if (error) throw error;
	inquirer.prompt([
		{
			name: "option",
			type: "list",
			message: "Choose an Action",
			choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
		}
	]).then(function(options){
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
	connection.query("SELECT * FROM products", function(error, results){
		if (error) throw error;
		console.log(results);
	});
};
function viewLowInventory(){
	connection.query("SELECT * FROM products", function(error, results){
		if (error) throw error;
		for (var i = 0; i < results.length; i++){
			if (results[i].stock_quantity <= 10){
				console.log(results[i]);
			}
		}
	});
};
function addToInventory(){
	inquirer.prompt([
		{
			name: "product",
			type: "input",
			message: "What Product Would You Like to Update?"
		},
		{
			name: "quantity",
			type: "input",
			message: "How Much of the Product Would You Like to Add to Inventory?"
		}
	]).then(function(update){
		console.log("done");
		console.log(update.product + " " + update.quantity);
		var quant;
		connection.query("SELECT * FROM products", function(error, results){
			if (error) throw error;
			for (var i = 0; i < results.length; i++){
				if (update.product === results[i].product_name){
					quant = parseInt(results[i].stock_quantity) + parseInt(update.quantity);
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
	inquirer.prompt([
					{
						name: "product",
						type: "input",
						message: "input product_name"
					},
					{
						name: "department",
						type: "input",
						message: "input department_name"
					},
					{
						name: "price",
						type: "input",
						message: "input price"
					},
					{
						name: "quantity",
						type: "input",
						message: "input stock_quantity"
					}
				]).then(function(resp){
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