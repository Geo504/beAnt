import mongoose from 'mongoose';



export class Validators {

  static get email(){
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  }

  static get date() {
    return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
  }
  
  static isMongoID( id: string ) {
    return mongoose.isValidObjectId(id);
  }


}