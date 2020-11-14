import mongoose from 'mongoose'
// const ObjectId = mongoose.isValidObjectIda
const Schema = mongoose.Schema

const Note = new Schema(
  {
    content: { type: String, required: true },
    bugId: { type: String, required: true },
    reportedBy: { type: String, required: true }
  },
  { timestamps: true, _id: true, toJSON: { virtuals: true } }
)
Note.virtual('creator', {
  localField: 'reportedBy',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})
export default Note
