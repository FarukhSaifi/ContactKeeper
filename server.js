const express = require("express");
const path = require("path");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

// Accept Data In JSON
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.json({ msg: "welcome to Contact Keeper" }));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/contacts", require("./routes/contacts"));

// Handle unknown API routes
app.use("/api", (req, res) => {
  return res.status(404).json({ error: "API route not found" });
});

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    return res.sendFile(
      path.resolve(__dirname, "client", "build", "index.html")
    );
  });
}

// Generic error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack);
  return res.status(500).json({ error: "Server error" });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is Started ${PORT} 👀`);
});
