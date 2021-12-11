# Data-Warehouse
 REST API for a marketing company. Manages client's contact's information for their campaigns.
 
 ## Main file:
 **app.js**
 
 ## Server:

- Protocol = **http**
- Hostname = **127.0.0.1 //localhost**
- Port = **5000**

## NPM Dependencies:
Declared in **package.json** file. Must be installed to run the server.
- bcrypt: **$ npm i bcrypt**
- cors: **$ npm i cors**
- dotenv: **$ npm i dotenv**
- express: **$ npm i express**
- express-jwt: **$ npm i express-jwt**
- express-rate-limit: **$ npm i express-rate-limit**
- helmet: **$ npm i helmet**
- mysql2: **$ npm i mysql2**
- validatorjs: **$ npm i validatorjs**

## Database Connection:

- Download XAMPP software from **https://www.apachefriends.org/download.html**
- Import the **warehouse.sql** file into **http://localhost/phpmyadmin/**

Access **connection.js** if you need to configure your local connection.

- Host: **localhost**
- User: **root**
- Database name = **warehouse**

## Start the server:

**$ npm run start**
