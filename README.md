# simple-blog-backend

專案 simple-blog 使用的後端伺服器。此專案仍處於開發階段，部分功能上無法使用

[本專案已佈署於 heroku](https://simple-blog-backend.herokuapp.com/api/)

關於現階段的成品，可參考前端的[github page](https://easonlin0716.github.io/simple-blog-frontend/#/posts)

## API 文件

正在撰寫中

## 安裝

```
git clone https://github.com/EasonLin0716/simple-blog-backend.git
```

在 workbench 中新增 simple_blog_backend 資料庫，並於專案根目錄開啟終端機輸入：

```
npm install
npx sequelize db:migrate
npx sequelize db:seed:all
```

新增 .env 檔案，加入：

```
JWT_SECRET=JWT_SECRET
IMGUR_CLIENT_ID=IMGUR金鑰
```

開啟伺服器：

```
node app.js
```
