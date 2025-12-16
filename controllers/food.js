const express = require('express');

const router = express.Router();
const Foods = require('../models/food');
const User = require('../models/user');
const isSignedIn= require('../middleware/is-signed-in');

router.get('/', async (req,res)=>{
try{
    res.render('food/index.ejs');
}catch(error){
console.log(error);
res.redirect('/');
}

})
router.get('/menu',async(req,res)=>{
    try{
res.render('food/menu.ejs')
    }catch(error){
        console.log(error);
        res.redirect('/')
    }
})

router.get('/menu/:categories', async(req,res)=>{
    try{
        const category = req.params.categories;
        const foods = await Foods.find({dishType: category});

res.render('food/categories.ejs',{
    foods, category, user: req.session.user
});
    }catch(error){
        console.log(error);
        res.redirect('/')
    }
})

router.get('/new', isSignedIn,(req,res)=>{
    try{
res.render('food/new.ejs')
    }catch(error){
        console.log(error);
        res.redirect('/')
    }
})

router.post('/menu',isSignedIn, async(req,res)=>{
    try{
req.body.owner = req.session.user._id;
if (req.body.isIthomeMade === 'on') {
    req.body.isIthomeMade = true
 
  } else {
    req.body.isIthomeMade = false
  }
await Foods.create(req.body);
res.redirect(`/food/menu/${req.body.dishType}`)
    }catch(error){
        console.log(error);
        res.redirect('/food/menu')
    }
})

router.get('/:id/edit',isSignedIn ,async (req,res)=>{
    try{
const food = await Foods.findById(req.params.id);
 if (!food.owner.equals(req.session.user._id)) {
      return res.redirect('/');
    }
res.render('food/edit.ejs', {food});
    }catch(error){
        console.log(error);
        res.redirect('/food/menu')
    }
})

router.put('/:id', isSignedIn, async (req, res) => {
  try {
    const food = await Foods.findById(req.params.id);

    if (!food.owner.equals(req.session.user._id)) {
      return res.redirect('/');
    }

    req.body.isIthomeMade = req.body.isIthomeMade === 'on';

    await Foods.findByIdAndUpdate(req.params.id, req.body);

    res.redirect(`/food/menu/${req.body.dishType}`);
  } catch (error) {
    console.log(error);
    res.redirect('/food/menu');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const food = await Foods.findById(req.params.id).populate('owner');
    res.render('food/show.ejs', { food ,user:req.session.user});
  } catch (error) {
    console.error(error);
    res.redirect('/food/menu');
  }
});
router.delete('/:id',isSignedIn, async (req, res) => {
  try {
    const food = await Foods.findById(req.params.id);
    if (!food.owner.equals(req.session.user._id)){
        return res.redirect('/')
    }
    await food.deleteOne();
    res.redirect(`/food/menu/${food.dishType}`);
  } catch (error) {
    console.error(error);
    res.redirect('/food/menu');
  }
});

module.exports = router;