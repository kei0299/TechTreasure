const port = process.env.PORT || 3000;
const express = require("express");
const path = require("path"); // パスの設定に使うモジュール
const app = express();

// テンプレートエンジンとして EJS を使用する設定
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // views フォルダを設定

// ルート設定
app.get("/", (req, res) => {
    res.render("index"); // "views" フォルダ内の "index.ejs" をレンダリング
});

// サーバーを指定ポートで起動
app.listen(port, () => {
    console.log(`The server has started and is listening on port number: ${port}`);
});
