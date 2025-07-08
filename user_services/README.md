# 📦 Expenses Service

This is a standalone microservice for managing user expenses, separated from the monolithic financial tracker system.

<br>

# 🚀 Features

1. Login, Register, and Update Profile expenses
2. Validates requests with JWT from the main monolith
3. Stores data in a separate SQLite database
4. Accepts API requests from other services (not public users)

<br>

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
PORT=4002
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
http://localhost:4002/users
```

<br>

# 🔐 Authentication (Passing the Token)

This service requires a JWT token to access change profile.

<br>

# 🧾 API Endpoints

All routes require a valid JWT in the Authorization header.

<strong>➕ POST `/register`</strong>  
Create a new user.

<strong>📄 POST `/login`</strong>  
Check if the user is in the database.

<strong>✏️ PATCH `/changePassword`</strong>  
Update user profile.

<strong>🔐 POST `/verify`</strong>  
Verifies the token provided.
