const express = require("express");
const connect = require("./config/connectDb");
connect();
const PORT = 4000;
const mongoose = require("mongoose");
const {
  createPerson,
  createManyPeople,
  findPeopleByName,
  findOneByFood,
  findPersonById,
  findEditThenSave,
  findAndUpdate,
  removeById,
  removeManyPeople,
} = require("./models/person");
const app = express();
app.use(express.json);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Create Person Model
const Person = mongoose.model("Person", personSchema);

// Create and Save a Record of a Model
const createPerson = (name, age, favoriteFoods, done) => {
  const person = new Person({ name, age, favoriteFoods });
  person.save(function (err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Create Many Records with model.create()
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Use model.find() to Search Your Database
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function (err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Use model.findOne() to Return a Single Matching Document from Your Database
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function (err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Use model.findById() to Search Your Database By _id
const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = (personId, done) => {
  Person.findById(personId, function (err, person) {
    if (err) return console.error(err);
    person.favoriteFoods.push("hamburger");
    person.save(function (err, data) {
      if (err) return console.error(err);
      done(null, data);
    });
  });
};

// Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
  Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true },
    function (err, data) {
      if (err) return console.error(err);
      done(null, data);
    }
  );
};

// Delete One Document Using model.findByIdAndRemove
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function (err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

//  Delete Many Documents with model.remove()
const removeManyPeople = (done) => {
  Person.remove({ name: "Mary" }, function (err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

module.exports = {
  createPerson,
  createManyPeople,
  findPeopleByName,
  findOneByFood,
  findPersonById,
  findEditThenSave,
  findAndUpdate,
  removeById,
  removeManyPeople,
};
