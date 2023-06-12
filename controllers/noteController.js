const Note = require('../models/noteModel');

// get notes
const getNotes = async (req, res) => {
    const response = await Note.find({}).sort({ createdAt: -1 });
    if (response) {
        res.status(200).json(response);
    } else {
        res.status(404).json({ error: "Cannot find notes" });
    }
}

// get note
const getNote = async (req, res) => {
    const { id } = req.params;
    const response = await Note.findById(id);
    if (response) {
        res.status(200).json(response);
    } else {
        res.status(404).json({ error: "Cannot find note" });
    }
}

// create note
const createNote = async (req, res) => {
    const { title, content } = req.body;
    try {
        const response = await Note.create({
            title,
            content
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error });
    }
}

// update note
const updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, content} = req.body;
    const response = await Note.findByIdAndUpdate(id, {
        title,
        content
    });
    if (response) {
        res.status(200).json(response);
    } else {
        res.status(404).json({ error: "Cannot find note" });
    }
}

// delete note
const deleteNote = async (req, res) => {
    const { id } = req.params;
    const response = await Note.findByIdAndDelete(id);
    if (response) {
        res.status(200).json(response);
    } else {
        res.status(404).json({ error: "Cannot find note" });
    }
}

const exportData = {
    getNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote
}

module.exports = { ...exportData };