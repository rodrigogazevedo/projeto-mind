const bcrypt = require('bcrypt');
const users = require('../data/users');
const saveData = require('../utils/saveData');

module.exports = {
  create(req, res, next) {
    res.render('register');
  },

  save(req, res, next) {
    let id = users.length + 1;
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    req.body.confirm_password = req.body.password;
    let user = { id, ...req.body };

    users.push(user);

    saveData(users, 'users.js');

    res.render('register', {added: true });
  },

  login(req, res, next) {
    res.render('index');
  },

  authenticate(req, res, next) {
    let { email, password } = req.body;
    let user = users.find((user) => email == user.email);

    if(!user) {
      return res.render('index', {notFound: true });
    }

    if(!bcrypt.compareSync(password, user.password)) {
      return res.render('index', { notFound: true });
    }

    req.session.user = { 
      id: user.id,
      name: user.name, 
      email: user.email,
    }

    res.render('administration', { user: req.session.user });
  }, 

  logout(req, res, next) {
    req.session.destroy();
    res.redirect('/');
  }
};