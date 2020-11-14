import { dbContext } from '../db/DbContext'

class BugsService {
  inspectBug(_id) {
    throw new Error('Method not implemented.')
  }

  async createBug(body) {
    return await dbContext.Bug.create(body)
  }

  async getAllBugs() {
    return await dbContext.Bug.find().populate('creator')
  }
}

export const bugsService = new BugsService()
