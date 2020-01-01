# simple-blog-backend

專案 simple-blog 使用的後端伺服器。

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
