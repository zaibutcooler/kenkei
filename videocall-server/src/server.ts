import dotenv from "dotenv";
import express, { Request, Response } from "express";
dotenv.config();

// Create Express app
const app = express();
const port = 3000;

// Define a route handler for the root path
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
