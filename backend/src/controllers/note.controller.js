const i18n = require("../config/i18n");
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
    res.status(201).send({ message: i18n.t("noteCreatedSuccessfully"), note });
  } catch (error) {
    res
      .status(500)
      .send({ message: i18n.t("errorCreatingNote"), error: error.message });
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
      .send({ message: i18n.t("errorGettingNotes"), error: error.message });
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
        .send({ message: i18n.t("noteNotFoundOrNotAuthorized") });
    }

    res.status(200).send({ message: i18n.t("noteUpdatedSuccessfully"), note });
  } catch (error) {
    res
      .status(500)
      .send({ message: i18n.t("errorUpdatingNote"), error: error.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findOneAndDelete({ _id: id, owner: req.userId });

    if (!note) {
      return res
        .status(404)
        .send({ message: i18n.t("noteNotFoundOrNotAuthorized") });
    }

    res.status(200).send({ message: i18n.t("noteDeletedSuccessfully") });
  } catch (error) {
    res
      .status(500)
      .send({ message: i18n.t("errorDeletingNote"), error: error.message });
  }
};
