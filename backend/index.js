const app = require("./src/config/app");
const connectDB = require("./src/config/database");

const PORT = process.env.PORT || 3700;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
