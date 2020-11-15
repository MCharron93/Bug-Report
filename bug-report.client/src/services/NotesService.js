import { api } from './AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'

class NotesService {
  async deleteNote(noteData) {
    try {
      logger.log(noteData)
      await api.delete('/api/notes/' + noteData._id)
      this.getNotesByBugId(noteData.bugId)
    } catch (error) {
      logger.log(error)
    }
  }

  async createNote(newNoteData) {
    try {
      await api.post('/api/notes', newNoteData)
      this.getNotesByBugId(newNoteData.bugId)
    } catch (error) {
      logger.error(error)
    }
  }

  async getNotesByBugId(id) {
    try {
      const res = await api.get('/api/bugs/' + id + '/notes')
      AppState.activeBugNotes = res.data
      // logger.log(AppState.activeBugNotes)
    } catch (error) {
      logger.error(error)
    }
  }
}

export const notesService = new NotesService()
