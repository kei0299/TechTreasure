const express = require("express");
const app = express();
const pool = require('./db/db');

app.get("/", (req, res) => {
    pool.query(
        `select * from logo;`,(error, results) => {
          res.render('index', {
            title: 'TechTreasure',
            logos: results.rows,
          });
        }
      ); 
});

//使用していないが、フォルダ等の整理が必要？