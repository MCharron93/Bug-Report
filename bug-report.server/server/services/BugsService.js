import { dbContext } from '../db/DbContext'

class BugsService {
  async closeBug(bugId) {
    return await dbContext.Bug.findByIdAndUpdate(bugId, { closed: true })
  }

  async editBug(bugId, body) {
    const exists = dbContext.Bug.findById(bugId)
    if (!exists.closed) {
      return await dbContext.Bug.findByIdAndUpdate(bugId, body, { new: true })
    }
  }

  async inspectBug(id) {
    return await dbContext.Bug.findById(id)
  }

  async createBug(body) {
    return await dbContext.Bug.create(body)
  }

  async getAllBugs() {
    return await dbContext.Bug.find().populate('creator')
  }
}

export const bugsService = new BugsService()
