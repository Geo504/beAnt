import mongoose, {Schema} from "mongoose";


const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  img: {
    type: String,
  },
  verifyEmail: {
    type: Boolean,
    default: false,
  },

  accounts: [{
    type: Schema.Types.ObjectId,
    ref: 'Account'
  }],
});

userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function( _doc, ret, _options ) {
    delete ret._id;
    delete ret.password;
  },
})

export const UserModel = mongoose.model('User', userSchema);