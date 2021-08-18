const { body, validationResult } = require("express-validator");

const createNoteValidationRules = () => {
    return [
        body("note").exists().isObject(),
        body("note.orderNum").optional().isNumeric(),
        body("note.lastEdited").optional().isDate(),
        body("note.blocks").exists().isArray().notEmpty(),
        body("note.blocks.*.orderNum").exists().isNumeric(),
        body("note.blocks.*.content").exists().isString(),
        body("note.blocks.*.style").optional().isString().isIn(["regular", "bold", "italic"]),
    ]
}

const updateNoteValidationRules = () => {
    return [
        body("note").exists().isObject(),
        body("note._id").exists().isAlphanumeric(),
        body("note.orderNum").optional().isNumeric(),
        body("note.date").optional().isDate(),
        body("note.blocks").optional().isArray().notEmpty(),
        body("note.blocks.*._id").optional().isAlphanumeric(),
        body("note.blocks.*.orderNum").optional().isNumeric(),
        body("note.blocks.*.content").optional().isString(),
        body("note.blocks.*.style").optional().isString().isIn(["regular", "bold", "italic"])
    ]
}

const deleteNoteValidationRules = () => {
    return [
        body("noteIds").exists().isArray(),
        body("updatedNotes").optional().isArray()
    ]

}

const deleteBlocksValidationRules = () => {
    return [
        body("noteId").exists().isAlphanumeric(),
        body("blockIds").exists().isArray(),
        body("updatedBlocks").optional().isArray(),
        body("lastEdited").exists().isDate(),
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req);
    
    if(errors.isEmpty()){
        return next();
    }

    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({[err.param] : err.msg}));

    return res.status(422).json({
        errors : extractedErrors
    })

}

module.exports = {
    createNoteValidationRules,
    updateNoteValidationRules,
    deleteNoteValidationRules,
    deleteBlocksValidationRules,
    validate
}