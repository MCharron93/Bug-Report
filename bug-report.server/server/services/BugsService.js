import { dbContext } from '../db/DbContext'

class BugsService {
  async createBug(body) {
    return await dbContext.Bug.create(body)
  }

  async getAllBugs() {
    return await dbContext.Bug.find().populate('creator')
  }
}

export const bugsService = new BugsService()
