const express = require('express');

const router = express.Router();
const Foods = require('../models/food');

router.get('/', async (req,res)=>{
try{
    res.render('food/index.ejs');
}catch(error){
console.log(error);
res.redirect('/');
}

})


module.exports = router;