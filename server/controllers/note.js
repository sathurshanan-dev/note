import async_handler from '../middleware/async_handler.js';
import Note from '../models/note.js';

const get_notes = async_handler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  res.json(notes);
});

const get_note = async_handler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note) {
    res.json(post);
  } else {
    res.status(404);
    throw new Error('Note not found');
  }
});

const create_note = async_handler(async (req, res) => {
  if (!req.body.content) {
    res.status(400);
    throw new Error('Field cannot be empty');
  }
  const note = await Note.create({
    user: req.user._id,
    title: req.body.title,
    content: req.body.content,
  });
  res.status(200).json(note);
});

const edit_note = async_handler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error('Field cannot be empty');
  }
  const note = await Note.findById(req.params.id);
  if (note) {
    note.title = req.body.title;
    note.content = req.body.content;
    await note.save();
    res.status(201).json(note);
  } else {
    res.status(401);
    throw new Error('Note not found');
  }
});

const delete_note = async_handler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note) {
    await Note.findByIdAndDelete(req.params.id);
    res.json('Note deleted successfully');
  } else {
    throw new Error('Note not found');
  }
});

export { get_notes, get_note, create_note, edit_note, delete_note };
