import mongoose, {Schema} from "mongoose";


const userProfileSchema = new Schema({
  lastName: {
    type: String,
  },
  profession: {
    type: String,
  },
  phone: {
    type: String,
  },
  birth: {
    type: Date,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
  },
});



userProfileSchema.set('toJSON', {
  versionKey: false,
  transform: function( _doc, ret, _options ) {
    delete ret._id;
  },
})



export const UserProfileModel = mongoose.model('UserProfile', userProfileSchema);