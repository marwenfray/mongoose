const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//creating a schema
const PersonSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique:true
  } ,
  age:{
      type:Number
  },
  favoriteFoods:{
      type:[String]
  }
});

module.exports = Person= mongoose.model("person", PersonSchema);

//creating a model

const people= mongoose.model("people", PersonSchema);


//creating a record
const jon =new people({
    name:"Jon",
    age:35,
    favoriteFoods:["pizza","burger"]
})
jon.save((err)=>{
    err?console.log("error while saving model"):
    console.log("model saved successfully")
    })
    
// creating multiple record

const personArr = [
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
]
people.create(personArr,(err)=>{
    err?console.log("error while adding multiple record"):
    console.log("multiple record added successfully")
})



//using find
people
  .find({ name: "Aayachi" })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });

  //using findOne
  people
  .findOne({ favoriteFoods: { $in: ["pizza"] } })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });


 //using findById
 people
 .findById({
   _id: "5f7b712667f31a54144f8447",
 })
 .then((data) => {
   console.log(data);
 })
 .catch((err) => {
   console.error(err);
 });



 //classic updates
 people.findById("5f7b712667f31a54144f8447", (err, person) => {
    err? console.log(err):
    person.favoriteFoods.push("fries");
    person.save((err, person) => {
      err? console.log(err):
      console.log(person);
    });
  });


   //new updates
   people.findOneAndUpdate(
    { name: "Ayachi" },
    { age: 36 },
    { new: true },
    (err, person) => {
       err? console.log(err):
      console.log(person);
    }
  );


   //delete one document
   people.findOneAndRemove(
    "5f7b712667f31a54144f8447",
    (err, person) => {
      err? console.log(err):
      console.log(person);
    }
  );


   //delete many documents
   people.deleteMany({ name: "Ayachi" }, (err) => {
    err? console.log(err):
     console.log("Person(s) with name 'Ayachi' was deleted");
   });

   //chain search querry
people
.find({ favoriteFoods: { $in: ["pizza"] } })
.sort({ name: 1 })
.limit(2)
.select("-age")
.exec()
.then((data) => console.log(data))
.catch((err) => console.error(err));