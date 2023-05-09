const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const ValidationError = require('../errors/ValidationError');
const ExistingMailError = require('../errors/ExistingMailError');
const NotFoundError = require('../errors/NotFoundError');
const AuthError = require('../errors/AuthError');

const { JWT_SECRET = 'key' } = process.env;
// const { NODE_ENV, JWT_SECRET } = process.env;

const {
  // BAD_REQUEST,
  // INTERNAL_SERVER_ERROR,
  STATUS_OK,
  // NOT_FOUND,
  // EXISTING_MAIL,
} = require('../errors/errors');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(STATUS_OK).send(users))
    .catch((err) => next(err));
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(STATUS_OK).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      _id: user._id,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Некорректный данные'));
      } else if (err.code === 11000) {
        next(new ExistingMailError('Пользователь с таким E-mail уже существует'));
      } else {
        next(err);
      }
    });
};

const getUserId = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => new NotFoundError('Пользователь с указанным id не существует'))
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

const updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => new NotFoundError('Пользователь с указанным id не существует'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Некорректный данные'));
      } else {
        next(err);
      }
    });
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => new NotFoundError('Пользователь не существует'))
    .then((user) => res.status(STATUS_OK).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Некорректный данные'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError('Неправильные почта или пароль');
          }
          return user;
        })
        .then(() => {
          const token = jwt.sign(
            { _id: user._id },
            JWT_SECRET,
            { expiresIn: '7d' },
          );
          res.cookie('jwt', token, {
            maxAge: 3600000,
            httpOnly: true,
            // sameSite: true,
          });
          res.status(STATUS_OK).send({ token });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

module.exports = {
  createUser,
  getUsers,
  getUserId,
  updateUserInfo,
  updateUserAvatar,
  login,
  getUserInfo,
};
