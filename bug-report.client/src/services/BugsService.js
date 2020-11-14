import { api } from './AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'

class BugsService {
  async inspectBug(id) {
    try {
      const res = await api.get('/api/bugs/' + id)
      AppState.activeBug = res.data
      logger.log(AppState.activeBug)
    } catch (error) {
      logger.error(error)
    }
  }

  async createBug() {

  }

  async getAllBugs() {
    try {
      const res = await api.get('/api/bugs')
      AppState.bugs = res.data
      // logger.log(AppState.bugs)
    } catch (error) {
      logger.error(error)
    }
  }
}

export const bugsService = new BugsService()
