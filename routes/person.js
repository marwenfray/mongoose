const express = require('express');
const router =express.Router();
const Person = require('../models/Person')


//creating a record

router.post("/addOne",(req,res,err)=>{
    const {name,age,favoriteFoods}=req.body
    const jon =new Person({
        name:"Jon",
        age:35,
        favoriteFoods:["pizza","burger"]
    });
    jon.save()
    .then(people=>res.send(people))
    .catch(err=>console.log(err))
}
)


// creating multiple record

router.post("/addMultiple",(req,res,err)=>{
    const {name,age,favoriteFoods}=req.body
    const personArr =[
        {name:"Eishiru",
         age:44,
         favoriteFoods:["rice","sushi","ramen"]
        },
        {
            name:"Rakish",
            age:26,
            favoriteFoods:["curry","chapati"]
        },
        {
            name:"Pablo",
            age:56,
            favoriteFoods:["tacos","nachos"]
        },
        {
            name:"Mario",
            age: 33,
            favoriteFoods:["pizza","pasta"]
        },
        {
            name:"Ayachi",
            age:68,
            favoriteFoods:["mhamsa","hargma","ojja"]
        }
    ];
    Person.create(personArr)
    .then(people=>res.send(people))
    .catch(err=>console.log(err))
}
)



//using find

router.get('/Ayachi',(req,res,err)=>{
    Person.find({name:"Ayachi"})
    .then(people=>res.send(people))
    .catch(err=>console.log(err))
})




//using findOne

router.get('/findOne',(req,res,err)=>{
    Person.findOne({ favoriteFoods: { $in: ["pizza"] } })
    .then(people=>res.send(people))
    .catch(err=>console.log(err))
})




 //using findById


router.get('/findById',(req,res,err)=>{
    Person.findById( "5f8841dc3dea2d13c4fd506c")
    .then(people=>res.send(people))
    .catch(err=>console.log(err))
})




 //classic updates

 router.put('/update',(req,res,err)=>{
    const {name,age,favoriteFoods}=req.body

        Person.findById( "5f8841dc3dea2d13c4fd506c")
        .then(people=>{people.favoriteFoods.push("fries"); res.send(people)})
        .catch(err=>console.log(err))
 })



//new updates

    router.put('/newUpdate',(req,res,err)=>{
        Person.findOneAndUpdate( { name: "Ayachi" },
        { age: 36 },
        { new: true })
        .then(people=>res.send(people))
        .catch(err=>console.log(err))
    })
    


 //delete one document

    router.delete('/deleteOne',(req,res,err)=>{
        Person.findByIdAndDelete({_id:"5f8841dc3dea2d13c4fd506b"})
        .then(people=>res.send(people))
        .catch(err=>console.log(err))
    })



//delete many documents
    router.delete('/deleteMany',(req,res,err)=>{
        Person.deleteMany({name:"Ayachi"})
        .then(people=>res.send(people))
        .catch(err=>console.log(err))
    })



//chain search querry

router.get('/chainQuerry', (req, res) => {
    Person
    .find({ favoriteFoods: { $in: ["pizza"] } })
    .sort({ name: 1 })
    .limit(2)
    .select("-age")
    .exec()
    .then(people=>res.send(people))
    .catch(err=>console.log(err))	
});


 module.exports=router