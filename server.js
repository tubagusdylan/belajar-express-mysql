import express from "express";
import mysql from "mysql";

const app = express();

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
