const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Express on Vercel"));
app.get('/home' , (req , res) => res.send('this is home'))
app.get('/users' , (req ,res) => {
    const user = [
        {name : 'rudr'} , 
        {name : 'sahil'} , 
        {name : 'nikita'} , 
        {name : 'java'} 
    ]

    res.send(
        `<div>
            ${
                user.map((ele) => {
                    return <h1> ${ele.name} </h1>
                }) 
            }
        </div>`
    )
})

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;