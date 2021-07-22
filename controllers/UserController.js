const bcrypt = require('bcrypt');
const dateFormat = require('moment');
const browserify = require('browserify');
const { User, Sequelize } = require('../models');

module.exports = {
  create(req, res, next) {
    res.render('register');
  },

  async save(req, res, next) {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    req.body.confirm_password = req.body.password;
    let user = {...req.body};
    let date = dateFormat().format();

    user.createdAt = date;
    user.updatedAt = date;

    await User.create(user);

    res.render('register', {added: true });
  },

  async delete(req, res, next) {
    let id = req.params.id;
    let user = await User.findByPk(id);

    user.deleted = true;

    await user.save();

    let users = await User.findAll({ 
      where: {
        [Sequelize.Op.and] : [
          {
            deleted : 'false'
          },
          {
            admin : 'false'
          }
        ]
      },
    });

    res.render('administration', { users, user: req.session.user, deleted: true });
  },

  async update(req, res, next) {
    let id = req.params.id;
    let currentUser = req.session.user;
    let user = await User.findByPk(id);

    let {name, email} = req.body;

    let date = dateFormat().format();

    user.updatedAt = date;

    user.name = name;
    user.email = email;
    user.deleted = 'false';
    if(user.password !== "") {
      let password = bcrypt.hashSync(req.body.password, 10);
      user.password = password;
      user.confirm_password = password;
    }

    await user.save();

    let users = await User.findAll({ 
      where: {
        [Sequelize.Op.and] : [
          {
            deleted : 'false'
          },
          {
            admin : 'false'
          }
        ]
      },
    });

    user = await User.findOne({ where: { email } });

    if(currentUser.admin == true) {
      res.render('administration', { users, user: req.session.user, updated: true });
    } else {
      res.render('userPage', { user, user: req.session.user, updated: true });
    }
  },

  login(req, res, next) {
    res.render('index');
  },

  async authenticate(req, res, next) {
    let { email, password } = req.body;
    let user = await User.findOne({ where: { email } });
    let profile = await User.findByPk(user.id);

    if(!user) {
      return res.render('index', {notFound: true });
    }

    if(!bcrypt.compareSync(password, user.password)) {
      return res.render('index', { notFound: true });
    }

    delete user.password;

    req.session.user = user;

    if(user.admin == true) {
      let users = await User.findAll({ 
        where: {
          [Sequelize.Op.and] : [
            {
              deleted : 'false'
            },
            {
              admin : 'false'
            }
          ]
        },
      });

      res.render('administration', { users, user: req.session.user });
    } else {
      res.render('userPage', { user: req.session.user });
    }

    
  }, 

  logout(req, res, next) {
    req.session.destroy();
    res.redirect('/');
  },

  forgotPassword(req, res, next) {
    res.render('forgotPassword');
  }
};