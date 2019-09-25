const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');

const Menu = require('../../models/Menu');
const Record = require('../../models/Record');
const User = require('../../models/User');
const moment = require('moment');

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

// @route    GET api/menu
// @desc     get one's menus
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const menus = await Menu.find({ user: req.user.id }).sort({ date: -1 });
    res.json(menus);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/menu/:id
// @desc     get detailed data by id
// @access   Private
router.get('/:id', auth, async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);

    // const record = menu.records.sort({ date: -1 });
    res.json(menu);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/menu/id
// @desc     delete a menu
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);

    if (!menu) {
      return res.status(404).json({ msg: 'メニューが見つかりません。' });
    }

    // Check user
    if (menu.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'ユーザーは認証されていません。' });
    }

    await menu.remove();

    res.json({ msg: 'メニューを消去しました。' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/menu/record/:id
// @desc     add sets and rep
// @access   Private
// router.post(
//   '/record/:id',
//   [
//     auth,
//     [
//       check('records', '記録を入力してください。')
//         .not()
//         .isEmpty()
//     ]
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     try {
//       // const user = await User.findById(req.user.id).select('-password');

//       const menu = await Menu.findById(req.params.id);

//       const newRecord = new Record({
//         title: req.body.title,
//         record: req.body.record
//       });
//       console.log(newRecord.record);

//       const record = await newRecord.save();

//       menu.records.unshift(record);

//       await menu.save();

//       res.json(menu);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   }
// );

// @route    POST api/menu/record/:id
// @desc     add sets and rep
// @access   Private
router.post(
  '/record/:id',
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

      const date = moment().format('YYYY-MM-DD');

      const newRecord = new Record({
        menu: menu._id,
        title: menu.title,
        record: req.body.record,
        date: date
      });
      console.log(newRecord.record);

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
