# 📦 Budget Service

This is a standalone microservice for managing user budgets, separated from the monolithic financial tracker system.

<br><br>

# 🚀 Features

1. Add, update, delete, and fetch budgets
2. Validates requests with JWT from the main monolith
3. Stores data in a separate SQLite database
4. Accepts API requests from other services (not public users)

<br><br>

# ⚙️ Setup Instructions

<strong>1. Install dependencies</strong>

```ini
npm install
```

<strong>2. Configure .env</strong><br>
&nbsp;&nbsp;&nbsp;&nbsp;Create a .env file with the following:

```ini
DATABASE_URL="file:./dev.db"
PORT=4003
```

<strong>3. Run Prisma setup</strong>

```ini
npx prisma migrate dev --name init
npx prisma generate
```

<strong>4. Start the service</strong>

```ini
node server.js
```

The API will be available at:

```ini
http://localhost:4003/budgets
```

<br><br>

# 🔐 Authentication (Passing the Token)

This service requires a JWT token to access any route. This token must be included in every request as part of the Authorization header.

<br><br>

# 🧾 API Endpoints

All routes require a valid JWT in the Authorization header.

<strong>➕ POST `/budgets`</strong>  
Create a new budget.

<strong>📄 GET `/budgets`</strong>  
Get all budget for the authenticated user.

<strong>🔍 GET `/budgets/<id>`</strong>  
Get a single budget by ID.

<strong>✏️ PATCH `/budgets/<id>`</strong>  
Update an budget.

<strong>❌ DELETE `/budgets/<id>`</strong>  
Delete an budget.
