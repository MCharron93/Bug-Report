import { api } from './AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'

class BugsService {
  async closeBug(bugData) {
    try {
      const res = await api.put('/api/bugs/' + bugData + '/closed')
      AppState.activeBug = res.data
      // logger.log(bugData)
    } catch (error) {
      logger.log(error)
    }
  }

  async editBug(edittedBugData) {
    try {
      logger.log(edittedBugData)
      await api.put('/api/bugs/' + edittedBugData.bugId, edittedBugData)
      this.inspectBug(edittedBugData.bugId)
    } catch (error) {
      logger.error(error)
    }
  }

  async inspectBug(id) {
    try {
      const res = await api.get('/api/bugs/' + id)
      AppState.activeBug = res.data
      // logger.log(AppState.activeBug.updatedAt)
    } catch (error) {
      logger.error(error)
    }
  }

  async createBug(newBugReport) {
    try {
      await api.post('/api/bugs', newBugReport)
      this.getAllBugs()
      // logger.log(AppState.bugs)
    } catch (error) {
      logger.error(error)
    }
  }

  async getAllBugs() {
    try {
      const res = await api.get('/api/bugs')
      AppState.bugs = res.data
    } catch (error) {
      logger.error(error)
    }
  }
}

export const bugsService = new BugsService()
