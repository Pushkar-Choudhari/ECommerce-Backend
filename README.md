# ECommerce-Backend

## Installation

### Prerequisites

- Node.js installed on your machine
- Git installed on your machine
- A database server (e.g., MySQL) and Elasticsearch database set up and running

### Installation Steps

1. Clone the repository:
   
  git clone <repository_url>
  
  cd <repository_directory>

2. Initialize your Node.js project:
   npm init

3. Run the setup.sql file to set up your database schema.

4. Configure the database:
In `config/database.js`, set up the database configuration in the `pool` variable to match your database setup.

5. Configure Elasticsearch:
In both `config/indexProduct.js` and `controllers/search.js`, update the `node` value with the URL of your Elasticsearch database.

6. Set up JWT Secret:
Create a `.env` file in your project directory and add the JWT secret:
  JWT="your_secret_key_here"

7. Install Dependencies:
   npm install

8. Start the Server:
   npm start

## Features

1. **User Registration**:
- Endpoint: `/auth/register`
- Method: POST
- JSON Request Body:
  ```json
  {
    "name": "your_name",
    "email": "your_email",
    "password": "your_password"
  }
  ```

2. **User Login**:
- Endpoint: `/auth/login`
- Method: POST
- JSON Request Body:
  ```json
  {
    "name": "your_name",
    "password": "your_password"
  }
  ```

  3. **Add New Product** (Admin Only):
- Endpoint: `/product/add`
- Method: POST
- JSON Request Body:
  ```json
  {
    "product_name": "product_name",
    "unit_price": 12.34,
    "description": "product_description"
  }
  ```
- Admin Credentials: Username: admin, Password: admin

4. **View Product**:
- Endpoint: `/product/view/:product_id`
- Method: GET
- Replace `:product_id` with the actual product ID of the product you want to view.

5. **Add Item to Cart**:
- Endpoint: `/cart/add/:user_id`
- Method: POST
- JSON Request Body:
  ```json
  {
    "product_id": 123,
    "quantity": 2,
    "unit_price": 10.99
  }
  ```
- Replace `:user_id` with the user's ID.

6. **View Cart**:
- Endpoint: `/cart/view/:user_id`
- Method: GET
- Replace `:user_id` with the user's ID.

7. **Make an Order**:
- Endpoint: `/order/make/:user_id`
- Method: GET
- Replace `:user_id` with the user's ID.

8. **View All Orders**:
- Endpoint: `/order/view/:user_id/all`
- Method: GET
- Replace `:user_id` with the user's ID.

9. **View Order Details**:
- Endpoint: `/order/view/:user_id/:order_id`
- Method: GET
- Replace `:user_id` with the user's ID and `:order_id` with the order ID you want to view.

Replace placeholders like `<repository_url>`, `<repository_directory>`, and other values with your actual project details.

Ensure to implement security measures such as input validation and password hashing to secure your application properly.


