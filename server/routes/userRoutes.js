const express = require('express');
const { register, login, getUserData } = require('../controllers/userControllers');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();
const { body } = require('express-validator');

router.post(
  '/register',
  body('email', 'invalid email.').isEmail(),
  body(
    'password',
    'password must have 8 characters, 1 lowercase character, 1 uppercase character and 1 number.'
  ).isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
  }),
  register
);
router.post('/login', login);
router.get('/', authMiddleware, getUserData);

module.exports = router;
