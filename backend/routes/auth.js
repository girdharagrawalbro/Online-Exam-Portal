const express = require("express");
const User = require("../modules/User");
const router = express.Router();

const { check, body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "girdharisagoodboy";
const crypto = require('crypto');

function generateRegistrationNumber() {
    const randomBytes = crypto.randomBytes(4); // Adjust byte length as needed
    return randomBytes.readUInt32BE(0).toString().padStart(8, '0'); // Format as string
}

const generateUniqueRegistrationNumber = async () => {
  let registrationNumber;
  let userExists = true;

  while (userExists) {
    registrationNumber = generateRegistrationNumber();
    const user = await User.findOne({ registrationNumber });
    if (!user) {
      userExists = false;
    }
  }

  return registrationNumber;
};

// Route 1 : create a user using POST /api/auth/register
router.post(
  "/register",
  [
    // validation check
    body("name", "Enter a valid Name").isLength({ min: 3 }),
    body("email").custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        return Promise.reject("E-mail already in use");
      }
    }),
    check("password")
      .isLength({ min: 8 })
      .withMessage("must be at least 8 chars long")
      .matches(/\d/)
      .withMessage("must contain a number"),
      
    body("mobileNumber", "Mobile number must be 10 digits long").isLength({
      min: 10,
    }),

    body("mobileNumber").custom(async (value) => {
      const user = await User.findOne({ mobileNumber: value });
      if (user) {
        return Promise.reject("Mobile number already in use");
      }
    }),
    
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const registrationNumber = await generateUniqueRegistrationNumber();
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // createing a new user
      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
        mobileNumber: req.body.mobileNumber,
        address: req.body.address,
        registrationNumber: registrationNumber,
        dateOfBirth: req.body.dateOfBirth,
      });

      const data = {
        user: {
          id: newUser._id, // use 'newUser' (the new instance) instead of 'User' (the model)
        },
      };
      
      const authtoken = jwt.sign(data, JWT_SECRET, { expiresIn: '1h' });
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ error: "Internal Server Error" });
    }
  }
);

// Route 2 : Login a user using credentials:  POST "/api/auth/login" 
router.post(
  "/login",
  [
    body("registrationNumber", "Registration Number cannot be blank").exists(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { registrationNumber, password } = req.body;
    try {
      let user = await User.findOne({ registrationNumber });
      if (!user) {
        return res.status(400).json({ success, error: "Please login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ success, error: "Please try to login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET, { expiresIn: '1h' });
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ error: "Internal Server Error" });
    }
  }
);

// Route 3 : Get the user data using : POST "api/auth/getuser" login required 
router.post(
  "/getuser", fetchuser,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ error: "Internal Server Error" });
    }
  }
);

// Route to get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
