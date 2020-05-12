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
