import express from "express";
import mysql from "mysql";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  database: "db_school",
  user: "root",
  password: "",
});

db.connect((err) => {
  if (err) throw err;
  console.log("database connected");

  const sql = "SELECT * FROM mahasiswa";
  db.query(sql, (err, result) => {
    // buat jadi json
    const mahasiswa = JSON.parse(JSON.stringify(result));

    app.get("/", (req, res) => {
      res.send(mahasiswa);
    });
  });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
