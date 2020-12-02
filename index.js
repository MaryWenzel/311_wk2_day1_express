const e = require('express')
const express = require('express')
const app = express()
const uuid = require('uuid')
const router = express.Router()
const port = process.env.PORT || 4000

const { users } = require('./state')
// BODY PARSER
app.use(express.json());
app.use(express.urlencoded({extended: false }))

/* BEGIN - create routes here */
// * GET /users
app.get('/users', function(req, res){
  res.send(users);
})

// * GET /users/1
app.get('/users/1', function(req, res){
  res.send(users[0]);
})

// POST /users
router.post('/users', function(req, res){
  res.send(req.body)
});

// PUT /users/1
app.put('/users/1', function(req, res){
  users.forEach(user => {
    if(user._id == 1){
      user.name = req.body.name;
      user.occupation = req.body.occupation;
      user.avatar = req.body.avatar
    }
    res.json(users)
  })
})

// DELETE /users/1
// app.delete('/users/1', function(req, res){
//   const newUser = users.slice(1);
//   res.json(newUser)
// })

// GET USER
app.get('/users/:_id', function(req, res){
  const found = users.some(member => member._id === parseInt(req.params._id));

  if(found){
    res.json(users.filter(user => user._id === parseInt(req.params._id)));
  }else {
    res.status(400).json({ msg: `no member with id of ${req.params._id}` })
  }
})

// CREATE A USER
app.post('/users', function(req, res){
  const newUser = {
    _id: uuid.v4(),
    name: req.body.name,
    occupation: req.body.occupation,
    avatar: req.body.avatar
  }
  
  if(!newUser.name || !newUser.occupation || !newUser.avatar){
    return res.status(400).json({ msg: "Please include id, name, occupation, and avatar link" });
  }

  users.push(newUser)
  res.json(users)
});

// UPDATE USER
app.put("/users/:_id", function(req, res){
  const found = users.some(user => user._id === parseInt(req.params._id));

  if(found){
    const updUser = req.body;
    users.forEach(user => {
        if(user._id === parseInt(req.params._id)){
        user.name = updUser.name ? updUser.name : user.name;
        user.occupation = updUser.occupation ? updUser.occupation : user.occupation;
        user.avatar = updUser.avatar ? updUser.avatar : user.avatar;
         
        res.json({ msg: "User Updated", user })
      }
    });
  } else{
    res.status(400).json({ msg: `No user with the id of ${req.params._id}` });
  }

});

// DELETE USER
app.delete('/users/:_id', function(req, res){
  const found = users.some(member => member._id === parseInt(req.params._id));

  if(found){
    res.json({
       msg: "Deleted User",
       users: users.filter(user => user._id !== parseInt(req.params._id))
      });
  }else {
    res.status(400).json({ msg: `no member with id of ${req.params._id}` })
  }
})


/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))