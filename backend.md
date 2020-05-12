# ================ backend install ================

cd backend:
\$ npm init -y

dependencies:
\$ npm i express concurrently mongoose

dev dependencies:
\$ npm i nodemon --save-dev
\$ npm i concurrently --save-dev

# ================ backend ends ===================

<!-- package.json -->

"scripts": {
"start": "node server.js",
"dev": "nodemon server.js"
},
// cd backend: npm run dev (for when doing backend)

<!-- server.js -->

const express = require('express');
const mongoose = require('mongoose');
const itemRouter = require('./routes/api/items');

const app = express();
const PORT = process.env.PORT || 5000;

// use route:
app.use(express.json());
app.use(itemRouter);

// DB config:
const db = require('./config/keys').mongoURI;

// connect DB:
mongoose
.connect(db, {
useNewUrlParser: true,
useCreateIndex: true,
useUnifiedTopology: true,
useFindAndModify: false,
})
.then(() => {
console.log('DB connected');
})
.catch((err) => console.log(err));

// app.get('/', (req, res) => {
// res.json([
// {
// name: 'Alexander Auchter',
// age: 34,
// },
// {
// name: 'TongTong',
// age: 23,
// },
// ]);
// });

app.listen(PORT, () => {
console.log(`server is running on port ${PORT}`);
});

<!-- config / keys.js -->

module.exports = {
mongoURI:
'mongodb+srv://cryobeauty:9438666toYU@mern-shopping-list-8ocn7.mongodb.net/test?retryWrites=true&w=majority',
};

// acct: cryobeautysf@gmail.com
// code: 9438666toYU

<!-- models/Items.js -->

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema:
const ItemSchema = new Schema({
name: {
type: String,
required: true,
},
date: {
type: Date,
default: Date.now,
},
});

const Items = mongoose.model('Items', ItemSchema);
module.exports = Items;

<!-- routes/api/items.js -->

const express = require('express');
const router = express.Router();

const Items = require('../../models/Items');

router.get('/', (req, res) => {
Items.find()
.sort({
date: -1,
})
.then((items) => res.json(items));
});

router.post('/', (req, res) => {
// post a new item to the DB
const newItems = new Items({
name: req.body.name,
age: req.body.age,
// date is automatically using defualt.
});
newItems.save().then((item) => res.json(item));
});

router.delete('/:id', (req, res) => {
Items.findById(req.params.id)
.then((item) => item.remove().then(() => res.json({ success: true })))
.catch((e) => {
res.status(404).json({ success: false });
});
});

module.exports = router;

<!-- postman -->

GET localhost:5000/
POST localhost:5000/
DELETE localhost:5000/{id}
