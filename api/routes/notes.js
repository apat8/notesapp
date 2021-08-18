const express = require("express");
const router = express.Router();
const notesController = require("../controllers/notes");
const {auth} = require("../helpers/auth");

const { createNoteValidationRules, 
    updateNoteValidationRules, 
    deleteNoteValidationRules, 
    deleteBlocksValidationRules,
    validate } = require("../helpers/validator");

// GET requests
router.get("/", auth, notesController.getAllNotes);

// POST requests
router.post("/", auth, createNoteValidationRules(), validate, notesController.createNote);

// DELETE requests
router.delete("/", auth, deleteNoteValidationRules(), validate, notesController.deleteNote);
router.delete("/blocks", auth, deleteBlocksValidationRules(), validate, notesController.deleteBlock);

// PUT requests
router.put("/", auth, updateNoteValidationRules(), validate, notesController.updateNote);

module.exports = router;