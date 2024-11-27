const i18n = require("../config/i18n");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).send({ message: i18n.t("emailInUse") });

    // Create a new user
    const user = new User({ name, email, password });
    await user.save();

    res.status(201).send({ message: i18n.t("userRegistered") });
  } catch (error) {
    res.status(500).send({ message: i18n.t("serverError") + error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ message: i18n.t("userNotFound") });

    // Compare passwords
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid)
      return res.status(401).send({ message: i18n.t("invalidCredentials") });

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const userObj = user.toObject();
    delete userObj.password;

    res.status(200).send({ token, user: userObj });
  } catch (error) {
    res.status(500).send({ message: i18n.t("serverError") });
  }
};

exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).send({ message: i18n.t("userNotFound") });

    const { password, ...userData } = user.toObject();
    res.status(200).send(userData);
  } catch (error) {
    res.status(500).send({ message: i18n.t("serverError") });
  }
};
