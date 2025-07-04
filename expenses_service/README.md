# 📦 Expenses Service
This is a standalone microservice for managing user expenses, separated from the monolithic financial tracker system.

<br><br>

# 🚀 Features
1. Add, update, delete, and fetch expenses
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
JWT_SECRET="inazumashineseternal"
PORT=4001
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
http://localhost:4001/expenses
```

<br><br>

# 🔐 Authentication (Passing the Token)
This service requires a JWT token to access any route. This token must be included in every request as part of the Authorization header.

<strong>Sample token passing</strong>
```js
const token = "your-jwt-token-here"; // 👈 the fetched token

fetch("http://localhost:4001/expenses", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}` // 👈 attach token here
  },
  body: JSON.stringify({
    expense_name: "Dinner",
    amount: 120,
    userId: 22,      // 👈 pass the User ID here
    categoryId: 11   // 👈 pass the Budget ID here
  })
})
  .then(res => res.json())
  .then(data => console.log("Created expense:", data))
  .catch(err => console.error("Error:", err));
```

<br><br>

# 🧾 API Endpoints
All routes require a valid JWT in the Authorization header.

<strong>➕ POST ``/expenses``</strong>
Create a new expense.

<strong>📄 GET ``/expenses``</strong>
Get all expenses for the authenticated user.

<strong>🔍 GET ``/expenses/<id>``</strong>
Get a single expense by ID.

<strong>✏️ PATCH ``/expenses/<id>``</strong>
Update an expense.

<strong>❌ DELETE ``/expenses/<id>``</strong>
Delete an expense.
