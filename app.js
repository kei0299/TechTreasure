const express = require("express");
const app = express();
const path = require("path");
const pool = require('./pool/pool');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public"))); // publicディレクトリを静的ファイルのルートに設定
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  pool.query(
    `select * from logo order by id asc;`, (error, results) => {
      res.render('index', {
        title: 'TechTreasure',
        logos: results.rows,
      });
    }
  );
});

// フラグ更新用のルート
app.post('/update-flag', (req, res) => {
  const { id } = req.body;

  // フラグを更新するSQLクエリ
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

app.post('/save-name', (req, res) => {
  const { name, id } = req.body;
  // データベースに名前を保存するクエリ
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

app.post('/reset', (req, res) => {
  // データベースにクエリを実行
  pool.query('UPDATE logo SET flag = false;', (error, results) => {
    if (error) {
      // エラーが発生した場合の処理
      console.error('データベースエラー:', error);
      res.status(500).send("データベースへの保存中にエラーが発生しました");
    } else {
      // 成功した場合の処理
      res.status(200).send("リセットしました");
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`The server has started and is listening on port number: ${port}`);
});

module.exports = app;