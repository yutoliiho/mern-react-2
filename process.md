先 backend 再 client，最后做这个哦～～

cd home directory:
npm init -y
$ npm i nodemon --save-dev
$ npm i concurrently --save-dev

<!-- package.json -->

line 7:
"scripts": {
"client-install": "cd client && npm install",
"start": "node server.js",
"server": "cd backend && nodemon server.js",
"client": "cd client && npm start",
"dev": "concurrently \"npm run server\" \"npm run client\" "
},

# notes:

<!-- to uninstall -->

npm uninstall nodemon --save-dev
npm uninstall concurrently --save-dev

# address in use

$ sudo lsof -i :5000
$ kill -9 {PID}
means: (kill -9 47291)
