import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'

export class BugsController extends BaseController {
  constructor() {
    super('/api/bugs')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAllBugs)
      .get('/:id', this.inspectBug)
      .get('/:bugId/notes', this.getNotesByBugId)
      .post('', this.createBug)
  }

  async getNotesByBugId(req, res, next) {
    try {
      res.send(await notesService.getNotesByBugId(req.params.bugId))
    } catch (error) {
      next(error)
    }
  }

  async inspectBug(req, res, next) {
    try {
      res.send(await bugsService.inspectBug(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async createBug(req, res, next) {
    req.body.reportedBy = req.userInfo.id
    try {
      res.send(await bugsService.createBug(req.body))
    } catch (error) {
      next(error)
    }
  }

  async getAllBugs(req, res, next) {
    try {
      res.send(await bugsService.getAllBugs())
    } catch (error) {
      next(error)
    }
  }
}
