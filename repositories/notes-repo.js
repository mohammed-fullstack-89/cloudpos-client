let db = require('../models/index');
class NotesService {
    async getNoteByType(type) {
        let notesTable = db.model('notes');
        return JSON.stringify(await notesTable.findAll({ where: { type: type } }));;
    }

    saveNotes(notesList) {
        let notesTable = db.model('notes');
        notesTable.bulkCreate(JSON.parse(notesList), { updateOnDuplicate: Object.keys(notesTable.rawAttributes) });
    }
}

NotesService.instance = null;
NotesService.getInstance = function () {
    if (NotesService.instance === null) {
        NotesService.instance = new NotesService();
    }
    return NotesService.instance;
};

module.exports = NotesService.getInstance();
