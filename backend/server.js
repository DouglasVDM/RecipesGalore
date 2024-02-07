const express = require("express");
const cors = require("cors");
const sessionMiddleware = require("./middleware/sessionMiddleware.js");
require("dotenv").config();

const recipeRoutes = require("./routes/recipeRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(sessionMiddleware);

app.use(recipeRoutes);
app.use(userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is ready at http://localhost:${PORT}`);
});
