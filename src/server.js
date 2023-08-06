import express from "express";
import mysql from "mysql";

const app = express();

// setup template engine
app.set("view engine", "ejs");
app.set("views", "views");

// pake middleware json untuk req body
app.use(express.urlencoded({ extended: false }));

const db = mysql.createConnection({
  host: "localhost",
  database: "db_school",
  user: "root",
  password: "",
});

db.connect((err) => {
  if (err) throw err;
  console.log("database connected");

  // get data
  app.get("/", (req, res) => {
    const sql = "SELECT * FROM mahasiswa";
    db.query(sql, (err, result) => {
      // buat jadi json
      const mahasiswa = JSON.parse(JSON.stringify(result));
      res.render("index", { mahasiswa: mahasiswa, title: "DAFTAR MURID" });
    });
  });

  // tambah data
  app.post("/", (req, res) => {
    const insertSql = `INSERT INTO mahasiswa (nama, kelas) VALUES ('${req.body.nama}', '${req.body.kelas}')`;

    db.query(insertSql, (err, result) => {
      if (err) throw err;
      res.redirect("/");
    });
  });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
