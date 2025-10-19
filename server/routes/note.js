import express from 'express';
import auth from '../middleware/auth.js';
import {
  get_notes,
  get_note,
  create_note,
  edit_note,
  delete_note,
} from '../controllers/note.js';

const router = express.Router();

router.get('/', auth, get_notes);
router
  .route('/:id')
  .get(auth, get_note)
  .put(auth, edit_note)
  .delete(auth, delete_note);
router.post('/new', auth, create_note);

export default router;
