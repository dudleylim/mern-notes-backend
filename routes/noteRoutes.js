const express = require('express');
const noteController = require('../controllers/noteController');

const router = express.Router();

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