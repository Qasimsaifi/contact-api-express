const express = require("express");
const errorHandler = require("./middleware/errorhandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cors = require("cors");
const path = require("path");
connectDb();

const app = express();

const port = process.env.PORT || 5001;

app.use(express.json());

// Allow cross-origin requests from any origin
app.use(cors());

app.use("/api/contacts", require("./routes/contactsRouter"));
app.use("/api/users", require("./routes/userRouter"));

app.use(express.static(path.join(__dirname, "public")));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
