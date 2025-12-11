const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
   dishName: {
    type: String,
    required: true,
   },
   dishType: {
    type: String,
    enum:['pastries','desserts','drinks']
   },
   isIthomeMade: {
    type: Boolean
   }
});

const Foods = mongoose.model('Foods', foodSchema);

module.exports= Foods;
