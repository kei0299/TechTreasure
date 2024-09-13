const express = require("express");
const app = express();
const path = require("path");
const db = require('./db/db');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public"))); // publicディレクトリを静的ファイルのルートに設定

app.get("/", (req, res) => {
    db.query(
        `select * from logo;`,(error, results) => {
          res.render('index', {
            title: 'TechTreasure',
            logos: results.rows,
          });
        }
      ); 
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`The server has started and is listening on port number: ${port}`);
});

module.exports = app;