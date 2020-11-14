import { dbContext } from '../db/DbContext'

class NotesService {
  async getNotesByBugId(id) {
    return await dbContext.Note.find({ bugId: id })
  }

  async getAllNotes() {
    return await dbContext.Note.find()
  }

  async createNote(body) {
    return await dbContext.Note.create(body)
  }
}

export const notesService = new NotesService()
