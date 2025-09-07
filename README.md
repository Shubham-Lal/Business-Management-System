# 📱 Business Management System
Frontend + Backend for small businesses to manage products, customers, and sales.


## FRONTEND Requirements (React)

### Authentication
- Login screen with email & password
- Store login status in Cookie
- Logout functionality

### Dashboard
- Welcome message with business name
- Quick stats (products count, customers count, today’s sales)
- Quick action buttons: Add Product, Add Customer, Create Sale


### Products
- Product list (with search)
- Add/Edit/Delete product form
- Stock indicators (low stock warnings)


### Customers
- Customer list (with search)
- Add/Edit customer form
- View purchase history
- Call customer directly


### Sales
- Create sale: select customer + products with quantity
- Auto-calculate total
- Save sale transaction
- Sales history & filters


### Reports
- Daily sales summary
- Low stock products list
- Top customers
- Basic charts


## Backend Requirements (Node.js + Express + MongoDB)

### User Authentication
- Register/Login (JWT)
- Each user manages their own business data


### Models
- Product: { name, description, price, stock, category, businessId }
- Customer: { name, phone, email, address, businessId }
- Transaction: { customerId, products[{productId, qty, price}], totalAmount, date, businessId }


### APIs
- /auth/register, /auth/login
- /products → CRUD + search
- /customers → CRUD + search
- /transactions → create + list + filters
- /reports → daily sales, low stock, top customers