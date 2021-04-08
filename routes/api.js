var express = require('express');
var router = express.Router();
const { Category, Question, Answer, User } = require('../lib/models');

// List out the questions for a particular category

// GET /api/v1/categories
// GET /api/v1/categories/:categoryId/questions
// POST /api/v1/categories/:categoryId/questions
// POST /api/v1/categories/:categoryId/questions/:questionId/answers
// GET /api/v1/categories/:categoryId/questions/:questionId/answers

router.get(
  '/profile',
  async (req, res, next) => {
    console.log('req.user is', req.user);
    // write code like find the user where the email id is this
    let u = await User.findOne({ where: { email: req.user.email } });

    res.json({
      message: 'You made it to the secure route',
      // user: req.user,
      user: u,
      token: req.query.token
    })
  }
);

router.get(
  '/users/me',
  async (req, res, next) => {
    console.log('req.user is', req.user);
    // write code like find the user where the email id is this

    let u = await User.findOne({ where: { email: req.user.email } });
    res.json({
      message: 'You made it to the secure route',
      // user: req.user,
      userId: u.id,
      token: req.query.token
    })
  }
);

router.get('/categories', async function (req, res, next) {
  console.log('req.user is', req.user);
  // write code like find the user where the email id is this
  // if user exists, find all categories/questions that belong to a user, Question.findAll({where: userId: user.id});

  let categories = await Category.findAll({});
  res.json(categories);
});

router.post('/categories/:categoryId/questions', async function (req, res, next) {
  let body = req.body;
  body.categoryId = req.params.categoryId;
  let question = await Question.create(body);
  res.json(question);
});

router.get('/categories/:categoryId/questions', async function (req, res, next) {
  console.log('req.query.userId', req.query.userId)
  let questions = await Question.findAll({ where: { categoryId: req.params.categoryId, userId: req.query.userId }, include: [{ model: Answer }] });
  res.json(questions);
});

router.post('/categories/:categoryId/questions/:questionId/answers', async function (req, res, next) {
  let body = req.body;
  body.questionId = req.params.questionId;
  let answer = await Answer.create(body);
  res.json(answer);
});

router.get('/categories/:categoryId/questions/:questionId/answers', async function (req, res, next) {
  let answers = await Answer.findAll({ where: { questionId: req.params.questionId } });
  res.json(answers);
});

router.delete('/categories/:categoryId/questions/:questionId', async function (req, res, next) {
  console.log(req.params)
  // this destroys all questions
  let question = await Question.destroy({ where: { categoryId: req.params.categoryId } });
  res.json(question);
});


// let stock = await Portfolio.destroy({ where: { id: req.params.id } });
//   // update the wallet happens here
//   // res.json(stock);
//   res.json(stock);


// let body = req.body;
// body.categoryId = req.params.categoryId;
// let question = await Question.create(body);
// res.json(question);


// router.delete('/:id', async function (req, res, next) {
//   // console.log(req.params)

//   let currentStock = await Portfolio.findOne({ where: { id: req.params.id } });
//   if (currentStock) {
//     let symbol = currentStock.symbol;
//     let quantity = currentStock.quantity;
//     const data = await yahooStockPrices.getCurrentData(symbol);
//     // console.log(data)

//     let cashEarnedFromStockSale = parseInt(parseInt(quantity) * data.price);

//     let currentWallet = await Wallet.findOne({});
//     if (currentWallet) {
//       let currentWalletValue = parseInt(currentWallet.value);
//       let newWalletValue = currentWalletValue + cashEarnedFromStockSale;
//       console.log('newWalletValue', newWalletValue);
//       await currentWallet.update({ value: newWalletValue })
//     }

//     let stock = await Portfolio.destroy({ where: { id: req.params.id } });
//     // update the wallet happens here
//     // res.json(stock);
//     res.json(stock);

//   }
//   // // let stock = await Portfolio.destroy({where: {id: req.params.id}});
//   // // update the wallet happens here
//   // // res.json(stock);
//   // res.json({});
// });

module.exports = router;