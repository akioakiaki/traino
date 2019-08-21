const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');

const Menu = require('../../models/Menu');
const User = require('../../models/User');

// @route    POST api/menu
// @desc     Create a menu
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('title', 'メニュー名をご記入ください。')
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
      const user = await User.findById(req.user.id).select('-password');

      const newMenu = new Menu({
        title: req.body.title,
        name: user.name,
        user: req.user.id
      });

      const menu = await newMenu.save();

      res.json(menu);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
