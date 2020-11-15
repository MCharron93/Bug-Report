import { dbContext } from '../db/DbContext'

class NotesService {
  async deleteNote(userData) {
    const exists = dbContext.Note.find({ _id: userData.noteId })
    // if (exists.reportedBy === userData.userId) {
    return await dbContext.Note.findByIdAndDelete(userData.noteId)
    // }
  }

  async getNotesByBugId(id) {
    return await dbContext.Note.find({ bugId: id }).populate('creator')
  }

  async getAllNotes() {
    return await dbContext.Note.find()
  }

  async createNote(body) {
    return await dbContext.Note.create(body)
  }
}

export const notesService = new NotesService()
