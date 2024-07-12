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

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User transaction is required']
  },
  account: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
    required: [true, 'Account is required']
  }
});

transactionSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function( _doc, ret, _options ) {
    delete ret._id;
  },
})



export const TransactionModel = mongoose.model('Transaction', transactionSchema);