const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');

const Menu = require('../../models/Menu');
const Record = require('../../models/Record');
const User = require('../../models/User');

// @route    POST api/menu/record/:id
// @desc     add sets and rep
// @access   Private
router.post(
  '/:id',
  [
    auth,
    [
      check('record', '記録を入力してください。')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const menu = await Menu.findById(req.params.id);

      const newRecord = new Record({
        menu: menu._id,
        title: menu.title,
        record: req.body.record
      });

      const record = await newRecord.save();

      menu.records.unshift(record);

      await menu.save();
      await record.save();

      res.json(menu);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
