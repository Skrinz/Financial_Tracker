require("dotenv").config();
const express = require("express");
const setupRoutes = require("./routes");

const app = express();
setupRoutes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
// This code initializes the API Gateway, sets up routes, and starts the server.
