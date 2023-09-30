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

