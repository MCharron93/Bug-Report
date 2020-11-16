import { dbContext } from '../db/DbContext'
import { UnAuthorized } from '../utils/Errors'

class BugsService {
  async closeBug(bugId, userData) {
    const isYours = dbContext.Bug.findById(bugId)
    // @ts-ignore
    if (isYours.reportedBy === userData) {
      return await dbContext.Bug.findByIdAndUpdate(bugId, { closed: true })
    } else {
      throw new UnAuthorized("You're not authorized to edit the user's data")
    }
  }

  async editBug(bugId, body) {
    const exists = dbContext.Bug.findById(bugId)
    // @ts-ignore
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
