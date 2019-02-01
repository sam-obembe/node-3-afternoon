const users = require("../models/users")
var id = 1;
module.exports = {
  login: (req,res,next) =>{
    const {session} = req
    const {username, password} = req.body
    for(let i=0; i<users.length; i++){
      if(users[i].username === username && users[i].password === password){
        session.user.username = username 
        res.status(200).send(session.user) 
      }
    }
    
  },

  register: (req,res,next) =>{
    console.log(req.body)
    const {session} = req
    const {username, password} = req.body
    const user = {
      id: id,
      username:username,
      password:password,
    }
    users.push(user);
    id++
    session.user.username = username
    console.log(session.user)
    res.status(200).send(session.user)

  },

  signout: (req,res,next) =>{
    req.session.destroy()
    res.status(200).send(req.session) 
  },

  getUser: (req,res,next)=>{
    res.status(200).send(req.session.user)
  }
}