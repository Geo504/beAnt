import mongoose, { Schema } from "mongoose";

const invitationsAccountSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  guest: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  account: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'guest'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

invitationsAccountSchema.set('toJSON', {
  versionKey: false,
  transform: function (_doc, ret, _options) {
    delete ret._id;
  },
});

export const InvitationsAccountModel = mongoose.model('InvitationsAccount', invitationsAccountSchema);