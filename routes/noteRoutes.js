const express = require('express');
const noteController = require('../controllers/noteController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

// GET notes
router.get('/', noteController.getNotes);

// GET note
router.get('/:id', noteController.getNote);

// POST note
router.post('/', noteController.createNote);

// PATCH note
router.patch('/:id', noteController.updateNote);

// DELETE note
router.delete('/:id', noteController.deleteNote);

module.exports = router;