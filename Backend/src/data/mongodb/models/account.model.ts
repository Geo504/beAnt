import mongoose, {Schema} from "mongoose";


const accountSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  balance: {
    type: Number,
    required: [true, 'Balance is required'],
    default: 0
  },
  favorite: {
    type: Boolean,
    default: false
  },
  currency: {
    type: String,
    required: [true, 'Currency is required'],
    default: '€',
    enum: ['€', '$', '£']
  },

  user: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  }],
  transactions: [{
    type: Schema.Types.ObjectId,
    ref: 'Transaction'
  }],
});

export const AccountModel = mongoose.model('Account', accountSchema);