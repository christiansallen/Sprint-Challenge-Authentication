const axios = require("axios");
const bcrypt = require("bcryptjs");
const Users = require("../users/users-model");
const jwt = require("jsonwebtoken");
const db = require("../database/dbConfig");

const { authenticate, jwtKey } = require("../auth/authenticate");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes); //Must authenticate before being able to getJokes. Authenticate is middleware.
};

function register(req, res) {
  // implement user registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  if (!user.username || !user.password) {
    res.status(404).json({ message: "Please enter a username and password" });
  } else {
    Users.add(user)
      .then(newUser => {
        res.status(201).json(newUser);
      })
      .catch(() => res.status(500).json({ message: "Server error" }));
  }
}

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, jwtKey, options);
}

function login(req, res) {
  // implement user login
  let { username, password } = req.body;

  db("users")
    .where({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res
          .status(200)
          .json({ message: `Hey ${user.username}! Your token is:`, token });
      } else {
        res
          .status(401)
          .json({ message: "Username and password didn't match." });
      }
    })
    .catch(() => res.status(500).json({ message: "Server error" }));

  // Users.findBy({ username })
  //   .first()
  //   .then(user => {
  //     if (user && bcrypt.compareSync(password, user.password)) {
  //       const token = generateToken(user);
  //       res.status(200).json({
  //         message: `Hey ${user.username}, welcome! Your token is: ${token}`
  //       });
  //     } else {
  //       res
  //         .status(401)
  //         .json({ message: "Username and password didn't match!" });
  //     }
  //   })
  //   .catch(() => res.status(500).json({ message: "Server error" }));
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: "application/json" }
  };

  axios
    .get("https://icanhazdadjoke.com/search", requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}
