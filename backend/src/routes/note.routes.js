const express = require("express");
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/note.controller");
const verifyToken = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", verifyToken, getNotes);
router.post("/", verifyToken, createNote);
router.put("/:id", verifyToken, updateNote);
router.delete("/:id", verifyToken, deleteNote);

module.exports = router;
