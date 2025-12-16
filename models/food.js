const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
   dishName: {
    type: String,
    required: true,
   },
   dishType: {
    type: String,
    enum:['pastries','desserts','drinks'],
    required: true,
   },
   isIthomeMade: {
    type: Boolean
   },
 owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
}

});

const Foods = mongoose.model('Foods', foodSchema);

module.exports= Foods;
