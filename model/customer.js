const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        
        type: String
    },
    phoneNo: {
        unique: true,
        type: Array
    },
    
    img:{
        type:String
    }
});
dataSchema.statics.isThisPhoneNonUse = async function (phoneNo) {
    if (!phoneNo) throw new Error('Invalid phoneNo');
    try {
      const user = await this.findOne({ phoneNo });
      if (user) return false;
  
      return true;
    } catch (error) {
      console.log('error inside isThisPhoneNonUse method', error.message);
      return false;
    }
  };

module.exports = mongoose.model('Data', dataSchema)