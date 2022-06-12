const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");

const JWT_SECRET = "qwertyuiop";


router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "minimum charectors in password should be more than 4").isLength({
      min: 4,
    }),
  ],

  //if there are errors, return bad request and error

  async (req, res) => {
    const errors = validationResult(req);
    let sucess = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ sucess: sucess, errors: errors.array() });
    }

    //giving auth token

    try {
      const data = {
        name: req.body.name,
        password: req.body.password,
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      sucess = true;
      res.json({ sucess, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);

module.exports = router;
