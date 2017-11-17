var mysql = require("mysql");
var inquirer = require("inquirer");
var id;
var quantity;
var total = 0.0;
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "bamazon1"
});
connection.connect(function(error){
	if (error) throw error;
	connection.query("SELECT * FROM products", function(error, results){
		if (error) throw error;
		console.log(results);
		askUserForID(results);
	});
});
function askUserForID(results){
	inquirer.prompt([
		{
			name: "itemIdentification",
			message: "Choose the I.D. of the item you would like to choose",
			type: "input"
		},
		{
			name: "itemQuantity",
			message: "Enter amount of items you would like to purchase",
			type: "input"
		}
	]).then(function(customer){
		id = customer.itemIdentification;
		quantity = customer.itemQuantity;
		console.log("id: " + id + " quantity: " + quantity);
		checkQuantity(results, customer.itemQuantity);
	});
};
function checkQuantity(results, no){
	for (var i = 0; i < results.length; i++){
			if (parseInt(results[i].item_id) === parseInt(id)){
				if (results[i].stock_quantity > 0 && (results[i].stock_quantity - quantity) >= 0){
					console.log("We have plenty");
					var quant = results[i].stock_quantity - quantity;
					total += parseFloat(results[i].price)*parseFloat(no);
					connection.query("UPDATE products SET ? WHERE ?",
						[
							{
								stock_quantity: quant
							},
							{
								product_name: results[i].product_name
							}
						], function(error, res){
							displayTotal();
						}		
					);
				}
				else{
					console.log("Insufficient Quantity!");
				}
			}
		}
};
function displayTotal(){
	console.log("Your total price: " + total);
};