const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

//user model

const User = require("../models/User");

router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
});

router.post("/register", (req, res, next) => {
  const { username, password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    const user = new User({
      username,
      password: hash,
    });
    const promise = user.save();
    promise
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
  });
});

router.post("/authenticate", (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        res.json({
          status: false,
          message: "Authenticaiton failed, user not found.",
        });
      } else {
        bcrypt.compare(password, user.password).then((result) => {
          if (!result) {
            res.json({
              status: false,
              message: "Authenticaiton failed, wrong password.",
            });
          } else {
            const payload = {
              username,
            };
            const token = jwt.sign(payload, req.app.get("api_secret_key"), {
              expiresIn: 720, // 12 saat
            });

            res.json({
              status: true,
              token,
            });
          }
        });
      }
    })
    .catch((err) => {
      if (err) throw err;
    });
});

module.exports = router;
