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
  currency: {
    type: String,
    required: [true, 'Currency is required'],
    default: '€',
    enum: ['€', '$', '£']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },

  users: [{
    type: Schema.Types.ObjectId,
    ref: 'UsersAccounts',
  }],
  transactions: [{
    type: Schema.Types.ObjectId,
    ref: 'Transaction'
  }],
});

accountSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function( _doc, ret, _options ) {
    delete ret._id;
    if (ret.id === null) delete ret.id;
  },
});



export const AccountModel = mongoose.model('Account', accountSchema);