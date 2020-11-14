import { api } from './AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'

class NotesService {
  async getNotesByBugId(id) {
    try {
      const res = await api.get('/api/bugs/' + id + '/notes')
      AppState.activeBugNotes = res.data
      logger.log(AppState.activeBugNotes)
    } catch (error) {
      logger.error(error)
    }
  }
}

export const notesService = new NotesService()
