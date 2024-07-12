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

  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Users is required']
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
  },
});



export const AccountModel = mongoose.model('Account', accountSchema);