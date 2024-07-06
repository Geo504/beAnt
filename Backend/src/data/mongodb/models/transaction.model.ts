import mongoose, {Schema} from "mongoose";


const transactionSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  value: {
    type: Number,
    required: [true, 'Value is required'],
    default: 0
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
    default: Date.now
  },
  type: {
    type: String,
    required: [true, 'Type is required'],
    enum: ['income', 'expense']
  },
  category: {
    type: String,
    required: [true, 'Category is required']
  },
  status:{
    type: String,
    required: [true, 'Status is required'],
    default: 'pending',
    enum: ['pending', 'send', 'paid', 'rejected']
  },
  balance_account: {
    type: Number,
    required: [true, 'Balance account is required'],
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  account: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
    required: [true, 'Account is required']
  }
});

export const TransactionModel = mongoose.model('Transaction', transactionSchema);