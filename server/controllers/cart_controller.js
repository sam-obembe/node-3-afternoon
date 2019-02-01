const swag = require("../models/swag")

module.exports = {
  add: (req,res,next)=>{
    
    const {user} = req.session
    //console.log(user)
    let {cart} = req.session.user
    const id = req.query.id
    console.log(id)
    const index = cart.findIndex(item => item.id === id)
    const selected = swag.find( thing=> thing.id === Number(id))
    console.log(selected)
    if(index === -1){
      cart.push(selected)
      user.total += selected["price"]
      
    } 
    res.status(200).send(user)
 
 },

  delete: (req,res,next)=>{
    const id = req.query.id
    const {user} = req.session
    const selected = user.cart.find(item => item.id == Number(id))

    if(selected){
      let loc = user.cart.indexOf(selected)
      user.cart.splice(loc,1)
      user.total -= selected.price
    }
    res.status(200).send(user)
 },

  checkout: (req,res,next)=> {
    const {user} = req.session
    user.cart=[];
    user.total = 0;
    res.status(200).send(user)
 }
}