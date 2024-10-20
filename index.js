const express = require('express')
const app = express()
const mongoose =  require('mongoose')
const cors = require('cors')

// express imp middlewares 
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//connection 
mongoose.connect('mongodb://127.0.0.1:27017/rudrusers')
.then(() => console.log('mongoDb connected'))
.catch((err) => console.log('mongoDb ERR' + err) )

// schema
const userSchema = new mongoose.Schema({
    firstName : {
        type :String , 
        required : true 
    } ,
    lastName : {
        type : String , 
        required : true 
    } , 
    email : {
        type : String ,
        required : true ,
        unique : true
    } , 
    age : {
        type : Number , 
        required : true 
    } , 
    phoneNumber :  {
        type : Number 
    } ,
})

const User = mongoose.model('user' , userSchema)

// get method 
app.get('/users' , async  (req ,res) => {
    const data = await User.find({})
    console.log('get is emit')
    const html = `
    <ul>
        ${data.map((user) => `<li>${user.firstName}</li>` ).join('')}
    </ul>`
    res.send(html)
})


// patch method 
app.patch('/addusers' , async (req , res) => {
    console.log(req.body)
    await User.findByIdAndUpdate('67139321cd5eb4d4d8a967ea' , {lastName : 'changed'})
    return  res.status({ status : 'success'} )
})

// post method
app.post('/addUsers', async (req, res) => {
    try {
      console.log(req.body);
      const { firstName, lastName, email, age, phoneNumber } = req.body;
  
      const result = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        age: age,
        phoneNumber: phoneNumber
      });
  
      // access result._id 
      console.log(result._id);
  
      // Send back the ID of the newly created user
      return res.status(201).json({ msg: 'success', userId: result._id });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ msg: 'Error creating user', error: error.message });
    }
  });
  

app.listen(8080 , () => console.log('sever is listening on post 8080'))