# Khan Traders Backend

This is the backend server for the Khan Traders inventory management system.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
2. Navigate to the project directory:
   ```
   cd khan-traders-backend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root directory (see `.env.example` for reference)

### Running the Server

For development:
```
npm run dev
```

For production:
```
npm start
```

The server will run on port 5001 by default, or the port specified in the `.env` file.

## API Endpoints

### Authentication

- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/forgot-password` - Request password reset

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get a user by ID
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a product by ID
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

### Sales

- `GET /api/sales/monthly` - Get monthly sales data
- `GET /api/sales/daily/:month` - Get daily sales data for a specific month
- `GET /api/sales/recent` - Get recent sales
- `GET /api/sales/:id` - Get a sale by ID
- `POST /api/sales` - Create a new sale
- `PUT /api/sales/:id` - Update a sale

## Demo Mode

This backend is currently running in demo mode with mock data. In a production environment, it would connect to a MongoDB database. 