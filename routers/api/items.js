import express from 'express';
import Item from '../../models/Item.js';
import auth from '../../middleware/auth.js';

const router = express.Router();

// @route  GET api/items
// @desc   Get All items
// @access Public
router.get('/', (req, res) => {
    Item.find()
    .sort({date: -1})
    .then( items => res.json(items));
});

// @route  POST api/items
// @desc   Create an item
// @access Private
router.post('/', auth, (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));
});

// @route  Delete api/items
// @desc   Delete an Item
// @access Private
router.delete('/:id', auth, (req, res) => {
        Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success : false}));
});


export default router;
