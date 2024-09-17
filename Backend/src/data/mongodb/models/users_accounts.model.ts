import mongoose, { Schema } from "mongoose";

const usersAccountSchema = new Schema({
  user: {
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

usersAccountSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (_doc, ret, _options) {
    delete ret._id;
  },
});

export const UsersAccountsModel = mongoose.model('UsersAccounts', usersAccountSchema);