const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//creating a schema
const PersonSchema = new Schema({
  name: {
    type: String,
    required: true
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

const personModel= mongoose.model("person", PersonSchema);

//creating a record
const person =new personModel({
    name:"Jon",
    age:35,
    favoriteFoods:["pizza","burger"]
})
person.save((err)=>{
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
personModel.create(personArr,(err)=>{
    err?console.log("error while adding multiple record"):
    console.log("multiple record added successfully")
})


//using find
personModel
  .find({ name: "Aayachi" })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });

  //using findOne
  personModel
  .findOne({ favoriteFoods: { $in: ["pizza"] } })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });

  //using findById
  personModel
  .findById({
    _id: "5f4d7316887a9921a884fb0d",
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });

  //classic updates
  personModel.findById("5f4d7316887a9921a884fb0d", (err, person) => {
    err? console.log(err):
    person.favoriteFoods.push("fries");
    person.save((err, person) => {
      err? console.log(err):
      console.log(person);
    });
  });

  //new updates
  personModel.findOneAndUpdate(
    { name: "Ayachi" },
    { age: 36 },
    { new: true },
    (err, person) => {
       err? console.log(err):
      console.log(person);
    }
  );

  //delete one document
  personModel.findOneAndRemove(
    "5f4d7316887a9921a884fb0d",
    (err, person) => {
      err? console.log(err):
      console.log(person);
    }
  );


  //delete many documents
  personModel.deleteMany({ name: "Ayachi" }, (err) => {
   err? console.log(err):
    console.log("Person(s) with name 'Ayachi' was deleted");
  });

//chain search querry
personModel
  .find({ favoriteFoods: { $in: ["pizza"] } })
  .sort({ name: 1 })
  .limit(2)
  .select("-age")
  .exec()
  .then((doc) => console.log(doc))
  .catch((err) => console.error(err));