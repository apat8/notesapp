const Note = require("../models/note");

exports.getAllNotes = (req, res) => {
        // Returns a list of notes by the user in decedning order of order nubmer
        Note.find({userId: req.user.userId}, null, {sort: {orderNum: "desc"}} ,(error, results)=>{
                if(error) return res.status(500).json({error});
                return res.json({notes: results});
        })
}

exports.createNote = (req, res) => {
         /**
         * note:{
         *      ordernum:
         *      lastEdited:
         *      blocks: []
         * }
         */
        const { orderNum, blocks, lastEdited = new Date() } = req.body.note;
        
        // Create note
        const note = new Note({
                userId: req.user.userId,
                orderNum,
                blocks,
                lastEdited
        })

        // Store note in database
        note.save((error, result) => {
                if(error) return res.status(500).json({error});
                
                return res.status(201).json({
                           message: "Note successfully saved"
                })
        })
}

exports.updateNote = (req, res) => {
        /**
         * note:{
         *      _id:
         *      ordernum:
         *      lastEdited:
         *      blocks: []
         * }
         */

        const {_id, orderNum, blocks, lastEdited} = req.body.note;
        
        Note.findById(_id, (err, note) => {
                if(error) return res.status(500).json(error);
                
                // If blocks exists, replace old block with updated one
                if(blocks){
                        note.blocks = blocks.concat(
                                note.blocks.filter(block =>
                                        !blocks.find(updatedBlock => updatedBlock._id == block._id)
                                )
                        )

                        note.blocks.sort((a, b)=>{
                                return b.orderNum - a.orderNum;
                        })
                }

                // If lastEdited exists, Updated edited date
                if(lastEdited){
                        note.lastEdited = lastEdited;
                }

                // If order number exiits, updated number
                if(orderNum){
                        note.orderNum = orderNum;
                }
                
                // save updated note to database
                note.save((error, result) => {
                     if(error) return res.status(500).json({error});
                     
                     return res.status(201).json({
                                message: "Note successfully updated"
                        })
                })

        })
}


exports.deleteNote = (req, res) => {
        /**
         *  noteIds:[],
         *  updatedNotes: []
         */

        const {noteIds, updatedNotes} = req.body;
        const bulk = []; 

        // Add delete operation
        if(noteIds){
                bulk.push({
                        deleteMany:{
                                "filter": {"_id": {$in: noteIds}}
                        }
                })
        }

        // Add update operation for each note with updated order number
        if(updatedNotes){
                for(const note of updatedNotes){
                        bulk.push({
                                updateOne:{
                                        "filter": {"_id":note._id},
                                        "update": { $set:{"orderNum" : note.orderNum}}
                                }
                        })
                }       
        }
       
        // Perform bulk operation (delete and update)
        Note.bulkWrite(bulk, (error, result)=>{
                if(error) return res.status(500).json({error});

                return res.json({message: "Note Deleted"})
        });
}

exports.deleteBlock = (req, res) => {
        /**
         * {
         *      noteId : 
         *      blockIds:[]
         *      updatedBlocks: []
         *      lastEdited: date
         * }
         */

        const {noteId, blockIds, updatedBlocks, lastEdited}  = req.body;

        Note.findById(noteId, (err, note) => {
                if(err) return res.status(500).json(err);

                // Remove blocks to delete
                note.blocks = note.blocks.filter(block => !blockIds.includes(block._id.toString()))
                
                // If blocks, updated blocks
                if(updatedBlocks){
                        note.blocks = updatedBlocks.concat(
                                deleteBlocks.filter(block =>
                                        !updatedBlocks.find(updatedBlock => updatedBlock._id == block._id)
                                )
                        )

                        note.blocks.sort((a, b)=>{
                                return b.orderNum - a.orderNum;
                        })
                }
               
                if(lastEdited){
                        note.lastEdited = lastEdited;
                }

                // Save note
                note.save((error, result) => {
                        if(error) return res.status(500).json({error});
                        
                        return res.status(201).json({
                                   message: "Blocks successfully deleted"
                           })
                })
               
        })
}