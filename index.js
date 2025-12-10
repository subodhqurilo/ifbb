// index.js
import app from "./app.js";
import dbConnect from "./utils/dbConnection.js";
import chalk from "chalk";

dbConnect();

// ⭐ Vercel serverless CORS FIX
export default function handler(req, res) {

  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  return app(req, res);
}

// ⭐ Local development mode (localhost backend)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5003;
  app.listen(PORT, () => {
    console.log(chalk.blueBright(`Local backend running on port ${PORT}`));
  });
}
