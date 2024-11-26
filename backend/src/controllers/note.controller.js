const Note = require("../models/note.model");

exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = new Note({
      title,
      content,
      owner: req.userId,
    });

    await note.save();
    res.status(201).send({ message: "Note created successfully", note });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error creating note", error: error.message });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ owner: req.userId }).sort({
      createdAt: -1,
    });
    res.status(200).send(notes);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting notes", error: error.message });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const note = await Note.findOneAndUpdate(
      { _id: id, owner: req.userId },
      { title, content },
      { new: true }
    );

    if (!note) {
      return res
        .status(404)
        .send({ message: "Note not found or not authorized" });
    }

    res.status(200).send({ message: "Note updated successfully", note });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error updating note", error: error.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findOneAndDelete({ _id: id, owner: req.userId });

    if (!note) {
      return res
        .status(404)
        .send({ message: "Note not found or not authorized" });
    }

    res.status(200).send({ message: "Note deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error deleting note", error: error.message });
  }
};
