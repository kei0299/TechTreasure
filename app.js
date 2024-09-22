const express = require("express");
const app = express();
const path = require("path");
const pool = require('./db/db');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public"))); // publicディレクトリを静的ファイルのルートに設定
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// index.ejsの表示
app.get("/", (req, res) => {
  pool.query('SELECT * FROM logo ORDER BY id ASC;', (error, results) => {
    if (error) {
      console.error("Database query error:", error); 
      return res.status(500).send("Database query failed."); 
    }

    res.render("index", {
      title: "TechTreasure",
      logos: results?.rows || [], // resultsがundefinedでないか確認
    });
  });
});


// フラグ更新
app.post('/update-flag', (req, res) => {
  const { id } = req.body;
  const query = 'UPDATE logo SET flag = true WHERE id = $1';

  pool.query(query, [id])
    .then(() => {
      res.json({ success: true });
    })
    .catch(error => {
      console.error('フラグ更新エラー:', error);
      res.status(500).json({ success: false });
    });
});

// 名前保存
app.post('/save-name', (req, res) => {
  const { name, id } = req.body;
  const query = 'UPDATE logo SET owner_name = $1 WHERE id = $2;';

  pool.query(query, [name, id])
    .then(() => {
      res.status(200).send("名前を保存しました");
    })
    .catch((error) => {
      console.error('データベースエラー:', error);
      res.status(500).send("データベースへの保存中にエラーが発生しました");
    });
});

// リセット処理
app.post('/reset', (req, res) => {
  pool.query('UPDATE logo SET flag = false, owner_name = "";', (error, results) => {
    if (error) {
      console.error('データベースエラー:', error);
      res.status(500).send("データベースへの保存中にエラーが発生しました");
    } else {
      res.status(200).send("リセットしました");
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`The server has started and is listening on port number: ${port}`);
});

module.exports = app;