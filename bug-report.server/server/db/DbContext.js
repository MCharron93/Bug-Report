import mongoose from 'mongoose'
import ValueSchema from '../models/Value'
import ProfileSchema from '../models/Profile'
import BugSchema from '../models/Bug'
import NoteSchema from '../models/Note'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Profile = mongoose.model('Profile', ProfileSchema);
  Bug = mongoose.model('Bug', BugSchema);
  Note = mongoose.model('Note', NoteSchema)
}

export const dbContext = new DbContext()
