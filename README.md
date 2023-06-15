# Bank Account Management in Node

This repository contains a bank account management system developed in Node.js. The code offers features to create, view, update and delete bank accounts, in addition to performing operations such as deposits and withdrawals.

The application is built using object-oriented programming concepts and follows a modular and scalable architecture, allowing easy extensibility and maintenance. The code implements good security practices to ensure the integrity and confidentiality of banking data.

Repository Features:

* Creation of bank accounts
* Account information view
* Bank details update
* Exclusion of bank accounts
* Deposit and withdrawal operations

This project is ideal for those who want to learn or improve their knowledge in developing bank account management systems using Node.js. Feel free to explore the source code, contribute improvements, and add new features as needed.

# Installation
* Make sure you have Node.js installed on your machine.
* Clone this repository to your local environment.
* Navigate to the project's root directory in the terminal.
* Run the following command to install the required dependencies:
---
``npm install``

``npm start``

---

The server will run on port 3333. You can access the endpoints through a tool like Postman or a web browser.<br>
# Endpoints<br>
POST /account<br>
Create a new bank account.<br>

Input parameters:<br>
cpf (string, required): CPF of the account holder.<br>
name (string, required): Name of the account holder.<br>

# GET /statement
Returns the complete statement of transactions for a bank account.<br>
Input parameters:<br>
cpf (string, in the header): CPF of the account holder.<br>

# POST /deposit<br>
Make a deposit into a bank account.<br>
Input parameters:<br>
cpf (string, in the header): CPF of the account holder.<br>
description (string, required): Description of the warehouse.<br>
amount (number, mandatory): Deposit amount.<br>

# POST /withdraw
Make a withdrawal from a bank account.<br>
Input parameters:<br>
cpf (string, in the header): CPF of the account holder.<br>
amount (number, required): Cashout amount.<br>

# GET /statement/date
Returns the transaction statement for a bank account based on a specific date.<br>
Input parameters:<br>
cpf (string, in the header): CPF of the account holder.<br>
date (string, in the query): Date in "YYYY-MM-DD" format.<br>

# PUT /update<br>
Updates the name of a bank account holder.<br>
Input parameters:<br>
cpf (string, in the header): CPF of the account holder.<br>
name (string, required): New name of the holder.<br>

# GET /account<br>
Returns information for a bank account.<br>
Input parameters:<br>
cpf (string, in the header): CPF of the account holder.<br>

# DELETE /delete<br>
Excludes a bank account.<br>
Input parameters:<br>
cpf (string, in the header): CPF of the account holder.<br>

# GET /balance<br>
Returns the current balance of a bank account.<br>
Input parameters:<br>
cpf (string, in the header): CPF of the account holder.<br>

# Contribution<br>
Contributions are welcome! feel free<br>


