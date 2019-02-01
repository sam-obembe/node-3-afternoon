const swag = require("../models/swag")

module.exports = {
  search: (req,res,next) =>{
    const category = req.query.category
    console.log(category)
    const found = swag.filter(thing => thing["category"] === category)
    if(!found){
      res.status(200).send(swag)
    } else{
      res.status(200).send(found)
    }
  }
}