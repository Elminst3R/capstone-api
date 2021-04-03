var express = require('express');
var router = express.Router();
const { Category, Question, Answer } = require('../lib/models')

// POST '/api/v1/questions'
// GET '/api/v1/questions/1'
// GET '/api/v1/questions/1/answers'

// list out the questions for a particular category

// GET /api/v1/categories
// GET /api/v1/categories/:categoryId/questions
// POST /api/v1/categories/:categoryId/questions
// POST /api/v1/categories/:categoryId/questions/:questionId/answers
// GET /api/v1/categories/:categoryId/questions/:questionId/answers

router.get('/categories', async function (req, res, next) {
  console.log(' I WAS HERE*****');
  let categories = await Category.findAll({});
  console.log(JSON.stringify(categories));
  res.json(categories);
});

router.post('/categories/:categoryId/questions', async function (req, res, next) {
  let body = req.body;
  body.categoryId = req.params.categoryId;
  let question = await Question.create(req.body);
  res.json(question);
});

router.get('/categories/:categoryId/questions', async function (req, res, next) {

  let questions = await Question.findAll({ where: { categoryId: req.params.categoryId }, include: [{ model: Answer }] })
  res.json(questions);
});

router.post('/categories/:categoryId/questions/:questionId/answers', async function (req, res, next) {
  // req.params.categoryId
  // req.params.questionId
  let body = req.body;
  body.questionId = req.params.questionId;
  let answer = await Answer.create(req.body);
  res.json(answer);
});

router.get('/categories/:categoryId/questions/:questionId/answers', async function (req, res, next) {
  let answers = await Answer.findAll({ where: { questionId: req.params.questionId } });
  res.json(answers);
});

/* GET users listing. */
// router.get('/', function (req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;