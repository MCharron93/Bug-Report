import mongoose from 'mongoose'
// const ObjectId = mongoose.isValidObjectIda
const Schema = mongoose.Schema

const Note = new Schema(
  {
    content: { type: String, required: true },
    bugId: { type: String, required: true },
    reportedBy: { type: String, ref: 'Profile', required: true }
  },
  { timestamps: true, _id: true, toJSON: { virtuals: true } }
)

export default Note
