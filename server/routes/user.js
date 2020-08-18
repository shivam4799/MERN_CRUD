const express = require("express");
const User = require("../model/user");

const router = express.Router();

router.get("/allUser", async (req, res) => {
  try {
    const users = await User.find({ is_deleted: true }).exec();
    res.json(users);
  } catch (err) {
    console.log(err);
  }
});
router.get("/", async (req, res) => {
  try {
    const users = await User.find({ is_deleted: false }).exec();
    res.json(users);
  } catch (err) {
    console.log(err);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const users = await User.findOne({ _id: req.params.id }).exec();
    res.json(users);
  } catch (err) {
    console.log(err);
  }
});

// add user
router.post("/add", async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findOne({ email: req.body.email }).exec();
    if (user) {
      return res.status(400).json({ error: "user already addded" });
    }
    const doc = await User.create(req.body);

    res.json(doc);
  } catch (err) {
    console.log(err);
  }
});

// update user
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { ...req.body, modified_at: new Date() },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

// delete user
router.put("/delete/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { is_deleted: true, modified_at: new Date() },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});
// recover user
router.put("/recover/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { is_deleted: false, modified_at: new Date() },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
