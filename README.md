# simple-blog-backend

使用 Vue.js 作為前端開發框架，參考 Medium 所撰寫的部落格前後端分離專案，此為後端伺服器專案。這是一個基於練習全端開發、興趣同時也想致敬原網站而做的作品，本身不做任何商業用途。

![Cover1](https://github.com/EasonLin0716/simple-blog-frontend/blob/master/src/assets/cover1.JPG)

![Cover2](https://github.com/EasonLin0716/simple-blog-frontend/blob/master/src/assets/cover2.JPG)

![Cover3](https://github.com/EasonLin0716/simple-blog-frontend/blob/master/src/assets/cover3.JPG)

[本專案已佈署於 heroku](https://simple-blog-backend.herokuapp.com/api/)

關於現階段的成品，可參考前端的[github page](https://easonlin0716.github.io/simple-blog-frontend/#/posts)

## 使用工具

- Node.js Express
- MySQL (with Sequelize ORM)

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
