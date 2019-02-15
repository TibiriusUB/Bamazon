# Bamazon

### Unit 13: Node & MySQL
---

This project uses the MySQL module through Node.js to create a mock consumer portal which will _create_ , _read_ , _update_ , and _delete_ dtatbase records, where needed. Data handling is enhanced with the __CLI-TABLE-3__ module for quick table creation, and a smooth visual in a Command-Line setting. Sensitive data is beening secured with a __.ENV__ and is __*Required*__ for this appplication, (.i.e host, port, user, password and, database, information)  finally the __Inquirer__ module takes care of simple user interface.
Run the _BAMAZON_DB.sql_ script for schema, and records. this can be found in the _Database_construct_ folder. (plain csv files are included, but not needed to run)

 - #### bamazon_customer.js 
The customer portal generates a table containg basic product information, prompts the user for item purchases, and quantity, then generates a purchase total. The portal updates the stock in the database to reflect purchases.

- #### bamazon_manager.js
The manager portal allows the (management) user to view full details about products offered, get alerted to low inventory status, order more stock, and even add whole new products! 

- #### bamazon_supervisor.js
The supervisor portal connects to a different database, "departments", and can show a supervisor view of sales, including linking information from the inital "products" database to show sales statistics. The supervisor can also create whole new departments, which can then be accessed as an option, for new prodcut genereation in the manager portal!