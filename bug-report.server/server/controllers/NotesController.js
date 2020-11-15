import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { notesService } from '../services/NotesService'

export class NotesController extends BaseController {
  constructor() {
    super('/api/notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAllNotes)
      .post('', this.createNote)
      .delete('/:noteId', this.deleteNote)
  }

  async deleteNote(req, res, next) {
    const userData = { userId: req.userInfo.id, noteId: req.params.noteId }
    try {
      res.send(await notesService.deleteNote(userData))
    } catch (error) {
      next(error)
    }
  }

  async createNote(req, res, next) {
    req.body.reportedBy = req.userInfo.id
    try {
      res.send(await notesService.createNote(req.body))
    } catch (error) {
      next(error)
    }
  }

  async getAllNotes(req, res, next) {
    try {
      res.send(await notesService.getAllNotes())
    } catch (error) {
      next(error)
    }
  }
}
