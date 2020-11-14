import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { bugsService } from '../services/BugsService'

export class BugsController extends BaseController {
  constructor() {
    super('/api/bugs')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAllBugs)
      .get('/:id', this.inspectBug)
      .post('', this.createBug)
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
