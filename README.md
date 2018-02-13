# Bamazon
Amazon-like website with a database that stores inventory for customers to search and buy

## Customer

A customer should be able to view our inventory,
Choose an item from the inventory and how many of that item, 
and then know the total price of the purchase.
If the stock is doesn't have enough items,
the customer will be told that there aren't enough items.

All the *inventory* is stored within a **MySQL** database
the table of products includes *product_name, department_name, price, stock_quantity*
along with each of their corresponding *item_id*.