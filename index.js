import app from "./app.js";
import dotenv from "dotenv";
import chalk from "chalk";
import dbConnect from "./utils/dbConnection.js";

dotenv.config();
const PORT = process.env.PORT || 5003;

// CONNECT DB + START SERVER
(async () => {
  await dbConnect();
  app.listen(PORT, () => {
    console.log(chalk.blueBright(`App running on port ${PORT}`));
  });
})();
